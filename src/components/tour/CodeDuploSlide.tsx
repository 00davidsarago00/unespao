import React from 'react';
import { BookOpen, Maximize2 } from 'lucide-react';
import { TourStep, CodigoBloco } from '../../data/spotlightTourData';
import { CodeHighlighter } from './CodeHighlighter';

interface CodeDuploSlideProps {
  step: TourStep;
  blocos: [CodigoBloco, CodigoBloco];
  onExpand: () => void;
}

export const CodeDuploSlide: React.FC<CodeDuploSlideProps> = ({ step, blocos, onExpand }) => (
  <div key={step.id} className="w-full max-w-6xl mx-auto tour-slide-enter">
    <div className="relative mb-8 sm:mb-10">
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[110px] sm:text-[150px] font-black text-[#3E2512]/5 select-none leading-none font-['Space_Grotesk']">
        {String(step.capitulo).padStart(2, '0')}
      </span>
      <div className="relative flex flex-col items-center text-center gap-3">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#9B6F26]">
          <BookOpen className="w-4 h-4 text-[#DE9E1E]" />
          <span>{step.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-[#3E2512] font-['Space_Grotesk'] leading-[1.05]">
          {step.titulo}
        </h2>
        {step.resumo && (
          <p className="text-base sm:text-lg text-[#4A2F17] font-semibold leading-snug max-w-2xl">
            {step.resumo}
          </p>
        )}
        {step.chips && step.chips.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 pt-1">
            {step.chips.map((chip, idx) => (
              <span key={idx} className="bg-white text-[#7A561D] border border-[#EADBCA] px-2.5 py-1 rounded-lg font-semibold text-[10px] sm:text-[11px] shadow-2xs">
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>

    <div className="relative group">
      <button
        type="button"
        onClick={onExpand}
        className="absolute -top-3 right-0 -translate-y-full bg-[#2A180B]/85 hover:bg-[#2A180B] text-white p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        title="Ver em tela cheia"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
        {blocos.map((bloco, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3.5">
            <div className="w-full bg-[#1C0F07] rounded-3xl border-2 border-[#EADBCA] shadow-xl overflow-hidden h-[300px] sm:h-[360px]">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#2A180B] border-b border-[#4A2F17]">
                <span className="text-xs sm:text-sm uppercase tracking-wider font-black text-[#E5A823]">{bloco.titulo}</span>
                <span className="text-[9px] uppercase tracking-wider text-stone-400">C# · .NET 8</span>
              </div>
              <div className="py-3 text-stone-200 overflow-y-auto h-[calc(100%-2.75rem)]">
                <CodeHighlighter codigo={bloco.codigo} linguagem={bloco.linguagem} linhasDestaque={bloco.linhasDestaque} />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#75604C] leading-relaxed text-center max-w-md px-2">
              {bloco.descricao}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
