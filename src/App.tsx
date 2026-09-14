import React, { useState } from 'react';
import { 
  ProdutoBase, 
  Ingrediente, 
  Pedido, 
  ItemPersonalizado, 
  OrderStatus,
  Padaria,
  ReviewOnline
} from './types';
import { 
  INITIAL_BASES, 
  INITIAL_INGREDIENTS, 
  INITIAL_ORDERS,
  INITIAL_BAKERIES,
  INITIAL_REVIEWS
} from './data/initialData';
import { CleanNavbar } from './components/CleanNavbar';
import { HomeSelectionView } from './components/HomeSelectionView';
import { ClientView } from './components/ClientView';
import { BakerView } from './components/BakerView';
import { CartModal } from './components/CartModal';
import { TechnicalDocsModal } from './components/TechnicalDocsModal';
import { GuidedPresentationTour } from './components/GuidedPresentationTour';

export const App: React.FC = () => {
  // Navegação principal: 'home' | 'cliente' | 'padeiro' | 'guiado'
  const [currentView, setCurrentView] = useState<'home' | 'cliente' | 'padeiro' | 'guiado'>('home');

  // Dados do Sistema
  const [padarias, setPadarias] = useState<Padaria[]>(INITIAL_BAKERIES);
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

  // Confirmar Pedido e Despachar para a Cozinha do Padeiro
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

    // 3. Adicionar pedido na lista em tempo real
    setPedidos(prev => [novoPedido, ...prev]);

    // 4. Limpar itens da sacola
    setCartItems([]);
  };

  // Ações de Atualização de Status pelo Padeiro
  const handleUpdateOrderStatus = (pedidoId: string, status: OrderStatus) => {
    setPedidos(prev => prev.map(p => p.id === pedidoId ? { ...p, status } : p));
  };

  // Adicionar Nova Avaliação e Atualizar a Média da Padaria
  const handleAddReview = (novoReview: ReviewOnline) => {
    setReviews(prev => [novoReview, ...prev]);

    // Recalcular nota média da padaria
    setPadarias(prevPadarias =>
      prevPadarias.map(padaria => {
        if (padaria.id === novoReview.padariaId) {
          const reviewsDaPadaria = [...reviews.filter(r => r.padariaId === padaria.id), novoReview];
          const novaSoma = reviewsDaPadaria.reduce((sum, r) => sum + r.nota, 0);
          const novaMedia = parseFloat((novaSoma / reviewsDaPadaria.length).toFixed(1));
          return {
            ...padaria,
            nota: novaMedia,
            avaliacoesQtd: reviewsDaPadaria.length,
          };
        }
        return padaria;
      })
    );
  };

  // Simular Pedido Chegando para Teste no Painel do Padeiro
  const handleSimulateIncomingOrder = () => {
    const randomNum = Math.floor(105 + Math.random() * 890);
    const mockStudentNames = [
      'Lucas Prado (Eng. Civil • UNESP)',
      'Juliana Mendes (Educação Física)',
      'Felipe Rocha (Ciência da Computação)',
      'Larissa Takahashi (Design UNESP)',
      'Matheus Neves (Química)'
    ];
    const chosenName = mockStudentNames[Math.floor(Math.random() * mockStudentNames.length)];

    const simulatedOrder: Pedido = {
      id: `ped-sim-${Date.now()}`,
      codigo: `UNESP-${randomNum}`,
      padariaId: 'padaria-1',
      padariaNome: 'Padaria Central Unesp',
      canal: 'app_mobile',
      clienteNome: chosenName,
      valorTotal: 27.50,
      status: 'aguardando_preparo',
      metodoPagamento: 'pix',
      criadoEm: 'Agora mesmo',
      tempoEstimadoMin: 12,
      itens: [
        {
          id: `item-sim-${Date.now()}`,
          produtoBase: bases[1] || bases[0], // Ciabatta ou Francês
          ingredientes: [
            ingredientes[0], // Frango
            ingredientes[4], // Queijo Canastra
            ingredientes[13], // Maionese temperada
          ],
          ingredientesRemovidos: ['Sal de ervas aromáticas'],
          quantidade: 1,
          precoTotal: 27.50,
          observacoes: 'Caprichar na crosta crocante da ciabatta!'
        }
      ]
    };

    setPedidos(prev => [simulatedOrder, ...prev]);
  };

  // Contagem de pedidos pendentes para notificações
  const pedidosPendentesCount = pedidos.filter(p => p.status === 'aguardando_preparo').length;

  // Estado para armazenar papel inicial do tour se disparado diretamente
  const [tourInitialRole, setTourInitialRole] = useState<'cliente' | 'padeiro' | undefined>(undefined);

  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#3E2512] flex flex-col antialiased selection:bg-[#DE9E1E]/30 selection:text-[#3E2512]">
      
      {/* Top Navbar Clean */}
      <CleanNavbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'guiado') {
            setTourInitialRole(undefined);
          }
          setCurrentView(view);
        }}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartModalOpen(true)}
        pedidosPendentesCount={pedidosPendentesCount}
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
            onStartGuidedTour={(role) => {
              setTourInitialRole(role);
              setCurrentView('guiado');
            }}
            onOpenDocs={() => setIsDocsModalOpen(true)}
            pedidosPendentesCount={pedidosPendentesCount}
          />
        )}

        {/* VISÃO GUIADA: APRESENTAÇÃO INTERATIVA COM FOCO NO SOFTWARE E SPOTLIGHT */}
        {currentView === 'guiado' && (
          <GuidedPresentationTour
            onExit={() => setCurrentView('home')}
            onOpenClientView={() => setCurrentView('cliente')}
            onOpenBakerView={() => setCurrentView('padeiro')}
            padarias={padarias}
            bases={bases}
            ingredientes={ingredientes}
            reviews={reviews}
            cartCount={cartItems.length}
            onOpenCart={() => setIsCartModalOpen(true)}
            onAddToCart={handleAddToCart}
            onAddReview={handleAddReview}
            pedidos={pedidos}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSimulateIncomingOrder={handleSimulateIncomingOrder}
            onOpenC4Modal={() => setIsDocsModalOpen(true)}
            initialRole={tourInitialRole}
          />
        )}

        {/* VISÃO 2: CLIENTE (PADARIAS PRÓXIMAS + PERSONALIZAÇÃO IFOOD + REVIEWS) */}
        {currentView === 'cliente' && (
          <ClientView
            padarias={padarias}
            bases={bases}
            ingredientes={ingredientes}
            reviews={reviews}
            cartCount={cartItems.length}
            onOpenCart={() => setIsCartModalOpen(true)}
            onAddToCart={handleAddToCart}
            onAddReview={handleAddReview}
          />
        )}

        {/* VISÃO 3: PADEIRO (APENAS PEDIDOS CHEGANDO EM TEMPO REAL) */}
        {currentView === 'padeiro' && (
          <BakerView
            pedidos={pedidos}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSimulateIncomingOrder={handleSimulateIncomingOrder}
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
        clienteNomePadrao="Thiago (Aluno UNESP)"
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
            <span>Faculdade de Ciências de Bauru • UNESP 2026</span>
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
