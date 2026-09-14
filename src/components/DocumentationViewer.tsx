import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { DOC_CHAPTERS } from '../data/docsContent';
import { DocChapter } from '../types';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  FileText, 
  ChevronRight, 
  Clock, 
  Hash,
  Share2
} from 'lucide-react';

export const DocumentationViewer: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<DocChapter>(DOC_CHAPTERS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Filter chapters based on search query
  const filteredChapters = DOC_CHAPTERS.filter(c => 
    c.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.conteudo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedChapter.conteudo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Approximate reading time
  const wordsCount = selectedChapter.conteudo.split(/\s+/).length;
  const readTimeMin = Math.ceil(wordsCount / 200);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-5 border border-stone-800 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Base de Conhecimento • Engenharia de Software II (UNESP 2026)</span>
            </div>
            <h2 className="text-xl font-black mt-1 text-white">
              Documentação Oficial do Sistema Unespão (7 Capítulos)
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-3xl leading-relaxed">
              Texto integral dos 7 capítulos elaborados pelo grupo acadêmico: Introdução, Arquitetura Clean, Projeto de Componentes SOLID, Interface do Usuário, Estratégia de Testes, Gestão de Configuração e Controle de Versões.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              id="btn-copy-doc-markdown"
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold flex items-center space-x-1.5 transition-colors border border-stone-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado!' : 'Copiar Markdown'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Chapter Navigation List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar termos nos capítulos..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />
          </div>

          {/* Chapters List */}
          <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredChapters.map(chap => {
              const isSelected = selectedChapter.id === chap.id;

              return (
                <button
                  key={chap.id}
                  id={`btn-chapter-${chap.numero}`}
                  onClick={() => setSelectedChapter(chap)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 shadow-sm ring-1 ring-amber-500/30'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {chap.numero}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs text-stone-900 truncate">
                      {chap.titulo}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5 leading-relaxed">
                      {chap.descricao}
                    </p>
                    <span className="text-[10px] text-stone-400 font-mono mt-1 block">
                      {chap.arquivo}
                    </span>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                    isSelected ? 'text-amber-600 translate-x-0.5' : 'text-stone-300'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Markdown Reader (8 cols) */}
        <div className="lg:col-span-8">
          <article className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden p-6 sm:p-8">
            
            {/* Chapter Header meta */}
            <div className="border-b border-stone-100 pb-5 mb-6">
              <div className="flex items-center space-x-2 text-xs font-semibold text-amber-700">
                <span className="px-2 py-0.5 rounded bg-amber-100 font-bold">
                  Capítulo {selectedChapter.numero}
                </span>
                <span>•</span>
                <span className="font-mono text-stone-400">{selectedChapter.arquivo}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2 tracking-tight">
                {selectedChapter.titulo}
              </h1>

              <div className="flex items-center space-x-4 text-xs text-stone-400 mt-3 pt-3 border-t border-stone-100">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Leitura estimada: {readTimeMin} min
                </span>
                <span className="flex items-center gap-1">
                  <Hash className="w-3.5 h-3.5" /> {wordsCount} palavras
                </span>
              </div>
            </div>

            {/* Markdown Body */}
            <div className="markdown-body prose prose-stone max-w-none text-stone-800 leading-relaxed text-sm">
              <Markdown>{selectedChapter.conteudo}</Markdown>
            </div>

          </article>
        </div>

      </div>
    </div>
  );
};
