import React, { useState } from 'react';
import { X, BookOpen, Layers, FileCode, CheckCircle2 } from 'lucide-react';
import { ArchitectureDiagrams } from './ArchitectureDiagrams';
import { DocumentationViewer } from './DocumentationViewer';
import { ProjectFilesViewer } from './ProjectFilesViewer';

interface TechnicalDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalDocsModal: React.FC<TechnicalDocsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'diagramas' | 'documentacao' | 'arquivos'>('diagramas');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        id="modal-docs-tecnicos"
        className="relative bg-white w-full max-w-6xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#EADBCA] overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="bg-[#FAF6EF] px-5 sm:px-8 py-4 border-b border-[#EADBCA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4A2F17] text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#E5A823]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#9B6F26] bg-[#F4E9D8] px-2 py-0.5 rounded-full">
                  Engenharia de Software II • UNESP Bauru
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#3E2512] font-['Space_Grotesk']">
                Documentação Técnica & Modelo C4 do Unespão
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E9DFCE] text-[#75604C] hover:text-[#3E2512] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Abas da Documentação */}
        <div className="bg-[#F8F3E8] px-5 sm:px-8 py-2 border-b border-[#EADBCA] flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('diagramas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'diagramas'
                ? 'bg-[#4A2F17] text-white'
                : 'text-[#75604C] hover:bg-white/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#DE9E1E]" />
            <span>Diagramas C4 & Padrões GoF</span>
          </button>

          <button
            onClick={() => setActiveTab('documentacao')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'documentacao'
                ? 'bg-[#4A2F17] text-white'
                : 'text-[#75604C] hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#DE9E1E]" />
            <span>Base de Conhecimento (7 Capítulos)</span>
          </button>

          <button
            onClick={() => setActiveTab('arquivos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'arquivos'
                ? 'bg-[#4A2F17] text-white'
                : 'text-[#75604C] hover:bg-white/60'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-[#DE9E1E]" />
            <span>Modelo LaTeX & Git SCM</span>
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-stone-50">
          {activeTab === 'diagramas' && <ArchitectureDiagrams />}
          {activeTab === 'documentacao' && <DocumentationViewer />}
          {activeTab === 'arquivos' && <ProjectFilesViewer />}
        </div>
      </div>
    </div>
  );
};
