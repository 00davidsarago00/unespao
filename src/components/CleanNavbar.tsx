import React from 'react';
import { ChefHat, User, Home, BookOpen, Presentation } from 'lucide-react';

interface CleanNavbarProps {
  currentView: 'home' | 'cliente' | 'padeiro' | 'guiado';
  onNavigate: (view: 'home' | 'cliente' | 'padeiro' | 'guiado') => void;
  cartCount?: number;
  onOpenCart?: () => void;
  pedidosPendentesCount: number;
  onOpenDocs: () => void;
}

export const CleanNavbar: React.FC<CleanNavbarProps> = ({
  currentView,
  onNavigate,
  pedidosPendentesCount,
  onOpenDocs,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EF]/95 backdrop-blur-md border-b border-[#EADBCA]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Logo Unespão */}
        <div 
          id="header-logo-unespao"
          onClick={() => onNavigate('home')}
          className="flex items-center cursor-pointer group flex-shrink-0"
          title="Sistema Unespão - Voltar ao Início"
        >
          <img 
            src="/unespao_logo.svg" 
            alt="Unespão" 
            className="h-8 sm:h-9 w-auto object-contain group-hover:scale-105 transition-transform" 
          />
        </div>

        {/* Seletor Central de Navegação */}
        <nav className="flex items-center gap-1 bg-[#F2EADB] p-1 rounded-xl border border-[#E0D3C1]">
          <button
            id="nav-btn-home"
            onClick={() => onNavigate('home')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentView === 'home'
                ? 'bg-white text-[#3E2512] shadow-2xs'
                : 'text-[#75604C] hover:text-[#3E2512]'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[#DE9E1E]" />
            <span className="hidden sm:inline">Início</span>
          </button>

          <button
            id="nav-btn-cliente"
            onClick={() => onNavigate('cliente')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentView === 'cliente'
                ? 'bg-white text-[#3E2512] shadow-2xs'
                : 'text-[#75604C] hover:text-[#3E2512]'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#DE9E1E]" />
            <span>Cliente</span>
          </button>

          <button
            id="nav-btn-padeiro"
            onClick={() => onNavigate('padeiro')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative ${
              currentView === 'padeiro'
                ? 'bg-[#4A2F17] text-white shadow-2xs'
                : 'text-[#75604C] hover:text-[#3E2512]'
            }`}
          >
            <ChefHat className={`w-3.5 h-3.5 ${currentView === 'padeiro' ? 'text-[#E5A823]' : 'text-[#DE9E1E]'}`} />
            <span>Padeiro</span>
            {pedidosPendentesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            )}
          </button>

          <button
            id="nav-btn-guiado"
            onClick={() => onNavigate('guiado')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              currentView === 'guiado'
                ? 'bg-[#DE9E1E] text-[#3E2512] shadow-2xs ring-1 ring-[#DE9E1E]'
                : 'text-[#75604C] hover:text-[#3E2512]'
            }`}
            title="Apresentação Guiada dos 8 Tópicos de Engenharia de Software II"
          >
            <Presentation className="w-3.5 h-3.5 text-[#9B6F26]" />
            <span className="hidden md:inline">Apresentação Guiada</span>
            <span className="md:hidden">Guiada</span>
          </button>
        </nav>

        {/* Lado Direito: Acesso Rápido a Docs C4 */}
        <div className="flex items-center gap-2">
          <button
            id="nav-btn-docs"
            onClick={onOpenDocs}
            title="Documentação de Engenharia de Software II & Diagramas C4"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E0D3C1] text-[#75604C] hover:text-[#3E2512] hover:border-[#DE9E1E] text-xs font-bold transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#DE9E1E]" />
            <span>Docs C4</span>
          </button>
        </div>
      </div>
    </header>
  );
};
