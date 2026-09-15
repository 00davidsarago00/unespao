import React from 'react';
import { 
  UtensilsCrossed, 
  Store, 
  Layers, 
  BookOpen, 
  FileCode2, 
  ShoppingBag,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'totem' | 'admin' | 'arquitetura' | 'docs' | 'arquivos';
  setActiveTab: (tab: 'totem' | 'admin' | 'arquitetura' | 'docs' | 'arquivos') => void;
  cartCount: number;
  onOpenCart: () => void;
  clienteNome: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  clienteNome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Project info */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('totem')}>
            <img 
              src="/unespao_logo.svg" 
              alt="UNESPÃO" 
              className="h-8 sm:h-9 w-auto object-contain brightness-110" 
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  ES-II 2026
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                Plataforma de Lanches Personalizados • Subway/Spoleto Style
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              id="nav-tab-totem"
              onClick={() => setActiveTab('totem')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'totem'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Totem & Pedido</span>
            </button>

            <button
              id="nav-tab-admin"
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Atendente & Estoque</span>
            </button>

            <button
              id="nav-tab-arquitetura"
              onClick={() => setActiveTab('arquitetura')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'arquitetura'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>C4 & Arquitetura</span>
            </button>

            <button
              id="nav-tab-docs"
              onClick={() => setActiveTab('docs')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'docs'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Docs (7 Capítulos)</span>
            </button>

            <button
              id="nav-tab-arquivos"
              onClick={() => setActiveTab('arquivos')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'arquivos'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>LaTeX & SCM</span>
            </button>
          </nav>

          {/* Right actions: Cart & User Status */}
          <div className="flex items-center space-x-3">
            {activeTab === 'totem' && (
              <button
                id="btn-open-cart"
                onClick={onOpenCart}
                className="relative px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center space-x-2 shadow-md transition-transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Carrinho</span>
                {cartCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-stone-950 text-amber-400 font-extrabold text-[11px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-stone-800/80 border border-stone-700 text-xs text-stone-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate max-w-[130px] font-medium">{clienteNome}</span>
            </div>
          </div>

        </div>

        {/* Mobile secondary navigation */}
        <div className="flex md:hidden overflow-x-auto py-2 space-x-2 border-t border-stone-800 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('totem')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'totem' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 bg-stone-800'
            }`}
          >
            Totem & Pedido
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'admin' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 bg-stone-800'
            }`}
          >
            Atendente & Estoque
          </button>
          <button
            onClick={() => setActiveTab('arquitetura')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'arquitetura' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 bg-stone-800'
            }`}
          >
            C4 & Arquitetura
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'docs' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 bg-stone-800'
            }`}
          >
            Docs (7 Capítulos)
          </button>
          <button
            onClick={() => setActiveTab('arquivos')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'arquivos' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 bg-stone-800'
            }`}
          >
            LaTeX & SCM
          </button>
        </div>

      </div>
    </header>
  );
};
