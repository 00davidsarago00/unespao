import React, { useState } from 'react';
import { rawTexTemplate, rawBibFile, rawClaudeGuide } from '../data/docsContent';
import { 
  FileCode2, 
  Copy, 
  Check, 
  FileText, 
  Terminal, 
  Download,
  ExternalLink,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const ProjectFilesViewer: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'tex' | 'bib' | 'claude' | 'pdfs'>('tex');
  const [copied, setCopied] = useState(false);

  const getActiveContent = () => {
    switch (activeFile) {
      case 'tex': return rawTexTemplate;
      case 'bib': return rawBibFile;
      case 'claude': return rawClaudeGuide;
      default: return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-5 border border-stone-800 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <FileCode2 className="w-4 h-4" />
              <span>Artefatos de Engenharia & Orquestração</span>
            </div>
            <h2 className="text-xl font-black mt-1 text-white">
              Template LaTeX Oficial, Bibliografia BibTeX & Protocolo CLAUDE.md
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-3xl leading-relaxed">
              O pipeline do projeto estabelece a regra de ouro: <em>"Markdown primeiro, sempre"</em>. O arquivo <code>.tex</code> é o modelo para compilação final em PDF quando solicitado.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {activeFile !== 'pdfs' && (
              <>
                <button
                  id="btn-copy-file-content"
                  onClick={handleCopy}
                  className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center space-x-1.5 transition-colors border border-stone-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar Arquivo'}</span>
                </button>

                <button
                  id="btn-download-file"
                  onClick={() => {
                    const name = activeFile === 'tex' ? 'template-modelo-projeto-final-2026.tex' : activeFile === 'bib' ? 'refs.bib' : 'CLAUDE.md';
                    handleDownload(name, getActiveContent());
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center space-x-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* File Selector Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-200 pb-2">
        <button
          id="tab-file-tex"
          onClick={() => setActiveFile('tex')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            activeFile === 'tex'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
          <span>template-modelo-projeto-final-2026.tex</span>
        </button>

        <button
          id="tab-file-bib"
          onClick={() => setActiveFile('bib')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            activeFile === 'bib'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-blue-400" />
          <span>refs.bib</span>
        </button>

        <button
          id="tab-file-claude"
          onClick={() => setActiveFile('claude')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            activeFile === 'claude'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>CLAUDE.md (Regras do Orquestrador)</span>
        </button>

        <button
          id="tab-file-pdfs"
          onClick={() => setActiveFile('pdfs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
            activeFile === 'pdfs'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
          <span>PDFs da Disciplina (Enunciados)</span>
        </button>
      </div>

      {/* Viewer Canvas */}
      {activeFile === 'pdfs' ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">
              PDF
            </div>
            <h4 className="font-bold text-stone-900 text-sm">
              Sistema-Unespao-ESII.pdf
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Enunciado descritivo do trabalho final da disciplina de Engenharia de Software II da UNESP (2026).
            </p>
            <a
              href="/Sistema-Unespao-ESII.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 hover:text-amber-700 pt-2"
            >
              <span>Abrir arquivo PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">
              PDF
            </div>
            <h4 className="font-bold text-stone-900 text-sm">
              Exercicio-ESII-padrao-decorador.docx.pdf
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Exercício modelo de padrões de projeto (Decorator) da disciplina.
            </p>
            <a
              href="/Exercicio-ESII-padrao-decorador.docx.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 hover:text-amber-700 pt-2"
            >
              <span>Abrir arquivo PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">
              PDF
            </div>
            <h4 className="font-bold text-stone-900 text-sm">
              Exercicio-teste-unidade-Java.docx.pdf
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Exercício de testes de unidade e referência para o capítulo de testes.
            </p>
            <a
              href="/Exercicio-teste-unidade-Java.docx.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 hover:text-amber-700 pt-2"
            >
              <span>Abrir arquivo PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-stone-950 rounded-2xl border border-stone-800 p-4 shadow-inner overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-xs font-mono text-stone-400">
            <span>Visualizador de Código Fonte</span>
            <span>UTF-8 • Linhas: {getActiveContent().split('\n').length}</span>
          </div>

          <pre className="text-xs font-mono text-stone-200 overflow-x-auto max-h-[600px] leading-relaxed p-2 select-all">
            {getActiveContent()}
          </pre>
        </div>
      )}
    </div>
  );
};
