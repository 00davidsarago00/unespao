import React, { useState } from 'react';
import {
  Star,
  ShoppingBag,
  Sliders
} from 'lucide-react';
import { ProdutoBase, Ingrediente, ItemPersonalizado, ReviewOnline } from '../types';
import { ProductCustomizerModal } from './ProductCustomizerModal';
import { ReviewsSection } from './ReviewsSection';

interface ClientViewProps {
  bases: ProdutoBase[];
  ingredientes: Ingrediente[];
  reviews: ReviewOnline[];
  cartCount: number;
  onOpenCart: () => void;
  onAddToCart: (item: ItemPersonalizado) => void;
  onAddReview: (review: ReviewOnline) => void;
}

export const ClientView: React.FC<ClientViewProps> = ({
  bases,
  ingredientes,
  reviews,
  cartCount,
  onOpenCart,
  onAddToCart,
  onAddReview,
}) => {
  // Aba ativa do catálogo: 'produtos' ou 'avaliacoes'
  const [catalogoTab, setCatalogoTab] = useState<'produtos' | 'avaliacoes'>('produtos');

  // Modal de personalização
  const [customizingProduct, setCustomizingProduct] = useState<ProdutoBase | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto py-2 sm:py-6 px-2 sm:px-4 space-y-6">

      {/* Header do Catálogo da Padaria Unespão */}
      <div id="tour-client-catalog-header" className="bg-[#FAF6EF] rounded-3xl p-6 sm:p-8 border border-[#EADBCA] transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DE9E1E]"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#9B6F26] font-['Space_Grotesk']">
                PADARIA UNESPÃO
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3E2512] font-['Space_Grotesk']">
              Monte seu Lanche Personalizado
            </h1>
            <p className="text-xs sm:text-sm text-[#75604C] mt-1">
              Escolha um produto base e personalize com os ingredientes disponíveis no catálogo.
            </p>
          </div>

          {/* Botão de Sacola — sempre visível, mesmo vazia */}
          <button
            id="tour-client-cart-button"
            onClick={onOpenCart}
            className="flex items-center gap-2.5 bg-[#E5A823] text-[#3B220B] px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs self-start sm:self-auto hover:bg-[#D99A16] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{cartCount > 0 ? `Ver Sacola (${cartCount})` : 'Sacola'}</span>
          </button>
        </div>

        {/* Seletor de Abas: Cardápio vs Avaliações */}
        <div id="tour-client-tabs-selector" className="flex items-center gap-2 border-t border-[#EADBCA] mt-5 pt-4 transition-all">
          <button
            onClick={() => setCatalogoTab('produtos')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              catalogoTab === 'produtos'
                ? 'bg-[#4A2F17] text-white shadow-xs'
                : 'bg-white text-[#75604C] hover:bg-[#F2EADB] border border-[#E0D3C1]'
            }`}
          >
            <Sliders className="w-4 h-4 text-[#E5A823]" />
            <span>Produtos & Personalização Estilo iFood ({bases.length})</span>
          </button>

          <button
            onClick={() => setCatalogoTab('avaliacoes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              catalogoTab === 'avaliacoes'
                ? 'bg-[#4A2F17] text-white shadow-xs'
                : 'bg-white text-[#75604C] hover:bg-[#F2EADB] border border-[#E0D3C1]'
            }`}
          >
            <Star className="w-4 h-4 text-[#E5A823]" />
            <span>Avaliações & Reviews Online</span>
          </button>
        </div>
      </div>

      {/* CONTEÚDO DA ABA 1: PRODUTOS PERSONALIZÁVEIS */}
      {catalogoTab === 'produtos' && (
        <div id="tour-client-catalog-grid" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#3E2512] font-['Space_Grotesk']">
                Lanches e Pães Disponíveis para Personalização
              </h3>
              <p className="text-xs text-[#75604C]">
                Clique em qualquer item para adicionar recheios, retirar ingredientes padrão e enviar o pedido.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bases.map((produto, prodIdx) => (
              <div
                key={produto.id}
                id={prodIdx === 0 ? 'tour-client-product-first' : `card-produto-${produto.id}`}
                onClick={() => setCustomizingProduct(produto)}
                className="bg-white rounded-2xl p-5 border border-[#EADBCA] hover:border-[#DE9E1E] hover:shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 rounded-xl bg-[#FAF6EF] border border-[#EADBCA] group-hover:scale-105 transition-transform">
                        {produto.icone}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-[#9B6F26] bg-[#F4E9D8] px-2 py-0.5 rounded-md">
                          Personalizável
                        </span>
                        <h4 className="text-base font-bold text-[#3E2512] mt-0.5 font-['Space_Grotesk'] group-hover:text-[#DE9E1E] transition-colors">
                          {produto.nome}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-extrabold text-[#3E2512]">
                        R$ {produto.precoBase.toFixed(2)}
                      </span>
                      <span className="block text-[10px] text-[#75604C]">preço base</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#75604C] mt-2 leading-relaxed">
                    {produto.descricao}
                  </p>

                  {/* Tags dos itens inclusos */}
                  {produto.ingredientesInclusos && produto.ingredientesInclusos.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] text-[#75604C] py-0.5">Vem com:</span>
                      {produto.ingredientesInclusos.map(itemPadrao => (
                        <span
                          key={itemPadrao}
                          className="text-[10px] bg-[#FAF6EF] text-[#7A561D] px-2 py-0.5 rounded-md border border-[#EADBCA]"
                        >
                          {itemPadrao}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#F2EADB] flex items-center justify-between">
                  <span className="text-[11px] text-[#75604C] flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-[#DE9E1E]" />
                    <span>Adicione ou remova ingredientes</span>
                  </span>

                  <button
                    type="button"
                    id={prodIdx === 0 ? 'tour-client-customizer-trigger' : undefined}
                    className="px-3.5 py-1.5 rounded-lg bg-[#E5A823] hover:bg-[#D99A16] text-[#3B220B] text-xs font-bold shadow-2xs transition-colors"
                  >
                    Personalizar Lanche
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA 2: REVIEWS & AVALIAÇÕES */}
      {catalogoTab === 'avaliacoes' && (
        <ReviewsSection
          reviews={reviews}
          onAddReview={onAddReview}
        />
      )}

      {/* Identificador de Rodapé Institucional para o Tópico de Controle de Versões */}
      <div id="tour-client-footer-meta" className="pt-2 text-center text-xs text-[#9B6F26] font-medium border-t border-[#EADBCA]/60">
        Unespão • Padaria com Pedidos Personalizados sob Demanda
      </div>

      {/* Modal de Personalização Estilo iFood */}
      <ProductCustomizerModal
        isOpen={!!customizingProduct}
        onClose={() => setCustomizingProduct(null)}
        produto={customizingProduct}
        ingredientesDisponiveis={ingredientes}
        onAddToCart={onAddToCart}
      />

    </div>
  );
};
