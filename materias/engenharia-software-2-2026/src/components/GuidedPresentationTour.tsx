import React, { useState } from 'react';
import {
  ProdutoBase,
  Ingrediente,
  ItemPersonalizado,
  ReviewOnline
} from '../types';
import { TOUR_STEPS } from '../data/spotlightTourData';
import { ClientView } from './ClientView';
import { AdminStockPanel } from './AdminStockPanel';
import { SpotlightTourOverlay } from './SpotlightTourOverlay';

interface GuidedPresentationTourProps {
  onExit: () => void;
  bases: ProdutoBase[];
  ingredientes: Ingrediente[];
  reviews: ReviewOnline[];
  cartCount: number;
  onOpenCart: () => void;
  onAddToCart: (item: ItemPersonalizado) => void;
  onAddReview: (review: ReviewOnline) => void;
  onUpdateBaseStock: (id: string, newStock: number) => void;
  onUpdateIngredientStock: (id: string, newStock: number) => void;
  onAddNewIngredient: (ing: Partial<Ingrediente>) => void;
  onRemoveIngredient: (id: string) => void;
  onAddNewBase: (base: Partial<ProdutoBase>) => void;
  onRemoveBase: (id: string) => void;
}

export const GuidedPresentationTour: React.FC<GuidedPresentationTourProps> = ({
  onExit,
  bases,
  ingredientes,
  reviews,
  cartCount,
  onOpenCart,
  onAddToCart,
  onAddReview,
  onUpdateBaseStock,
  onUpdateIngredientStock,
  onAddNewIngredient,
  onRemoveIngredient,
  onAddNewBase,
  onRemoveBase,
}) => {
  // Fluxo linear único de 20 passos — sem seleção prévia de papel.
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Determina qual tela de app fica por baixo: usa a fase do passo atual se
  // for um passo de prática, senão mantém a última fase de prática já vista
  // (os passos de teoria cobrem a tela inteira, então isso só importa para a
  // transição ficar suave ao voltar a um passo de prática).
  const backgroundFase = React.useMemo(() => {
    for (let i = currentStepIndex; i >= 0; i--) {
      const step = TOUR_STEPS[i];
      if (step.fase === 'cliente' || step.fase === 'atendente') return step.fase;
    }
    return 'cliente' as const;
  }, [currentStepIndex]);

  return (
    <div className="relative min-h-screen pb-40 animate-in fade-in duration-200">
      <div className="w-full transition-all duration-300">
        {backgroundFase === 'cliente' ? (
          <ClientView
            bases={bases}
            ingredientes={ingredientes}
            reviews={reviews}
            cartCount={cartCount}
            onOpenCart={onOpenCart}
            onAddToCart={onAddToCart}
            onAddReview={onAddReview}
          />
        ) : (
          <AdminStockPanel
            bases={bases}
            ingredientes={ingredientes}
            onUpdateBaseStock={onUpdateBaseStock}
            onUpdateIngredientStock={onUpdateIngredientStock}
            onAddNewIngredient={onAddNewIngredient}
            onRemoveIngredient={onRemoveIngredient}
            onAddNewBase={onAddNewBase}
            onRemoveBase={onRemoveBase}
          />
        )}
      </div>

      <SpotlightTourOverlay
        steps={TOUR_STEPS}
        currentStepIndex={currentStepIndex}
        onStepChange={setCurrentStepIndex}
        onExitTour={onExit}
      />
    </div>
  );
};
