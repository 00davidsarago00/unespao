import React, { useState, useRef } from 'react';
import { BookOpen, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { TourStep } from '../../data/spotlightTourData';
import { DiagramPanel } from './DiagramPanel';
import { ContextIllustration } from './ContextIllustration';
import { CodeHighlighter } from './CodeHighlighter';
import { RecapMap } from './RecapMap';
import { CodeDuploSlide } from './CodeDuploSlide';

interface TheorySlideProps {
  step: TourStep;
}

const VisualContent: React.FC<{ step: TourStep }> = ({ step }) => {
  if (step.visual?.tipo === 'diagrama') {
    return <DiagramPanel diagramaId={step.visual.diagramaId} regiao={step.visual.regiao} />;
  }
  if (step.visual?.tipo === 'codigo') {
    return (
      <div className="w-full h-full bg-[#1C0F07] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-2 bg-[#2A180B] border-b border-[#4A2F17] sticky top-0">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#E5A823]">
            {step.visual.linguagem === 'csharp' ? 'C# · .NET 8' : 'TypeScript'}
          </span>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
        </div>
        <div className="py-3 text-stone-200">
          <CodeHighlighter codigo={step.visual.codigo} linguagem={step.visual.linguagem} linhasDestaque={step.visual.linhasDestaque} />
        </div>
      </div>
    );
  }
  if (step.visual?.tipo === 'codigo-duplo') {
    return (
      <div className="w-full h-full bg-[#1C0F07] overflow-y-auto grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#4A2F17]">
        {step.visual.blocos.map((bloco, idx) => (
          <div key={idx} className="min-w-0">
            <div className="flex items-center justify-between px-3 py-2 bg-[#2A180B] border-b border-[#4A2F17] sticky top-0">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#E5A823]">{bloco.titulo}</span>
              <span className="text-[9px] uppercase tracking-wider text-stone-400">
                {bloco.linguagem === 'csharp' ? 'C#' : 'TS'}
              </span>
            </div>
            <div className="py-2.5 text-stone-200">
              <CodeHighlighter codigo={bloco.codigo} linguagem={bloco.linguagem} linhasDestaque={bloco.linhasDestaque} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (step.visual?.tipo === 'recap') {
    return <RecapMap />;
  }
  return <ContextIllustration />;
};

// Painel com zoom (scroll/botões) e pan por arraste quando ampliado — usado
// só dentro da visão em tela cheia, para diagramas com texto pequeno.
//
// O arraste escreve direto no DOM via ref + requestAnimationFrame, sem passar
// por setState a cada pixel: SVGs e o CodeHighlighter (que tokeniza cada linha
// por regex) são caros o bastante para re-renderizar que, movendo o pan pelo
// estado do React a cada mousemove, o arraste ficava visivelmente travado. O
// estado (pan/scale) só é atualizado ao soltar o botão ou pelos controles de
// zoom, que são as únicas ações que realmente precisam de um re-render.
const ZoomableVisual: React.FC<{ step: TourStep }> = ({ step }) => {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);
  const pendingPan = useRef(pan);
  const rafRef = useRef<number | null>(null);

  const applyTransform = (s: number, p: { x: number; y: number }) => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translate(${p.x}px, ${p.y}px) scale(${s})`;
    }
  };

  const clampScale = (s: number) => Math.max(1, Math.min(4, s));

  const zoomBy = (delta: number) => {
    setScale(prev => {
      const next = clampScale(prev + delta);
      const nextPan = next === 1 ? { x: 0, y: 0 } : pan;
      if (next === 1) setPan(nextPan);
      pendingPan.current = nextPan;
      applyTransform(next, nextPan);
      return next;
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    zoomBy(e.deltaY < 0 ? 0.25 : -0.25);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
    if (contentRef.current) contentRef.current.style.transition = 'none';
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const next = {
      x: dragRef.current.panX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.panY + (e.clientY - dragRef.current.startY),
    };
    pendingPan.current = next;
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(() => {
        applyTransform(scale, pendingPan.current);
        rafRef.current = null;
      });
    }
  };

  const endDrag = () => {
    if (!dragRef.current) return;
    dragRef.current = null;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (contentRef.current) contentRef.current.style.transition = 'transform 0.15s ease-out';
    setIsDragging(false);
    setPan(pendingPan.current);
  };

  const reset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    pendingPan.current = { x: 0, y: 0 };
    if (contentRef.current) contentRef.current.style.transition = 'transform 0.15s ease-out';
    applyTransform(1, { x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={reset}
        className="w-full h-full touch-none"
        style={{
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
        }}
      >
        <div
          ref={contentRef}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease-out',
            width: '100%',
            height: '100%',
            willChange: 'transform',
          }}
        >
          <VisualContent step={step} />
        </div>
      </div>

      {/* Controles de zoom */}
      <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-[#2A180B]/90 rounded-xl p-1 shadow-lg">
        <button type="button" onClick={() => zoomBy(-0.25)} className="p-2 text-white hover:bg-white/10 rounded-lg" title="Diminuir zoom">
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-white text-xs font-bold w-10 text-center select-none">{Math.round(scale * 100)}%</span>
        <button type="button" onClick={() => zoomBy(0.25)} className="p-2 text-white hover:bg-white/10 rounded-lg" title="Aumentar zoom">
          <ZoomIn className="w-4 h-4" />
        </button>
        {scale > 1 && (
          <button type="button" onClick={reset} className="p-2 text-white hover:bg-white/10 rounded-lg" title="Restaurar">
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export const TheorySlide: React.FC<TheorySlideProps> = ({ step }) => {
  const [expanded, setExpanded] = useState(false);
  const isExpandable = step.visual?.tipo === 'diagrama' || step.visual?.tipo === 'codigo' || step.visual?.tipo === 'codigo-duplo';

  // Fechar a visão em tela cheia e resetar o scroll da página sempre que o
  // passo mudar — a barra de navegação é fixa relativa à viewport, então o
  // scroll do documento (herdado de um passo de prática anterior) precisa
  // ser zerado para ela não parecer "flutuar".
  React.useEffect(() => {
    setExpanded(false);
    window.scrollTo(0, 0);
  }, [step.id]);

  // Enquanto em tela cheia, Esc/setas fecham o zoom em vez de navegar o tour
  // (captura antes do listener global da barra de navegação).
  React.useEffect(() => {
    if (!expanded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') {
        e.stopPropagation();
        if (e.key === 'Escape') setExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [expanded]);

  if (step.visual?.tipo === 'codigo-duplo') {
    return (
      <div className="fixed inset-0 z-50 bg-[#FAF6EF] overflow-y-auto pt-24 pb-10 px-4 sm:px-8 flex items-center">
        <CodeDuploSlide step={step} blocos={step.visual.blocos} onExpand={() => setExpanded(true)} />

        {expanded && (
          <div className="fixed inset-0 z-[80] bg-[#1C0F07]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 tour-fade-enter">
            <div className="relative w-full h-full max-w-6xl bg-white rounded-3xl border-2 border-[#EADBCA] shadow-2xl overflow-hidden tour-zoom-enter">
              <ZoomableVisual step={step} />
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="absolute top-4 right-4 bg-[#2A180B] hover:bg-[#3B220B] text-white p-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold"
                title="Minimizar (Esc)"
              >
                <Minimize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Minimizar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF6EF] overflow-y-auto pt-24 pb-10 px-4 sm:px-8">
      <div key={step.id} className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10 items-center min-h-[calc(100vh-9rem)] tour-slide-enter">

        {/* COLUNA ESQUERDA: CONCEITO */}
        <div className="relative">
          <span className="absolute -top-8 -left-2 sm:-left-4 text-[110px] sm:text-[150px] font-black text-[#3E2512]/5 select-none leading-none font-['Space_Grotesk']">
            {String(step.capitulo).padStart(2, '0')}
          </span>

          <div className="relative space-y-5">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#9B6F26]">
              <BookOpen className="w-4 h-4 text-[#DE9E1E]" />
              <span>{step.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#3E2512] font-['Space_Grotesk'] leading-[1.05]">
              {step.titulo}
            </h2>

            {step.resumo && (
              <p className="text-lg sm:text-xl text-[#4A2F17] font-semibold leading-snug border-l-4 border-[#DE9E1E] pl-4">
                {step.resumo}
              </p>
            )}

            {step.conteudo && step.conteudo.length > 0 && (
              <div className="space-y-2.5 pt-1">
                {step.conteudo.map((linha, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-[#75604C] leading-relaxed">
                    {linha}
                  </p>
                ))}
              </div>
            )}

            {step.chips && step.chips.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {step.chips.map((chip, idx) => (
                  <span key={idx} className="bg-white text-[#7A561D] border border-[#EADBCA] px-2.5 py-1 rounded-lg font-semibold text-[10px] sm:text-[11px] shadow-2xs">
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA: VISUAL (DIAGRAMA, CÓDIGO OU ILUSTRAÇÃO) */}
        <div className="relative group bg-white rounded-3xl border-2 border-[#EADBCA] shadow-lg overflow-hidden h-[300px] sm:h-[380px] lg:h-[440px]">
          <VisualContent step={step} />

          {isExpandable && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="absolute top-3 right-3 bg-[#2A180B]/85 hover:bg-[#2A180B] text-white p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              title="Ver em tela cheia"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* VISÃO EM TELA CHEIA DO DIAGRAMA/CÓDIGO, COM ZOOM */}
      {expanded && (
        <div className="fixed inset-0 z-[80] bg-[#1C0F07]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 tour-fade-enter">
          <div className="relative w-full h-full max-w-6xl bg-white rounded-3xl border-2 border-[#EADBCA] shadow-2xl overflow-hidden tour-zoom-enter">
            <ZoomableVisual step={step} />
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 bg-[#2A180B] hover:bg-[#3B220B] text-white p-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold"
              title="Minimizar (Esc)"
            >
              <Minimize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Minimizar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
