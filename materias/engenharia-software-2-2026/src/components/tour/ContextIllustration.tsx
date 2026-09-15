import React from 'react';
import { Smartphone, ClipboardList, Layers } from 'lucide-react';

// Ilustração própria (não é um diagrama do documento) usada nos slides de
// abertura/encerramento e na Introdução — representa visualmente o
// minimundo (Cliente e Atendente/Administrador em torno do Sistema Unespão)
// sem depender de nenhum arquivo externo.
export const ContextIllustration: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white border-2 border-[#EADBCA] shadow-md flex items-center justify-center">
            <Smartphone className="w-7 h-7 sm:w-9 sm:h-9 text-[#DE9E1E]" />
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-[#3E2512]">Cliente</span>
        </div>

        <div className="h-[2px] w-8 sm:w-14 bg-gradient-to-r from-[#EADBCA] to-[#DE9E1E]" />

        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[28px] bg-[#3E2512] shadow-xl flex items-center justify-center ring-4 ring-[#DE9E1E]/30">
            <Layers className="w-10 h-10 sm:w-12 sm:h-12 text-[#DE9E1E]" />
          </div>
          <span className="text-[10px] sm:text-xs font-black text-[#3E2512] text-center">Sistema<br />Unespão</span>
        </div>

        <div className="h-[2px] w-8 sm:w-14 bg-gradient-to-l from-[#EADBCA] to-[#DE9E1E]" />

        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white border-2 border-[#EADBCA] shadow-md flex items-center justify-center">
            <ClipboardList className="w-7 h-7 sm:w-9 sm:h-9 text-[#DE9E1E]" />
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-[#3E2512] text-center">Atendente/<br />Administrador</span>
        </div>
      </div>
    </div>
  );
};
