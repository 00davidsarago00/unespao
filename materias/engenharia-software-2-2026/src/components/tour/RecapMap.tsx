import React from 'react';
import { BookOpen, Layers, Blocks, Smartphone, FlaskConical, GitBranch } from 'lucide-react';

interface Capitulo {
  numero: number;
  nome: string;
  descricao: string;
  icone: React.ReactNode;
}

const CAPITULOS: Capitulo[] = [
  { numero: 1, nome: 'Introdução', descricao: 'Minimundo, atores e objetivos de qualidade do Sistema Unespão.', icone: <BookOpen className="w-4 h-4" /> },
  { numero: 2, nome: 'Arquitetura', descricao: 'Clean Architecture em camadas e C4 (Contexto → Containers).', icone: <Layers className="w-4 h-4" /> },
  { numero: 3, nome: 'Componentes', descricao: 'C4 Nível 3, SOLID e os padrões Adapter e Decorator aplicados a pagamento e personalização.', icone: <Blocks className="w-4 h-4" /> },
  { numero: 4, nome: 'Interface', descricao: 'Fluxo de 8 etapas do Cliente e a decisão de autenticação no totem (QR code / pedido anônimo).', icone: <Smartphone className="w-4 h-4" /> },
  { numero: 5, nome: 'Testes', descricao: 'Pirâmide de testes: unidade (xUnit/Moq), integração e cenários de sistema.', icone: <FlaskConical className="w-4 h-4" /> },
  { numero: 6, nome: 'Configuração', descricao: 'Rastreabilidade real: Issues, Pull Requests e CI/CD no GitHub Actions.', icone: <GitBranch className="w-4 h-4" /> },
];

const STATS = [
  { valor: '47 / 14 / 6', rotulo: 'Testes: unidade / integração / sistema' },
  { valor: '~85%', rotulo: 'Cobertura nos Services de prioridade Alta' },
  { valor: '2', rotulo: 'Pull Requests mesclados na main' },
];

export const RecapMap: React.FC = () => (
  <div className="w-full h-full overflow-y-auto p-4 sm:p-5 bg-[#FAF6EF]">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {CAPITULOS.map((cap) => (
        <div key={cap.numero} className="flex items-start gap-2.5 bg-white border border-[#EADBCA] rounded-xl p-3">
          <div className="w-7 h-7 rounded-lg bg-[#DE9E1E]/15 text-[#9B6F26] flex items-center justify-center shrink-0">
            {cap.icone}
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-extrabold text-[#3E2512] uppercase tracking-wide">
              Cap. {cap.numero} · {cap.nome}
            </div>
            <p className="text-[11px] text-[#75604C] leading-snug mt-0.5">{cap.descricao}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-3 gap-2.5 mt-3">
      {STATS.map((stat) => (
        <div key={stat.rotulo} className="bg-[#2A180B] rounded-xl p-3 text-center">
          <div className="text-lg font-black text-[#E5A823] font-['Space_Grotesk']">{stat.valor}</div>
          <div className="text-[9.5px] text-stone-300 leading-tight mt-0.5">{stat.rotulo}</div>
        </div>
      ))}
    </div>
  </div>
);
