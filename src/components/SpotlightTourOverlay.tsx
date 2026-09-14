import React, { useState, useEffect, useRef } from 'react';
import { 
  CLIENT_SPOTLIGHT_STEPS, 
  BAKER_SPOTLIGHT_STEPS, 
  SpotlightTourStep 
} from '../data/spotlightTourData';
import { 
  ArrowLeft, 
  ArrowRight, 
  X, 
  Eye, 
  EyeOff,
  Layers, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  ChevronUp, 
  ChevronDown, 
  Maximize2, 
  Minimize2, 
  Cpu, 
  ShieldCheck, 
  RotateCcw,
  Check,
  ShoppingBag,
  Flame,
  ChefHat,
  Smartphone,
  GripHorizontal,
  PanelRight,
  ArrowDownUp
} from 'lucide-react';

interface SpotlightTourOverlayProps {
  role: 'cliente' | 'padeiro';
  onToggleRole: (newRole: 'cliente' | 'padeiro') => void;
  currentStepIndex: number;
  onStepChange: (newStepIndex: number) => void;
  onExitTour: () => void;
  onOpenC4Modal: () => void;
  onSimulateOrder: () => void;
  onOpenCart?: () => void;
}

export const SpotlightTourOverlay: React.FC<SpotlightTourOverlayProps> = ({
  role,
  onToggleRole,
  currentStepIndex,
  onStepChange,
  onExitTour,
  onOpenC4Modal,
  onSimulateOrder,
  onOpenCart,
}) => {
  const steps: SpotlightTourStep[] = role === 'cliente' ? CLIENT_SPOTLIGHT_STEPS : BAKER_SPOTLIGHT_STEPS;
  const currentStep = steps[currentStepIndex] || steps[0];

  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Modos de ancoragem inteligente para NÃO sobrepor o software:
  // 'auto' (calcula o lado oposto ao elemento focado para nunca sobrepor)
  // 'bottom' (fixado na base)
  // 'top' (fixado no topo)
  // 'right' (painel lateral direito em Split View)
  const [dockPosition, setDockPosition] = useState<'auto' | 'bottom' | 'top' | 'right'>('auto');

  // Modo Raio-X / Translucidez (para ver o conteúdo por trás da caixa sem movê-la)
  const [isGhostMode, setIsGhostMode] = useState<boolean>(false);
  const [isPeeking, setIsPeeking] = useState<boolean>(false);

  // Detecção de tela desktop/larga (>= 1024px) onde o fundo foi deslocado para a esquerda abrindo espaço lateral
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 1024 : false;
  });

  // Estado e referências para arrastar o card com o mouse
  const [cardPos, setCardPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: 0,
    startY: 0,
  });

  // Cálculo do lado livre da tela (se o alvo está na metade inferior, o painel vai para o topo, e vice-versa)
  const calculatedAutoSide: 'top' | 'bottom' = React.useMemo(() => {
    if (!targetRect) return 'bottom';
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const targetCenterY = targetRect.top + targetRect.height / 2;
    // Se o elemento focado estiver no meio ou parte inferior da tela, posiciona o painel no topo:
    if (targetCenterY > viewportHeight / 2 - 40) {
      return 'top';
    }
    return 'bottom';
  }, [targetRect]);

  const handleDragStart = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      startX: rect.left,
      startY: rect.top,
    };
    setIsDragging(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Apenas clique com botão esquerdo
    const target = e.target as HTMLElement;
    // Não iniciar arraste se clicou em botões, links, inputs ou seletores
    if (target.closest('button, input, textarea, a, select')) return;
    handleDragStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, input, textarea, a, select')) return;
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Efeito para rastrear movimentação suave do mouse / touch na janela
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;

      let newX = dragStartRef.current.startX + dx;
      let newY = dragStartRef.current.startY + dy;

      if (cardRef.current) {
        const width = cardRef.current.offsetWidth;
        const height = cardRef.current.offsetHeight;
        const maxX = window.innerWidth - width - 8;
        const maxY = window.innerHeight - height - 8;
        newX = Math.max(8, Math.min(newX, maxX));
        newY = Math.max(50, Math.min(newY, maxY));
      }

      setCardPos({ x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - dragStartRef.current.mouseX;
      const dy = e.touches[0].clientY - dragStartRef.current.mouseY;

      let newX = dragStartRef.current.startX + dx;
      let newY = dragStartRef.current.startY + dy;

      if (cardRef.current) {
        const width = cardRef.current.offsetWidth;
        const height = cardRef.current.offsetHeight;
        const maxX = window.innerWidth - width - 8;
        const maxY = window.innerHeight - height - 8;
        newX = Math.max(8, Math.min(newX, maxX));
        newY = Math.max(50, Math.min(newY, maxY));
      }

      setCardPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);
  
  // Interactive mini-demos within the tour card
  const [activeDemoModal, setActiveDemoModal] = useState<'adapter' | 'tests' | null>(null);
  const [adapterMethod, setAdapterMethod] = useState<'pix' | 'cartao' | 'balcao'>('pix');
  const [adapterPayload, setAdapterPayload] = useState({
    status: 'Autorizado via Pix BACEN',
    protocolo: 'PIX-UNESP-98472',
    latencia: '128ms',
    contrato: 'IPagamentoAdapter.executePayment()'
  });

  // Tests runner state
  const [testsRunning, setTestsRunning] = useState(false);
  const [testsPassed, setTestsPassed] = useState(true);

  // Position calculation and element tracking
  const updateTargetPosition = () => {
    if (!currentStep) return;
    const el = document.getElementById(currentStep.targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);
    } else {
      setTargetRect(null);
    }
  };

  // Scroll into view & update position on step change or window resize
  useEffect(() => {
    // Delay slightly to allow DOM or view switches to settle
    const timer = setTimeout(() => {
      const el = document.getElementById(currentStep.targetId);
      if (el) {
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Se o card estiver posicionado no rodapé, rola para deixar o elemento no topo (110px abaixo da navbar)
        // Se o card estiver no topo, rola para deixar o elemento na metade inferior
        const effectiveSide = dockPosition === 'auto' ? calculatedAutoSide : dockPosition;
        let targetScrollY = scrollTop + rect.top - 120; // 120px abaixo da navbar

        if (effectiveSide === 'top') {
          // Card no topo: rola o elemento para o terço inferior para não colidir
          targetScrollY = scrollTop + rect.top - 340;
        }

        window.scrollTo({
          top: Math.max(0, targetScrollY),
          behavior: 'smooth'
        });

        setTimeout(updateTargetPosition, 320);
      } else {
        updateTargetPosition();
      }
    }, 120);

    const handleResizeOrScroll = () => {
      setIsLargeScreen(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);
      updateTargetPosition();
    };

    window.addEventListener('resize', handleResizeOrScroll);
    window.addEventListener('scroll', handleResizeOrScroll, { passive: true });

    const interval = setInterval(updateTargetPosition, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll);
    };
  }, [currentStepIndex, role, currentStep.targetId, dockPosition, calculatedAutoSide]);

  // Handle Demo Actions
  const handleTriggerDemo = (type: string) => {
    if (type === 'open_c4') {
      onOpenC4Modal();
    } else if (type === 'simulate_order') {
      onSimulateOrder();
    } else if (type === 'open_adapter') {
      setActiveDemoModal('adapter');
    } else if (type === 'run_tests') {
      setActiveDemoModal('tests');
    } else if (type === 'open_cart') {
      if (onOpenCart) onOpenCart();
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      onStepChange(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      onStepChange(currentStepIndex - 1);
    }
  };

  // Restaura expansão do card ao avançar ou retroceder tópico
  useEffect(() => {
    setIsMinimized(false);
  }, [currentStepIndex]);

  // Minimizar o painel flutuante após clicar no elemento que está sendo apresentado no fundo
  useEffect(() => {
    const handleBackgroundInteraction = (event: MouseEvent | TouchEvent) => {
      if (isMinimized) return;

      const clickTarget = event.target as HTMLElement | null;
      if (!clickTarget) return;

      // 1. Não minimizar se o clique foi dentro do próprio card explicativo flutuante
      if (cardRef.current && cardRef.current.contains(clickTarget)) {
        return;
      }

      // 2. Não minimizar se o clique foi na barra superior do tour ou em modais do tour
      if (
        clickTarget.closest('.tour-top-header') || 
        clickTarget.closest('[role="dialog"]') ||
        clickTarget.closest('.tour-interactive-modal')
      ) {
        return;
      }

      // 3. Verifica se clicou no elemento em destaque (targetId) ou em qualquer nó dentro dele
      const targetElement = document.getElementById(currentStep.targetId);
      const isInsideTargetElement = !!(targetElement && (targetElement === clickTarget || targetElement.contains(clickTarget)));

      // 4. Ou se as coordenadas do clique estão dentro da área delimitada pelo spotlight do elemento
      let clientX = 0;
      let clientY = 0;
      if ('clientX' in event) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if ('changedTouches' in event && event.changedTouches && event.changedTouches.length > 0) {
        clientX = event.changedTouches[0].clientX;
        clientY = event.changedTouches[0].clientY;
      }

      let isWithinSpotlightBounds = false;
      if (targetRect && clientX > 0 && clientY > 0) {
        const pad = 12;
        const rectTop = targetRect.top - pad;
        const rectBottom = targetRect.bottom + pad;
        const rectLeft = targetRect.left - pad;
        const rectRight = targetRect.right + pad;
        if (
          clientX >= rectLeft &&
          clientX <= rectRight &&
          clientY >= rectTop &&
          clientY <= rectBottom
        ) {
          isWithinSpotlightBounds = true;
        }
      }

      // Se clicou no elemento apresentado no fundo ou dentro do holofote, minimiza o painel
      if (isInsideTargetElement || isWithinSpotlightBounds) {
        setIsMinimized(true);
      }
    };

    // Registrar com capture = true para interceptar o clique no elemento apresentado
    window.addEventListener('click', handleBackgroundInteraction, true);
    return () => {
      window.removeEventListener('click', handleBackgroundInteraction, true);
    };
  }, [isMinimized, currentStep.targetId, targetRect]);

  return (
    <>
      {/* 1. DARK SCREEN BACKDROP COM FOCO VAZADO / SPOTLIGHT */}
      <div 
        className="fixed inset-0 z-40 pointer-events-none transition-all duration-300"
        style={{
          backgroundColor: targetRect ? 'transparent' : 'rgba(18, 11, 5, 0.75)',
        }}
      >
        {targetRect && (
          <div
            className="fixed pointer-events-none transition-all duration-300 ease-out"
            style={{
              top: Math.max(0, targetRect.top - 8),
              left: Math.max(0, targetRect.left - 8),
              width: targetRect.width + 16,
              height: targetRect.height + 16,
              boxShadow: '0 0 0 9999px rgba(18, 11, 5, 0.78)',
              borderRadius: '20px',
              border: '3px solid #DE9E1E',
            }}
          >
            {/* Tag flutuante com o nome da ferramenta em foco - Clicável para minimizar */}
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="absolute -top-10 left-0 bg-[#DE9E1E] hover:bg-[#c98b12] text-[#3B220B] text-xs font-black px-3.5 py-1 rounded-t-xl rounded-br-xl shadow-lg flex items-center gap-1.5 whitespace-nowrap animate-bounce-short pointer-events-auto cursor-pointer transition-colors"
              title="Clique para minimizar o painel e interagir com o elemento no fundo"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>FERRAMENTA EM FOCO: {currentStep.targetName}</span>
              {!isMinimized && (
                <span className="text-[10px] font-bold bg-[#3B220B] text-[#DE9E1E] px-1.5 py-0.5 rounded ml-1.5 flex items-center gap-1">
                  <Minimize2 className="w-3 h-3" /> Clique no elemento p/ minimizar
                </span>
              )}
            </button>

            {/* Pulso de destaque nos 4 cantos */}
            <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#E5A823] rounded-full animate-ping"></span>
            <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#E5A823] rounded-full animate-ping"></span>
          </div>
        )}
      </div>

      {/* 2. BARRA SUPERIOR FIXA DO TOUR: SELETOR DE INTERFACE + CONTROLES */}
      <div className="tour-top-header fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl bg-[#2A180B]/95 backdrop-blur-md text-white rounded-2xl px-4 py-2.5 shadow-2xl border border-[#DE9E1E]/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#DE9E1E] text-[#3E2512] flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
            {currentStep.topicNumber}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#E5A823]">
                TOUR GUIADO DE ENGENHARIA DE SOFTWARE II • UNESP
              </span>
              <span className="hidden sm:inline-block text-[10px] bg-white/10 px-2 py-0.5 rounded-md text-gray-300">
                {currentStepIndex + 1} de 8 Tópicos
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white font-['Space_Grotesk'] truncate max-w-[200px] sm:max-w-md">
              {currentStep.topicTitle}
            </h4>
          </div>
        </div>

        {/* Alternador de Visão no Topo */}
        <div className="flex items-center gap-2">
          <div className="bg-[#1C0F07] p-1 rounded-xl border border-white/10 flex items-center gap-1">
            <button
              onClick={() => onToggleRole('cliente')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                role === 'cliente'
                  ? 'bg-[#E5A823] text-[#3E2512] shadow-xs'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Vista do</span> Cliente
            </button>
            <button
              onClick={() => onToggleRole('padeiro')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                role === 'padeiro'
                  ? 'bg-[#E5A823] text-[#3E2512] shadow-xs'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Vista do</span> Padeiro
            </button>
          </div>

          <button
            onClick={onExitTour}
            className="p-1.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
            title="Sair do Tour Guiado"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3. PAINEL DIDÁTICO FLUTUANTE COM PROTEÇÃO ANTI-SOBREPOSIÇÃO (EDUCATIONAL CALLOUT CARD) */}
      <div 
        ref={cardRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={
          cardPos
            ? {
                top: `${cardPos.y}px`,
                left: `${cardPos.x}px`,
                position: 'fixed',
                transform: 'none',
                bottom: 'auto',
                right: 'auto',
                margin: 0,
                userSelect: isDragging ? 'none' : 'auto',
              }
            : (dockPosition === 'right' || (dockPosition === 'auto' && isLargeScreen))
            ? {
                top: '68px',
                right: '16px',
                bottom: '16px',
                left: 'auto',
                width: '390px',
                maxWidth: '92vw',
                position: 'fixed',
                transform: 'none',
                margin: 0,
              }
            : (dockPosition === 'top' || (dockPosition === 'auto' && calculatedAutoSide === 'top'))
            ? {
                top: '68px',
                bottom: 'auto',
                left: '50%',
                position: 'fixed',
                transform: 'translateX(-50%)',
                margin: 0,
              }
            : {
                bottom: '16px',
                top: 'auto',
                left: '50%',
                position: 'fixed',
                transform: 'translateX(-50%)',
                margin: 0,
              }
        }
        className={`fixed z-50 ${
          isDragging 
            ? 'shadow-2xl ring-2 ring-[#DE9E1E] cursor-grabbing select-none opacity-40 backdrop-blur-md' 
            : isPeeking
            ? 'opacity-15 pointer-events-none transition-opacity duration-150'
            : isGhostMode
            ? 'opacity-30 hover:opacity-100 transition-opacity duration-200 shadow-xl'
            : 'opacity-100 transition-all duration-200'
        } ${
          isMinimized
            ? cardPos 
              ? 'w-80 bg-[#2A180B] text-white rounded-2xl p-3 shadow-2xl border border-[#DE9E1E]' 
              : 'bottom-4 right-4 w-80 bg-[#2A180B] text-white rounded-2xl p-3 shadow-2xl border border-[#DE9E1E]'
            : cardPos 
              ? 'w-[95%] max-w-4xl bg-white text-[#3E2512] rounded-3xl shadow-2xl border-2 border-[#DE9E1E] p-4 sm:p-5 max-h-[60vh] overflow-y-auto' 
              : (dockPosition === 'right' || (dockPosition === 'auto' && isLargeScreen))
              ? 'bg-white text-[#3E2512] rounded-3xl shadow-2xl border-2 border-[#DE9E1E] p-4 sm:p-5 h-[calc(100vh-84px)] max-h-[calc(100vh-84px)] overflow-y-auto'
              : 'w-[95%] max-w-4xl bg-white text-[#3E2512] rounded-3xl shadow-2xl border-2 border-[#DE9E1E] p-4 sm:p-5 max-h-[60vh] overflow-y-auto'
        }`}
      >
        {isMinimized ? (
          <div 
            onClick={(e) => {
              // Expandir ao clicar no card minimizado (exceto se clicou em botões de ação)
              const target = e.target as HTMLElement;
              if (target.closest('button')) return;
              setIsMinimized(false);
            }}
            className="flex items-center justify-between gap-2 cursor-pointer select-none"
            title="Clique para expandir o painel com as explicações de Engenharia de Software"
          >
            <div className="flex items-center gap-2 min-w-0">
              <GripHorizontal className="w-4 h-4 text-[#DE9E1E] flex-shrink-0 cursor-grab active:cursor-grabbing" />
              <span className="w-6 h-6 rounded-full bg-[#E5A823] text-[#3B220B] text-xs font-bold flex items-center justify-center flex-shrink-0">
                {currentStep.topicNumber}
              </span>
              <div className="min-w-0">
                <span className="text-xs font-bold truncate block max-w-[120px] sm:max-w-[150px]">
                  {currentStep.topicTitle}
                </span>
                <span className="text-[9px] text-[#E5A823] font-medium hidden sm:block">
                  Clique para expandir
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Navegação rápida entre os 8 tópicos mesmo minimizado */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                disabled={currentStepIndex === 0}
                className="p-1 hover:bg-white/10 rounded-lg text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Tópico anterior"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                disabled={currentStepIndex === steps.length - 1}
                className="p-1 hover:bg-white/10 rounded-lg text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                title="Próximo tópico"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {(cardPos || dockPosition !== 'auto') && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCardPos(null);
                    setDockPosition('auto');
                  }}
                  className="p-1 hover:bg-white/10 rounded-lg text-stone-300 hover:text-white"
                  title="Restaurar modo auto anti-sobreposição"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                }}
                className="px-2 py-1 bg-[#DE9E1E] text-[#3B220B] hover:bg-[#C98B12] rounded-lg font-bold text-xs flex items-center gap-1 transition-colors shadow-xs ml-1"
                title="Expandir card explicativo"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Expandir</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            
            {/* BARRA SUPERIOR MULTI-CONTROLE: ARRASTE + ANTI-SOBREPOSIÇÃO + RAIO-X */}
            <div 
              className="w-full flex flex-wrap items-center justify-between gap-1.5 pb-2 border-b border-[#F2EADB] cursor-grab active:cursor-grabbing select-none"
              title="Arraste livremente ou utilize os controles para evitar sobrepor as informações de trás"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#9B6F26]">
                <GripHorizontal className="w-4 h-4 text-[#DE9E1E] flex-shrink-0" />
                <span>Painel com Anti-Sobreposição</span>
              </div>

              {/* Botões de Ação para Não Cobrir o Software */}
              <div className="flex flex-wrap items-center gap-1.5">
                
                {/* Dica de clique no fundo */}
                <span className="text-[10px] text-[#7A561D] bg-[#FAF6EF] px-2 py-0.5 rounded-md border border-[#EADBCA] hidden lg:inline flex items-center gap-1">
                  <Minimize2 className="w-3 h-3 text-[#DE9E1E]" /> Clique no elemento p/ minimizar
                </span>
                
                {/* 1. Status / Indicador do Modo Atual */}
                {dockPosition === 'auto' && !cardPos && (
                  <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>Auto ({isLargeScreen ? 'Lateral Aberta' : (calculatedAutoSide === 'top' ? 'Topo' : 'Base')})</span>
                  </span>
                )}

                {dockPosition === 'right' && !cardPos && (
                  <span className="text-[10px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300 font-bold">
                    Lateral Fixa
                  </span>
                )}

                {cardPos && (
                  <span className="text-[10px] text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 font-bold">
                    Posição Livre
                  </span>
                )}

                {/* 2. Botão Inverter Posição (Topo ↔ Rodapé) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCardPos(null);
                    const currentSide = dockPosition === 'auto' ? calculatedAutoSide : dockPosition;
                    setDockPosition(currentSide === 'bottom' ? 'top' : 'bottom');
                  }}
                  className="px-2 py-0.5 rounded-md border border-[#EADBCA] bg-[#FAF6EF] hover:bg-[#F2EADB] text-[#3E2512] font-bold text-[10px] sm:text-[11px] flex items-center gap-1 transition-colors"
                  title="Alternar posição entre Topo e Rodapé para não cobrir o software"
                >
                  <ArrowDownUp className="w-3 h-3 text-[#DE9E1E]" />
                  <span>
                    {(dockPosition === 'top' || (dockPosition === 'auto' && calculatedAutoSide === 'top')) 
                      ? 'Mover p/ Base' 
                      : 'Mover p/ Topo'}
                  </span>
                </button>

                {/* 3. Botão Fixar na Lateral (Split View) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCardPos(null);
                    setDockPosition(dockPosition === 'right' ? 'auto' : 'right');
                  }}
                  className={`px-2 py-0.5 rounded-md border text-[10px] sm:text-[11px] font-bold flex items-center gap-1 transition-colors ${
                    dockPosition === 'right'
                      ? 'bg-[#3E2512] text-[#FAF6EF] border-[#3E2512] shadow-xs'
                      : 'bg-[#FAF6EF] hover:bg-[#F2EADB] text-[#3E2512] border-[#EADBCA]'
                  }`}
                  title="Fixar na lateral direita para deixar 100% do centro da tela livre"
                >
                  <PanelRight className="w-3 h-3 text-[#DE9E1E]" />
                  <span>{dockPosition === 'right' ? 'Desafixar Lateral' : 'Fixar Lateral'}</span>
                </button>

                {/* 4. Botão Modo Raio-X / Ver Fundo */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsGhostMode(!isGhostMode);
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setIsPeeking(true);
                  }}
                  onMouseUp={() => setIsPeeking(false)}
                  onMouseLeave={() => setIsPeeking(false)}
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    setIsPeeking(true);
                  }}
                  onTouchEnd={() => setIsPeeking(false)}
                  className={`px-2 py-0.5 rounded-md border text-[10px] sm:text-[11px] font-bold flex items-center gap-1 transition-colors ${
                    isGhostMode
                      ? 'bg-[#DE9E1E] text-[#3E2512] border-[#C98B12] shadow-xs'
                      : 'bg-[#FAF6EF] hover:bg-[#F2EADB] text-[#3E2512] border-[#EADBCA]'
                  }`}
                  title="Clique para ativar transparência ou segure pressionado para espiar o que está atrás"
                >
                  {isGhostMode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3 text-[#DE9E1E]" />}
                  <span>{isGhostMode ? 'Sólido' : 'Raio-X'}</span>
                </button>

                {/* 5. Botão Redefinir / Auto */}
                {(cardPos || dockPosition !== 'auto' || isGhostMode) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCardPos(null);
                      setDockPosition('auto');
                      setIsGhostMode(false);
                    }}
                    className="text-[10px] sm:text-[11px] text-[#9B6F26] hover:text-[#3E2512] font-bold flex items-center gap-1 bg-[#DE9E1E]/15 hover:bg-[#DE9E1E]/25 px-2 py-0.5 rounded-md border border-[#DE9E1E] transition-colors"
                    title="Restaurar modo inteligente anti-colisão automático"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Auto</span>
                  </button>
                )}
              </div>
            </div>

            {/* AVISO DO MODO RAIO-X SE ATIVO */}
            {isGhostMode && (
              <div className="bg-[#FAF6EF] text-[#7A561D] text-[11px] font-medium px-2.5 py-1 rounded-lg border border-[#EADBCA] flex items-center justify-between">
                <span>👁️ Modo Raio-X ativado (30% opacidade). Passe o cursor para ler com nitidez ou clique em "Sólido".</span>
                <button
                  type="button"
                  onClick={() => setIsGhostMode(false)}
                  className="font-bold underline text-[#3E2512]"
                >
                  Fechar Raio-X
                </button>
              </div>
            )}

            {/* Header do Card com Botão de Minimizar e Tags */}
            <div className="flex items-start justify-between gap-3 border-b border-[#F2EADB] pb-2.5 cursor-grab active:cursor-grabbing select-none">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="bg-[#4A2F17] text-white text-[11px] font-black px-2.5 py-0.5 rounded-lg font-['Space_Grotesk']">
                    SEÇÃO {currentStep.topicCode}
                  </span>
                  <span className="bg-[#FAF6EF] border border-[#EADBCA] text-[#7A561D] text-[11px] font-bold px-2.5 py-0.5 rounded-lg">
                    {currentStep.topicBadge}
                  </span>
                  <span className="text-xs font-semibold text-[#75604C] flex items-center gap-1">
                    <span>•</span>
                    <span>{currentStep.softwareEngineeringApplication.secaoDocumento}</span>
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#3E2512] font-['Space_Grotesk'] leading-snug">
                  {currentStep.topicTitle}
                </h3>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 text-[#75604C] hover:text-[#3E2512] hover:bg-[#FAF6EF] rounded-xl transition-colors"
                  title="Minimizar para ver o software livremente"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Destaque do Conceito Aplicado à Ferramenta */}
            <div className="bg-[#FAF6EF] rounded-2xl p-3.5 sm:p-4 border border-[#EADBCA] space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#9B6F26]">
                <Sparkles className="w-4 h-4 text-[#DE9E1E]" />
                <span>Como este elemento do software reflete o tópico:</span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-[#3E2512]">
                {currentStep.softwareEngineeringApplication.conceitoChave}
              </p>

              <p className="text-xs text-[#75604C] leading-relaxed">
                {currentStep.softwareEngineeringApplication.explicacaoDetalhada}
              </p>
            </div>

            {/* Grid com Pontos Práticos de Engenharia e Normas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white rounded-xl p-3 border border-[#EADBCA]">
                <span className="font-extrabold text-[#3E2512] block mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Aplicação Prática no Unespão:
                </span>
                <ul className="space-y-1 text-[#75604C]">
                  {currentStep.softwareEngineeringApplication.pontosPraticos.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#DE9E1E] font-bold mt-0.5">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl p-3 border border-[#EADBCA] flex flex-col justify-between">
                <div>
                  <span className="font-extrabold text-[#3E2512] block mb-1.5 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#DE9E1E]" />
                    Padrões & Modelos Referenciados:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentStep.softwareEngineeringApplication.padroesOuNormas.map((norma, idx) => (
                      <span 
                        key={idx}
                        className="bg-[#FAF6EF] text-[#7A561D] border border-[#EADBCA] px-2 py-0.5 rounded-md font-semibold text-[10px]"
                      >
                        {norma}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botão de Ação / Demonstração ao Vivo se configurado */}
                {currentStep.demoAction && (
                  <button
                    onClick={() => handleTriggerDemo(currentStep.demoAction!.type)}
                    className="mt-2.5 w-full flex items-center justify-center gap-2 bg-[#4A2F17] hover:bg-[#3B220B] text-white py-2 px-3 rounded-xl font-bold text-xs transition-colors shadow-2xs"
                  >
                    <Play className="w-3.5 h-3.5 text-[#E5A823]" />
                    <span>{currentStep.demoAction.label}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Barra Inferior de Navegação entre os 8 Tópicos */}
            <div className="pt-2 border-t border-[#F2EADB] flex flex-col sm:flex-row items-center justify-between gap-3">
              
              {/* Pílulas de Navegação 1..8 */}
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 justify-center">
                {steps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => onStepChange(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-black transition-all flex items-center justify-center ${
                      idx === currentStepIndex
                        ? 'bg-[#E5A823] text-[#3B220B] shadow-xs scale-105'
                        : idx < currentStepIndex
                        ? 'bg-[#4A2F17] text-white'
                        : 'bg-[#FAF6EF] border border-[#EADBCA] text-[#75604C] hover:bg-[#F2EADB]'
                    }`}
                    title={`Tópico ${step.topicNumber}: ${step.topicTitle}`}
                  >
                    {step.topicNumber}
                  </button>
                ))}
              </div>

              {/* Botões de Avanço / Recuo */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handlePrev}
                  disabled={currentStepIndex === 0}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-[#EADBCA] text-[#75604C] hover:bg-[#FAF6EF] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>

                {currentStepIndex < steps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#E5A823] hover:bg-[#D99A16] text-[#3B220B] shadow-xs transition-colors"
                  >
                    <span>Próximo Tópico</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={onExitTour}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Concluir Tour</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        )}
      </div>

      {/* 4. MODAL DEMO: ADAPTER DE PAGAMENTO INTERATIVO */}
      {activeDemoModal === 'adapter' && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-[#EADBCA] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#F2EADB] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#4A2F17] text-[#E5A823] flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#3E2512] font-['Space_Grotesk']">
                    Padrão GoF Adapter em Execução
                  </h4>
                  <span className="text-[11px] text-[#75604C]">Demonstração de normalização de contratos</span>
                </div>
              </div>
              <button
                onClick={() => setActiveDemoModal(null)}
                className="p-1 hover:bg-[#FAF6EF] rounded-xl text-[#75604C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#75604C]">
              O cliente pode pagar por Pix, Cartão ou no Balcão. O padrão <b>Adapter</b> converte o protocolo de cada gateway em um resultado unificado para o domínio.
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAdapterMethod('pix');
                  setAdapterPayload({
                    status: 'Autorizado via Pix BACEN',
                    protocolo: 'PIX-UNESP-' + Math.floor(1000 + Math.random() * 9000),
                    latencia: '128ms',
                    contrato: 'PixGatewayAdapter.pay()'
                  });
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  adapterMethod === 'pix' ? 'bg-[#4A2F17] text-white border-[#4A2F17]' : 'bg-[#FAF6EF] text-[#75604C] border-[#EADBCA]'
                }`}
              >
                Pix Instantâneo
              </button>
              <button
                onClick={() => {
                  setAdapterMethod('cartao');
                  setAdapterPayload({
                    status: 'Captura Pré-Autorizada Cielo/Stone',
                    protocolo: 'CARD-AUTH-' + Math.floor(1000 + Math.random() * 9000),
                    latencia: '240ms',
                    contrato: 'CartaoCreditoAdapter.pay()'
                  });
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  adapterMethod === 'cartao' ? 'bg-[#4A2F17] text-white border-[#4A2F17]' : 'bg-[#FAF6EF] text-[#75604C] border-[#EADBCA]'
                }`}
              >
                Cartão de Crédito
              </button>
              <button
                onClick={() => {
                  setAdapterMethod('balcao');
                  setAdapterPayload({
                    status: 'Pagamento Presencial Registrado',
                    protocolo: 'BALCAO-UNESP-' + Math.floor(1000 + Math.random() * 9000),
                    latencia: '12ms',
                    contrato: 'BalcaoPresencialAdapter.pay()'
                  });
                }}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  adapterMethod === 'balcao' ? 'bg-[#4A2F17] text-white border-[#4A2F17]' : 'bg-[#FAF6EF] text-[#75604C] border-[#EADBCA]'
                }`}
              >
                No Balcão
              </button>
            </div>

            <div className="bg-[#1C0F07] text-[#FAF6EF] p-4 rounded-2xl font-mono text-xs space-y-1.5 border border-[#4A2F17]">
              <div className="text-[#DE9E1E] font-bold text-[10px] uppercase">
                // Payload Normalizado pelo Adapter:
              </div>
              <div><b>Contrato:</b> <span className="text-emerald-400">{adapterPayload.contrato}</span></div>
              <div><b>Status:</b> <span className="text-amber-300">{adapterPayload.status}</span></div>
              <div><b>Protocolo:</b> {adapterPayload.protocolo}</div>
              <div><b>Latência:</b> {adapterPayload.latencia}</div>
            </div>

            <button
              onClick={() => setActiveDemoModal(null)}
              className="w-full bg-[#E5A823] hover:bg-[#D99A16] text-[#3B220B] font-bold py-2.5 rounded-xl text-xs transition-colors"
            >
              Fechar Demonstração
            </button>
          </div>
        </div>
      )}

      {/* 5. MODAL DEMO: SUÍTE DE TESTES XUNIT INTERATIVA */}
      {activeDemoModal === 'tests' && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-[#EADBCA] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#F2EADB] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#3E2512] font-['Space_Grotesk']">
                    Execução de Testes Automatizados (xUnit + Moq)
                  </h4>
                  <span className="text-[11px] text-[#75604C]">Critério de cobertura &gt; 80% e regressão</span>
                </div>
              </div>
              <button
                onClick={() => setActiveDemoModal(null)}
                className="p-1 hover:bg-[#FAF6EF] rounded-xl text-[#75604C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#18120B] text-white p-4 rounded-2xl font-mono text-xs space-y-2 border border-[#3E2512]">
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>4 Testes de Unidade Aprovados (100% PASS)</span>
              </div>
              <div className="text-gray-400 text-[11px] space-y-1">
                <div>✓ CalculoPreco_Personalizacao_RetornaTotalExato (18ms)</div>
                <div>✓ MaquinaDeEstados_TransicoesValidas_AtualizaStatus (24ms)</div>
                <div>✓ IngredientesRemovidos_LancheSemCebola_AlertaPadeiro (31ms)</div>
                <div>✓ AdapterPagamento_PixInvalido_LancaFalhaAutorizacao (14ms)</div>
              </div>
            </div>

            <button
              onClick={() => setActiveDemoModal(null)}
              className="w-full bg-[#4A2F17] hover:bg-[#3B220B] text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
            >
              Voltar ao Tour
            </button>
          </div>
        </div>
      )}

    </>
  );
};
