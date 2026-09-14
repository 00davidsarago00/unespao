import React, { useState, useEffect, useLayoutEffect } from 'react';
import { TourStep } from '../data/spotlightTourData';
import { TheorySlide } from './tour/TheorySlide';
import { ControlBar } from './tour/ControlBar';
import { Sparkles } from 'lucide-react';

interface SpotlightTourOverlayProps {
  steps: TourStep[];
  currentStepIndex: number;
  onStepChange: (newStepIndex: number) => void;
  onExitTour: () => void;
}

export const SpotlightTourOverlay: React.FC<SpotlightTourOverlayProps> = ({
  steps,
  currentStepIndex,
  onStepChange,
  onExitTour,
}) => {
  const currentStep = steps[currentStepIndex] || steps[0];
  const isPractice = currentStep.fase === 'cliente' || currentStep.fase === 'atendente';
  const showSpotlight = isPractice && !currentStep.semDestaque;
  const targetId = currentStep.targetId || '';

  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [dismissed, setDismissed] = useState(false);

  // Reseta o destaque sempre que o passo muda — "como se fosse a primeira vez".
  useEffect(() => {
    setDismissed(false);
  }, [currentStepIndex]);

  const updateTargetPosition = () => {
    if (!showSpotlight || !targetId) {
      setTargetRect(null);
      return;
    }
    const el = document.getElementById(targetId);
    setTargetRect(el ? el.getBoundingClientRect() : null);
  };

  // Calcula a posição do alvo de forma síncrona, ANTES do navegador pintar o
  // quadro — evita o "flash escurecido" que aparecia quando a posição só era
  // conhecida ~120ms depois do passo mudar.
  useLayoutEffect(() => {
    updateTargetPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex, showSpotlight, targetId]);

  useEffect(() => {
    if (!showSpotlight || !targetId) return;

    const el = document.getElementById(targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Só rola a página se o alvo já não estiver razoavelmente visível —
      // evita um scroll (e o recálculo que ele dispara) em todo passo.
      const alreadyVisible = rect.top >= 80 && rect.bottom <= viewportHeight - 40;
      if (!alreadyVisible) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({ top: Math.max(0, scrollTop + rect.top - 140), behavior: 'smooth' });
      }
    }

    const handleResizeOrScroll = () => updateTargetPosition();
    window.addEventListener('resize', handleResizeOrScroll);
    window.addEventListener('scroll', handleResizeOrScroll, { passive: true });
    const interval = setInterval(updateTargetPosition, 500);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex, showSpotlight, targetId]);

  // Qualquer interação com o app por baixo remove o destaque, liberando a
  // interação livre — só a barra de navegação superior permanece.
  useEffect(() => {
    if (!showSpotlight || dismissed) return;

    const handleBackgroundInteraction = (event: MouseEvent | TouchEvent) => {
      const clickTarget = event.target as HTMLElement | null;
      if (!clickTarget) return;
      if (clickTarget.closest('.tour-top-header')) return;

      const targetElement = document.getElementById(targetId);
      const isInsideTargetElement = !!(targetElement && (targetElement === clickTarget || targetElement.contains(clickTarget)));

      let clientX = 0, clientY = 0;
      if ('clientX' in event) { clientX = event.clientX; clientY = event.clientY; }
      else if ('changedTouches' in event && event.changedTouches?.length) {
        clientX = event.changedTouches[0].clientX; clientY = event.changedTouches[0].clientY;
      }

      let isWithinSpotlightBounds = false;
      if (targetRect && clientX > 0 && clientY > 0) {
        const pad = 12;
        if (clientX >= targetRect.left - pad && clientX <= targetRect.right + pad && clientY >= targetRect.top - pad && clientY <= targetRect.bottom + pad) {
          isWithinSpotlightBounds = true;
        }
      }

      if (isInsideTargetElement || isWithinSpotlightBounds) setDismissed(true);
    };

    window.addEventListener('click', handleBackgroundInteraction, true);
    return () => window.removeEventListener('click', handleBackgroundInteraction, true);
  }, [showSpotlight, dismissed, targetId, targetRect]);

  return (
    <>
      <ControlBar steps={steps} currentStepIndex={currentStepIndex} onStepChange={onStepChange} onExitTour={onExitTour} />

      {currentStep.fase === 'teoria' && <TheorySlide step={currentStep} />}

      {showSpotlight && !dismissed && (
        <div
          className="fixed inset-0 z-40 pointer-events-none transition-colors duration-300"
          style={{ backgroundColor: targetRect ? 'transparent' : 'rgba(18, 11, 5, 0.75)' }}
        >
          {targetRect && (
            <div
              className="fixed pointer-events-none transition-all duration-300 ease-out"
              style={{
                top: Math.max(0, targetRect.top - 8),
                left: Math.max(0, targetRect.left - 8),
                width: targetRect.width + 16,
                height: targetRect.height + 16,
                boxShadow: '0 0 0 9999px rgba(18, 11, 5, 0.72)',
                borderRadius: '20px',
                border: '3px solid #DE9E1E',
              }}
            >
              {currentStep.focoLabel && (
                <span className="absolute -top-9 left-0 bg-[#DE9E1E] text-[#3B220B] text-xs font-black px-3 py-1 rounded-t-xl rounded-br-xl shadow-lg flex items-center gap-1.5 whitespace-nowrap max-w-[85vw] truncate">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{currentStep.focoLabel}</span>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
