import React from 'react';
import { ARCHITECTURE_DIAGRAMS } from '../../data/initialData';

interface DiagramPanelProps {
  diagramaId: string;
  regiao?: { x: number; y: number; w: number; h: number };
}

// Painel de diagrama embutido no slide de teoria: mostra o diagrama real já
// existente em public/images/ com uma caixa de destaque estática (sem
// animação piscante) sobre a região relevante para o tópico.
export const DiagramPanel: React.FC<DiagramPanelProps> = ({ diagramaId, regiao }) => {
  const diagrama = ARCHITECTURE_DIAGRAMS.find(d => d.id === diagramaId);

  if (!diagrama) {
    return (
      <div className="w-full h-full flex items-center justify-center text-[#9B6F26] text-sm">
        Diagrama "{diagramaId}" não encontrado.
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center p-3">
      <div className="relative w-full">
        <img src={diagrama.arquivo} alt={diagrama.titulo} className="w-full h-auto rounded-xl border border-[#EADBCA] bg-white" />
        {regiao && (
          <div
            className="absolute border-[3px] border-[#DE9E1E] rounded-lg pointer-events-none"
            style={{
              left: `${regiao.x}%`,
              top: `${regiao.y}%`,
              width: `${regiao.w}%`,
              height: `${regiao.h}%`,
              boxShadow: '0 0 0 9999px rgba(250, 246, 239, 0.55)',
            }}
          />
        )}
      </div>
    </div>
  );
};
