import React from 'react';
import { ArrowLeft, ArrowRight, X, BookOpen, Smartphone, ClipboardList } from 'lucide-react';
import { TourStep } from '../../data/spotlightTourData';

const FASE_ICON: Record<TourStep['fase'], React.ReactNode> = {
  teoria: <BookOpen className="w-3 h-3" />,
  cliente: <Smartphone className="w-3 h-3" />,
  atendente: <ClipboardList className="w-3 h-3" />,
};

const FASE_LABEL: Record<TourStep['fase'], string> = {
  teoria: 'Teoria',
  cliente: 'Prática · Cliente',
  atendente: 'Prática · Atendente',
};

const CHAPTER_NAMES: Record<number, string> = {
  1: 'Introdução',
  2: 'Arquitetura',
  3: 'Componentes',
  4: 'Interface',
  5: 'Testes',
  6: 'Configuração',
};

function proximoRotulo(steps: TourStep[], currentIndex: number): string {
  const next = steps[currentIndex + 1];
  if (!next) return 'Concluir';
  if (next.fase === 'teoria') {
    return next.capitulo === 0 ? 'Encerramento' : `Cap. ${next.capitulo}: ${CHAPTER_NAMES[next.capitulo] ?? 'Teoria'}`;
  }
  return FASE_LABEL[next.fase];
}

interface ControlBarProps {
  steps: TourStep[];
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  onExitTour: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({ steps, currentStepIndex, onStepChange, onExitTour }) => {
  const currentStep = steps[currentStepIndex];
  const total = steps.length;

  const capitulos = React.useMemo(() => {
    const map = new Map<number, number>();
    steps.forEach((s, idx) => {
      if (s.capitulo >= 1 && !map.has(s.capitulo)) map.set(s.capitulo, idx);
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [steps]);

  const handlePrev = () => onStepChange(Math.max(0, currentStepIndex - 1));
  const handleNext = () => onStepChange(Math.min(total - 1, currentStepIndex + 1));

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); handleNext(); }
      else if (e.key === 'ArrowLeft') { handlePrev(); }
      else if (e.key === 'Escape') { onExitTour(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepIndex]);

  return (
    <header className="fixed top-2 left-1/2 -translate-x-1/2 z-[60] w-[97%] max-w-5xl bg-[#2A180B]/95 backdrop-blur-md text-white rounded-2xl px-3 sm:px-4 py-2.5 shadow-2xl border border-[#DE9E1E]/50 flex items-center justify-between gap-2 sm:gap-3">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-[#DE9E1E] text-[#3E2512] flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
          {currentStep.capitulo || '•'}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#E5A823]">
              Passo {currentStepIndex + 1} de {total}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-white/10 px-2 py-0.5 rounded-md text-gray-300">
              {FASE_ICON[currentStep.fase]}
              {FASE_LABEL[currentStep.fase]}
            </span>
          </div>
          <h4 className="text-xs sm:text-sm font-bold text-white font-['Space_Grotesk'] truncate max-w-[160px] sm:max-w-xs">
            {currentStep.titulo}
          </h4>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-1 bg-[#1C0F07] p-1 rounded-xl border border-white/10">
        {capitulos.map(([cap, idx]) => {
          const isActive = currentStep.capitulo === cap;
          return (
            <button
              key={cap}
              onClick={() => onStepChange(idx)}
              title={`Capítulo ${cap}: ${CHAPTER_NAMES[cap]}`}
              className={`flex items-center gap-1.5 rounded-lg text-[10px] font-bold transition-all overflow-hidden ${
                isActive
                  ? 'bg-[#DE9E1E] text-[#3B220B] px-2.5 py-1'
                  : 'text-stone-400 hover:bg-white/10 hover:text-white w-6 h-6 justify-center'
              }`}
            >
              <span className={isActive ? 'font-black' : ''}>{cap}</span>
              {isActive && <span className="whitespace-nowrap">{CHAPTER_NAMES[cap]}</span>}
            </button>
          );
        })}
      </div>
      {/* Em telas médias, mostra só o nome do capítulo atual (sem os demais números) */}
      <div className="hidden md:flex lg:hidden items-center">
        <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-lg text-[#E5A823] font-bold whitespace-nowrap">
          Cap. {currentStep.capitulo}: {CHAPTER_NAMES[currentStep.capitulo] ?? ''}
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className="p-1.5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
          title="Passo anterior (←)"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentStepIndex === total - 1}
          className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#E5A823] hover:bg-[#D99A16] text-[#3B220B] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
          title="Próximo passo (→)"
        >
          <span className="hidden sm:inline">{proximoRotulo(steps, currentStepIndex)}</span>
          <span className="sm:hidden">Próximo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={onExitTour}
          className="p-1.5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
          title="Sair da Apresentação (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
