import React from 'react';
import { Smartphone, ChefHat, Sparkles, ArrowRight, X, Layers, Compass } from 'lucide-react';

interface SpotlightRoleSelectorModalProps {
  isOpen: boolean;
  onSelectRole: (role: 'cliente' | 'padeiro') => void;
  onCancel: () => void;
}

export const SpotlightRoleSelectorModal: React.FC<SpotlightRoleSelectorModalProps> = ({
  isOpen,
  onSelectRole,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#120B05]/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#EADBCA] shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header com Título e Fechamento */}
        <div className="flex items-start justify-between gap-4 border-b border-[#F2EADB] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DE9E1E]"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#9B6F26] font-['Space_Grotesk']">
                TOUR GUIADO INTERATIVO • ENGENHARIA DE SOFTWARE II
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#3E2512] font-['Space_Grotesk']">
              Escolha a Interface para o Tour
            </h2>
            <p className="text-xs sm:text-sm text-[#75604C] mt-1">
              O tour escurece a tela e dá ênfase (spotlight) diretamente nas ferramentas do software, explicando a aplicação prática de cada tópico acadêmico. Em qual visão deseja iniciar?
            </p>
          </div>

          <button
            onClick={onCancel}
            className="p-1.5 hover:bg-[#FAF6EF] rounded-xl text-[#75604C] hover:text-[#3E2512] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Opções Grandes de Seleção */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Opção 1: Cliente */}
          <div
            onClick={() => onSelectRole('cliente')}
            className="group bg-[#FAF6EF] hover:bg-[#F4ECE0] rounded-2xl p-5 border-2 border-[#EADBCA] hover:border-[#DE9E1E] transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E5A823] text-[#3B220B] flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#9B6F26] bg-[#EADBCA] px-2 py-0.5 rounded-md">
                  Visão do Estudante / Consumidor
                </span>
                <h3 className="text-lg font-bold text-[#3E2512] mt-1 font-['Space_Grotesk'] group-hover:text-[#DE9E1E] transition-colors">
                  Visão do Cliente
                </h3>
              </div>

              <p className="text-xs text-[#75604C] leading-relaxed">
                Tour focado na busca de padarias do campus, personalização de lanches no padrão iFood, carrinho de compras e avaliações online.
              </p>

              <div className="text-[11px] text-[#7A561D] bg-white/70 rounded-xl p-2.5 border border-[#EADBCA] space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#DE9E1E]" />
                  Tópicos em Destaque:
                </div>
                <div className="text-[#75604C]">
                  Requisitos de Usuário, Clean Architecture, Padrão GoF Adapter e Heurísticas de Nielsen.
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-[#4A2F17] group-hover:bg-[#3B220B] text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-xs transition-colors"
            >
              <span>Iniciar na Visão do Cliente</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Opção 2: Padeiro */}
          <div
            onClick={() => onSelectRole('padeiro')}
            className="group bg-[#FAF6EF] hover:bg-[#F4ECE0] rounded-2xl p-5 border-2 border-[#EADBCA] hover:border-[#DE9E1E] transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-md"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#4A2F17] text-[#E5A823] flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition-transform">
                <ChefHat className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#9B6F26] bg-[#EADBCA] px-2 py-0.5 rounded-md">
                  Visão da Operação / Cozinha
                </span>
                <h3 className="text-lg font-bold text-[#3E2512] mt-1 font-['Space_Grotesk'] group-hover:text-[#DE9E1E] transition-colors">
                  Visão do Padeiro
                </h3>
              </div>

              <p className="text-xs text-[#75604C] leading-relaxed">
                Tour focado no painel KDS em tempo real, pedidos chegando na chapa, destaque de ingredientes retirados e avanço de etapas de produção.
              </p>

              <div className="text-[11px] text-[#7A561D] bg-white/70 rounded-xl p-2.5 border border-[#EADBCA] space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#DE9E1E]" />
                  Tópicos em Destaque:
                </div>
                <div className="text-[#75604C]">
                  Event-Driven, Ergonomia de Cozinha, Máquina de Estados FSM com xUnit e SLA do forno.
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-[#E5A823] group-hover:bg-[#D99A16] text-[#3B220B] py-2.5 px-4 rounded-xl font-bold text-xs shadow-xs transition-colors"
            >
              <span>Iniciar na Visão do Padeiro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Dica de Flexibilidade */}
        <div className="bg-[#FAF6EF] rounded-2xl p-3.5 border border-[#EADBCA] flex items-center justify-between text-xs text-[#75604C]">
          <span className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#DE9E1E]" />
            <span>Você poderá alternar entre a visão do Cliente e do Padeiro a qualquer instante durante o tour.</span>
          </span>
          <button
            onClick={onCancel}
            className="text-xs font-bold text-[#9B6F26] hover:text-[#3E2512] underline"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
};
