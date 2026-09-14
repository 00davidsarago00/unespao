import React, { useState } from 'react';
import { ARCHITECTURE_DIAGRAMS } from '../data/initialData';
import { ArchitectureDiagram } from '../types';
import { 
  Layers, 
  ZoomIn, 
  ExternalLink, 
  ShieldCheck, 
  Boxes, 
  FileText,
  X
} from 'lucide-react';

export const ArchitectureDiagrams: React.FC = () => {
  const [selectedDiagram, setSelectedDiagram] = useState<ArchitectureDiagram>(ARCHITECTURE_DIAGRAMS[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-5 border border-stone-800 shadow-md">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Modelo C4 & Engenharia de Software II (UNESP 2026)</span>
        </div>
        <h2 className="text-xl font-black mt-1 text-white">
          Arquitetura Oficial do Sistema Unespão (C4 Níveis 1, 2, 3 e SOLID)
        </h2>
        <p className="text-xs text-stone-400 mt-1 max-w-3xl leading-relaxed">
          Diagramas arquiteturais originais do projeto final. O sistema adota <strong>Clean Architecture</strong> concêntrica com fluxo unidirecional de dependências, isolamento estrito de integrações externas via padrão <strong>GoF Adapter</strong> e inversão de dependência (<strong>DIP</strong>).
        </p>
      </div>

      {/* Main Diagram Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left: Diagram Selection Menu */}
        <div className="lg:col-span-1 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1">
            Galeria de Diagramas
          </span>

          <div className="space-y-1.5">
            {ARCHITECTURE_DIAGRAMS.map(diag => {
              const isSelected = selectedDiagram.id === diag.id;

              return (
                <button
                  key={diag.id}
                  id={`btn-diag-${diag.id}`}
                  onClick={() => setSelectedDiagram(diag)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 shadow-sm ring-1 ring-amber-500/30'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isSelected ? 'text-amber-800' : 'text-stone-400'
                  }`}>
                    {diag.nivel}
                  </span>
                  <span className="font-bold text-xs text-stone-900 mt-0.5">
                    {diag.titulo}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Diagram Display & Deep Dive */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {selectedDiagram.nivel}
                </span>
                <h3 className="text-lg font-black text-stone-900 mt-1.5">
                  {selectedDiagram.titulo}
                </h3>
              </div>

              <button
                id="btn-zoom-diagram"
                onClick={() => setIsZoomed(true)}
                className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center space-x-1.5 self-start sm:self-auto shadow"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Ampliar Diagrama</span>
              </button>
            </div>

            {/* Diagram Canvas Container */}
            <div className="w-full bg-stone-50 rounded-xl p-4 border border-stone-200 flex items-center justify-center min-h-[380px] overflow-hidden">
              <img
                src={selectedDiagram.arquivo}
                alt={selectedDiagram.titulo}
                className="max-h-[440px] w-auto object-contain transition-transform hover:scale-[1.02]"
              />
            </div>

            {/* Description & SOLID tags */}
            <div className="space-y-3 pt-2">
              <p className="text-xs text-stone-600 leading-relaxed">
                {selectedDiagram.descricao}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wide mr-1">
                  Princípios Arquiteturais:
                </span>
                {selectedDiagram.conceitosSolid.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* SOLID Deep-Dive Highlights Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-stone-900 text-white p-4 rounded-xl border border-stone-800">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                SRP • Responsabilidade Única
              </h4>
              <p className="text-[11px] text-stone-300 mt-1 leading-relaxed">
                <code>EstoqueService</code> isola exclusivamente a baixa de insumos. Nenhuma lógica de pagamento ou pedido afeta o estoque por efeito colateral.
              </p>
            </div>

            <div className="bg-stone-900 text-white p-4 rounded-xl border border-stone-800">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                DIP & Adapter • Segurança
              </h4>
              <p className="text-[11px] text-stone-300 mt-1 leading-relaxed">
                <code>IGatewayPagamentoAdapter</code> isola credenciais financeiras e tokens OAuth 2.0 no backend .NET 8, fora do alcance do navegador.
              </p>
            </div>

            <div className="bg-stone-900 text-white p-4 rounded-xl border border-stone-800">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                LSP & Moq • Testabilidade
              </h4>
              <p className="text-[11px] text-stone-300 mt-1 leading-relaxed">
                <code>IPedidoRepository</code> permite substituição por <code>MockPedidoRepository</code> ou mocks dinâmicos em testes xUnit sem alterar código consumidor.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* FULLSCREEN ZOOM MODAL */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-3xl p-6 shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-bold text-amber-600">{selectedDiagram.nivel}</span>
                <h3 className="font-extrabold text-stone-900 text-base">{selectedDiagram.titulo}</h3>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-stone-50 rounded-2xl mt-4">
              <img
                src={selectedDiagram.arquivo}
                alt={selectedDiagram.titulo}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
