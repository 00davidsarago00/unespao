import React, { useState } from 'react';
import { 
  Padaria, 
  ProdutoBase, 
  Ingrediente, 
  ItemPersonalizado, 
  ReviewOnline, 
  Pedido, 
  OrderStatus 
} from '../types';
import { ClientView } from './ClientView';
import { BakerView } from './BakerView';
import { SpotlightTourOverlay } from './SpotlightTourOverlay';
import { SpotlightRoleSelectorModal } from './SpotlightRoleSelectorModal';

interface GuidedPresentationTourProps {
  onExit: () => void;
  onOpenClientView: () => void;
  onOpenBakerView: () => void;
  padarias: Padaria[];
  bases: ProdutoBase[];
  ingredientes: Ingrediente[];
  reviews: ReviewOnline[];
  cartCount: number;
  onOpenCart: () => void;
  onAddToCart: (item: ItemPersonalizado) => void;
  onAddReview: (review: ReviewOnline) => void;
  pedidos: Pedido[];
  onUpdateOrderStatus: (id: string, status: OrderStatus) => void;
  onSimulateIncomingOrder: () => void;
  onOpenC4Modal: () => void;
  initialRole?: 'cliente' | 'padeiro';
}

export const GuidedPresentationTour: React.FC<GuidedPresentationTourProps> = ({
  onExit,
  onOpenClientView,
  onOpenBakerView,
  padarias,
  bases,
  ingredientes,
  reviews,
  cartCount,
  onOpenCart,
  onAddToCart,
  onAddReview,
  pedidos,
  onUpdateOrderStatus,
  onSimulateIncomingOrder,
  onOpenC4Modal,
  initialRole,
}) => {
  // Papel selecionado para o tour ('cliente' ou 'padeiro')
  const [selectedRole, setSelectedRole] = useState<'cliente' | 'padeiro' | null>(initialRole || null);

  // Passo atual do tour (0 a 7, representando os 8 tópicos da documentação)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Se nenhum papel foi escolhido ainda, exibe o modal seletor com as duas opções
  if (!selectedRole) {
    return (
      <div className="relative min-h-[85vh] flex items-center justify-center p-4">
        <SpotlightRoleSelectorModal
          isOpen={true}
          onSelectRole={(role) => setSelectedRole(role)}
          onCancel={onExit}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-40 animate-in fade-in duration-200">
      
      {/* CONTEÚDO DO SOFTWARE NO FUNDO:
          Deslocado para a esquerda nas vistas de tour para abrir amplo espaço
          limpo e desobstruído para o painel anti-sobreposição flutuante à direita */}
      <div className="w-full lg:max-w-[calc(100%-410px)] xl:max-w-[calc(100%-450px)] lg:mr-auto lg:ml-0 transition-all duration-300">
        
        {/* 1. VISÃO DO CLIENTE EM TEMPO REAL NO FUNDO */}
        {selectedRole === 'cliente' && (
          <ClientView
            padarias={padarias}
            bases={bases}
            ingredientes={ingredientes}
            reviews={reviews}
            cartCount={cartCount}
            onOpenCart={onOpenCart}
            onAddToCart={onAddToCart}
            onAddReview={onAddReview}
            activeTourStep={currentStepIndex + 1}
          />
        )}

        {/* 2. VISÃO DO PADEIRO EM TEMPO REAL NO FUNDO */}
        {selectedRole === 'padeiro' && (
          <BakerView
            pedidos={pedidos}
            onUpdateOrderStatus={onUpdateOrderStatus}
            onSimulateIncomingOrder={onSimulateIncomingOrder}
          />
        )}
      </div>

      {/* 3. CAMADA SPOTLIGHT COM TELA ESCURECIDA, DESTAQUE NA FERRAMENTA E EXPLICAÇÃO DE ES2 */}
      <SpotlightTourOverlay
        role={selectedRole}
        onToggleRole={(newRole) => setSelectedRole(newRole)}
        currentStepIndex={currentStepIndex}
        onStepChange={(newStepIndex) => setCurrentStepIndex(newStepIndex)}
        onExitTour={onExit}
        onOpenC4Modal={onOpenC4Modal}
        onSimulateOrder={onSimulateIncomingOrder}
        onOpenCart={onOpenCart}
      />

    </div>
  );
};
