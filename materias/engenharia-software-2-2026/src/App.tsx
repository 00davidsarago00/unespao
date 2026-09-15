import React, { useState } from 'react';
import {
  ProdutoBase,
  Ingrediente,
  Pedido,
  ItemPersonalizado,
  ReviewOnline
} from './types';
import {
  INITIAL_BASES,
  INITIAL_INGREDIENTS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS
} from './data/initialData';
import { CleanNavbar } from './components/CleanNavbar';
import { HomeSelectionView } from './components/HomeSelectionView';
import { ClientView } from './components/ClientView';
import { AdminStockPanel } from './components/AdminStockPanel';
import { CartModal } from './components/CartModal';
import { TechnicalDocsModal } from './components/TechnicalDocsModal';
import { GuidedPresentationTour } from './components/GuidedPresentationTour';

export const App: React.FC = () => {
  // Navegação principal: 'home' | 'cliente' | 'atendente' | 'guiado'
  const [currentView, setCurrentView] = useState<'home' | 'cliente' | 'atendente' | 'guiado'>('home');

  // Dados do Sistema
  const [bases, setBases] = useState<ProdutoBase[]>(INITIAL_BASES);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>(INITIAL_INGREDIENTS);
  const [reviews, setReviews] = useState<ReviewOnline[]>(INITIAL_REVIEWS);
  const [pedidos, setPedidos] = useState<Pedido[]>(INITIAL_ORDERS);
  const [cartItems, setCartItems] = useState<ItemPersonalizado[]>([]);

  // Modais
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

  // Ações da Sacola
  const handleAddToCart = (item: ItemPersonalizado) => {
    setCartItems(prev => [...prev, item]);
    setIsCartModalOpen(true);
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  // Confirmar Pedido (EstoqueService: baixa de insumos / PedidoService: registro do pedido)
  const handleConfirmOrder = (novoPedido: Pedido) => {
    // 1. Redução de estoque das bases (Princípio SRP / EstoqueService)
    setBases(prevBases =>
      prevBases.map(base => {
        const countUsed = novoPedido.itens.filter(it => it.produtoBase.id === base.id).length;
        if (countUsed > 0) {
          return { ...base, estoque: Math.max(0, base.estoque - countUsed) };
        }
        return base;
      })
    );

    // 2. Redução de estoque dos adicionais
    setIngredientes(prevIngs =>
      prevIngs.map(ing => {
        let countUsed = 0;
        novoPedido.itens.forEach(it => {
          if (it.ingredientes.some(i => i.id === ing.id)) {
            countUsed += 1;
          }
        });
        if (countUsed > 0) {
          return { ...ing, estoque: Math.max(0, ing.estoque - countUsed) };
        }
        return ing;
      })
    );

    // 3. Registrar o pedido confirmado
    setPedidos(prev => [novoPedido, ...prev]);

    // 4. Limpar itens da sacola
    setCartItems([]);
  };

  // Adicionar Nova Avaliação
  const handleAddReview = (novoReview: ReviewOnline) => {
    setReviews(prev => [novoReview, ...prev]);
  };

  // Ações do Atendente/Administrador — Estoque
  const handleUpdateBaseStock = (id: string, newStock: number) => {
    setBases(prev => prev.map(b => b.id === id ? { ...b, estoque: newStock } : b));
  };

  const handleUpdateIngredientStock = (id: string, newStock: number) => {
    setIngredientes(prev => prev.map(i => i.id === id ? { ...i, estoque: newStock } : i));
  };

  // Ações do Atendente/Administrador — Catálogo (CRUD)
  const handleAddNewIngredient = (ing: Partial<Ingrediente>) => {
    setIngredientes(prev => [...prev, ing as Ingrediente]);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredientes(prev => prev.filter(i => i.id !== id));
  };

  const handleAddNewBase = (base: Partial<ProdutoBase>) => {
    setBases(prev => [...prev, base as ProdutoBase]);
  };

  const handleRemoveBase = (id: string) => {
    setBases(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#3E2512] flex flex-col antialiased selection:bg-[#DE9E1E]/30 selection:text-[#3E2512]">

      {/* Top Navbar Clean */}
      <CleanNavbar
        currentView={currentView}
        onNavigate={setCurrentView}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartModalOpen(true)}
        onOpenDocs={() => setIsDocsModalOpen(true)}
      />

      {/* Conteúdo Principal com Renderização Baseada na Visão */}
      <main className={`flex-1 w-full py-4 sm:py-6 transition-all duration-300 ${
        currentView === 'guiado'
          ? 'max-w-[1700px] px-2 sm:px-4 lg:pl-6 lg:pr-4'
          : 'max-w-6xl mx-auto px-3 sm:px-6'
      }`}>

        {/* VISÃO 1: TELA INICIAL COM SELEÇÃO DO MODO NA MESMA PÁGINA */}
        {currentView === 'home' && (
          <HomeSelectionView
            onSelectRole={role => setCurrentView(role)}
            onStartGuidedTour={() => setCurrentView('guiado')}
            onOpenDocs={() => setIsDocsModalOpen(true)}
          />
        )}

        {/* VISÃO GUIADA: APRESENTAÇÃO INTERATIVA COM FOCO NO SOFTWARE E SPOTLIGHT */}
        {currentView === 'guiado' && (
          <GuidedPresentationTour
            onExit={() => setCurrentView('home')}
            bases={bases}
            ingredientes={ingredientes}
            reviews={reviews}
            cartCount={cartItems.length}
            onOpenCart={() => setIsCartModalOpen(true)}
            onAddToCart={handleAddToCart}
            onAddReview={handleAddReview}
            onUpdateBaseStock={handleUpdateBaseStock}
            onUpdateIngredientStock={handleUpdateIngredientStock}
            onAddNewIngredient={handleAddNewIngredient}
            onRemoveIngredient={handleRemoveIngredient}
            onAddNewBase={handleAddNewBase}
            onRemoveBase={handleRemoveBase}
          />
        )}

        {/* VISÃO 2: CLIENTE (CARDÁPIO + PERSONALIZAÇÃO IFOOD + REVIEWS) */}
        {currentView === 'cliente' && (
          <ClientView
            bases={bases}
            ingredientes={ingredientes}
            reviews={reviews}
            cartCount={cartItems.length}
            onOpenCart={() => setIsCartModalOpen(true)}
            onAddToCart={handleAddToCart}
            onAddReview={handleAddReview}
          />
        )}

        {/* VISÃO 3: ATENDENTE/ADMINISTRADOR (CATÁLOGO & ESTOQUE) */}
        {currentView === 'atendente' && (
          <AdminStockPanel
            bases={bases}
            ingredientes={ingredientes}
            onUpdateBaseStock={handleUpdateBaseStock}
            onUpdateIngredientStock={handleUpdateIngredientStock}
            onAddNewIngredient={handleAddNewIngredient}
            onRemoveIngredient={handleRemoveIngredient}
            onAddNewBase={handleAddNewBase}
            onRemoveBase={handleRemoveBase}
          />
        )}

      </main>

      {/* Modal da Sacola de Lanches */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onConfirmOrder={handleConfirmOrder}
        clienteNomePadrao="Thiago Nomura"
      />

      {/* Modal de Documentação & Diagramas C4 da UNESP */}
      <TechnicalDocsModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />

      {/* Rodapé Artesanal Clean */}
      <footer className="bg-[#FAF6EF] border-t border-[#EADBCA] py-6 text-[#75604C] text-xs mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 font-['Space_Grotesk']">
            <span className="font-extrabold text-[#3E2512]">UNESPÃO</span>
            <span>•</span>
            <span>Sistema de Pedidos Personalizados • 2026</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsDocsModalOpen(true)}
              className="text-[#9B6F26] hover:text-[#3E2512] font-semibold underline underline-offset-2 transition-colors"
            >
              Consultar Documentação Técnica & C4
            </button>
            <span className="text-[#DACBB8]">|</span>
            <span>Engenharia de Software II</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
