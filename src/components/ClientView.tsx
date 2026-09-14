import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Star, 
  Clock, 
  Sliders, 
  ArrowLeft, 
  ChevronRight, 
  ShoppingBag, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';
import { Padaria, ProdutoBase, Ingrediente, ItemPersonalizado, ReviewOnline } from '../types';
import { ProductCustomizerModal } from './ProductCustomizerModal';
import { ReviewsSection } from './ReviewsSection';

interface ClientViewProps {
  padarias: Padaria[];
  bases: ProdutoBase[];
  ingredientes: Ingrediente[];
  reviews: ReviewOnline[];
  cartCount: number;
  onOpenCart: () => void;
  onAddToCart: (item: ItemPersonalizado) => void;
  onAddReview: (review: ReviewOnline) => void;
  activeTourStep?: number;
}

export const ClientView: React.FC<ClientViewProps> = ({
  padarias,
  bases,
  ingredientes,
  reviews,
  cartCount,
  onOpenCart,
  onAddToCart,
  onAddReview,
  activeTourStep,
}) => {
  // Padaria selecionada
  const [selectedPadaria, setSelectedPadaria] = useState<Padaria | null>(null);
  
  // Aba ativa dentro da padaria selecionada ('produtos' ou 'avaliacoes')
  const [padariaTab, setPadariaTab] = useState<'produtos' | 'avaliacoes'>('produtos');
  
  // Sincroniza padaria e abas com base no passo da apresentação guiada (se ativo)
  React.useEffect(() => {
    if (activeTourStep === 3 || activeTourStep === 4) {
      if (!selectedPadaria && padarias.length > 0) {
        setSelectedPadaria(padarias[0]);
      }
      setPadariaTab('produtos');
    } else if (activeTourStep === 7) {
      if (!selectedPadaria && padarias.length > 0) {
        setSelectedPadaria(padarias[0]);
      }
      setPadariaTab('avaliacoes');
    } else if (activeTourStep === 1 || activeTourStep === 2 || activeTourStep === 6 || activeTourStep === 8) {
      if (selectedPadaria) {
        setSelectedPadaria(null);
      }
    }
  }, [activeTourStep, padarias]);
  
  // Busca e filtros de padaria
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRadius, setFilterRadius] = useState<'todos' | 'proximas' | 'avaliadas'>('todos');

  // Modal de personalização
  const [customizingProduct, setCustomizingProduct] = useState<ProdutoBase | null>(null);

  // Filtragem de padarias
  const filteredPadarias = padarias.filter(padaria => {
    const matchesSearch = padaria.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          padaria.endereco.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          padaria.destaque.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterRadius === 'proximas') return padaria.distanciaKm <= 0.8;
    if (filterRadius === 'avaliadas') return padaria.nota >= 4.85;
    return true;
  });

  // Produtos da padaria selecionada
  const produtosDaPadaria = selectedPadaria 
    ? bases.filter(base => selectedPadaria.produtosDisponiveisIds.includes(base.id))
    : [];

  return (
    <div className="w-full max-w-5xl mx-auto py-2 sm:py-6 px-2 sm:px-4 space-y-6">

      {/* CASO 1: SE NENHUMA PADARIA ESTIVER SELECIONADA -> LISTA DE PADARIAS PRÓXIMAS */}
      {!selectedPadaria ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header da Seção de Padarias Próximas */}
          <div id="tour-client-padarias-header" className="bg-[#FAF6EF] rounded-3xl p-6 sm:p-8 border border-[#EADBCA] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DE9E1E]"></span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#9B6F26] font-['Space_Grotesk']">
                    LOCALIZAÇÃO: CAMPUS UNESP BAURU & REGIÃO
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3E2512] font-['Space_Grotesk']">
                  Padarias Próximas com Sistema Unespão
                </h1>
                <p className="text-xs sm:text-sm text-[#75604C] mt-1">
                  Selecione uma padaria para personalizar seus lanches artesanais, acompanhar a fila e conferir avaliações.
                </p>
              </div>

              {/* Botão de Sacola se tiver itens */}
              {cartCount > 0 && (
                <button
                  id="tour-client-cart-button"
                  onClick={onOpenCart}
                  className="flex items-center gap-2.5 bg-[#E5A823] text-[#3B220B] px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs self-start sm:self-auto hover:bg-[#D99A16] transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ver Sacola ({cartCount})</span>
                </button>
              )}
            </div>

            {/* Barra de Busca e Filtros Rápidos */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div id="tour-client-search-input" className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89684]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar padaria por nome, rua ou especialidade..."
                  className="w-full bg-white border border-[#E0D3C1] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#3E2512] placeholder-[#A89684] focus:outline-hidden focus:ring-2 focus:ring-[#DE9E1E]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setFilterRadius('todos')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                    filterRadius === 'todos' 
                      ? 'bg-[#4A2F17] text-white' 
                      : 'bg-white border border-[#E0D3C1] text-[#75604C] hover:bg-[#FAF6EF]'
                  }`}
                >
                  Todas ({padarias.length})
                </button>
                <button
                  onClick={() => setFilterRadius('proximas')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    filterRadius === 'proximas' 
                      ? 'bg-[#4A2F17] text-white' 
                      : 'bg-white border border-[#E0D3C1] text-[#75604C] hover:bg-[#FAF6EF]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#DE9E1E]" />
                  <span>No Campus (&lt; 0.8 km)</span>
                </button>
                <button
                  onClick={() => setFilterRadius('avaliadas')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    filterRadius === 'avaliadas' 
                      ? 'bg-[#4A2F17] text-white' 
                      : 'bg-white border border-[#E0D3C1] text-[#75604C] hover:bg-[#FAF6EF]'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 text-[#DE9E1E]" />
                  <span>Mais Bem Avaliadas (4.85★+)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grid de Padarias com Estética Clean do Anexo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredPadarias.map((padaria, pIdx) => (
              <div
                key={padaria.id}
                id={pIdx === 0 ? 'tour-client-padaria-card-first' : `card-padaria-${padaria.id}`}
                onClick={() => {
                  setSelectedPadaria(padaria);
                  setPadariaTab('produtos');
                }}
                className="group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#EADBCA] hover:border-[#DE9E1E] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#4A2F17] text-white flex items-center justify-center text-2xl shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                        {padaria.icone}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#3E2512] group-hover:text-[#DE9E1E] transition-colors font-['Space_Grotesk'] leading-tight">
                          {padaria.nome}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-xs text-[#75604C]">
                          <span className="flex items-center text-[#E5A823] font-bold">
                            ★ {padaria.nota.toFixed(1)}
                          </span>
                          <span>•</span>
                          <span>{padaria.avaliacoesQtd} avaliações</span>
                          <span>•</span>
                          <span className="font-semibold text-[#3E2512]">{padaria.distanciaKm} km</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#EBF5EA] text-[#2D6A28] whitespace-nowrap">
                      {padaria.tempoMin}
                    </span>
                  </div>

                  <p className="text-xs text-[#75604C] mt-2 line-clamp-2 leading-relaxed">
                    {padaria.destaque}
                  </p>

                  <div className="mt-3.5 flex items-center gap-2 text-[11px] text-[#75604C] bg-[#FAF6EF] px-3 py-2 rounded-xl border border-[#EADBCA]">
                    <MapPin className="w-3.5 h-3.5 text-[#DE9E1E] flex-shrink-0" />
                    <span className="truncate">{padaria.endereco}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-[#F2EADB] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#3E2512] font-semibold">
                    <Sliders className="w-3.5 h-3.5 text-[#DE9E1E]" />
                    <span>{padaria.produtosDisponiveisIds.length} produtos personalizáveis</span>
                  </div>

                  <span className="text-[#DE9E1E] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Acessar Cardápio</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* CASO 2: PADARIA SELECIONADA -> VISÃO DO CARDÁPIO PERSONALIZÁVEL & AVALIAÇÕES */
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Barra de Voltar & Header da Padaria */}
          <div className="bg-[#FAF6EF] rounded-3xl p-5 sm:p-7 border border-[#EADBCA]">
            <div className="flex items-center justify-between gap-4 mb-4">
              <button
                onClick={() => setSelectedPadaria(null)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4A2F17] hover:text-[#DE9E1E] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar para todas as padarias</span>
              </button>

              {cartCount > 0 && (
                <button
                  onClick={onOpenCart}
                  className="flex items-center gap-2 bg-[#E5A823] hover:bg-[#D99A16] text-[#3B220B] px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Sacola ({cartCount})</span>
                </button>
              )}
            </div>

            {/* Informações da Padaria Ativa */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#EADBCA] pt-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#4A2F17] text-white flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
                  {selectedPadaria.icone}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#3E2512] font-['Space_Grotesk']">
                      {selectedPadaria.nome}
                    </h2>
                    <span className="text-[10px] font-bold bg-[#EBF5EA] text-[#2D6A28] px-2 py-0.5 rounded-full">
                      Aberta
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#75604C] mt-0.5">
                    {selectedPadaria.destaque}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#75604C]">
                    <span className="flex items-center text-[#E5A823] font-bold">
                      ★ {selectedPadaria.nota.toFixed(1)} ({selectedPadaria.avaliacoesQtd} avaliações)
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#DE9E1E]" />
                      {selectedPadaria.tempoMin}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#DE9E1E]" />
                      {selectedPadaria.distanciaKm} km da UNESP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seletor de Abas da Padaria: Cardápio vs Avaliações */}
            <div id="tour-client-tabs-selector" className="flex items-center gap-2 border-t border-[#EADBCA] mt-5 pt-4 transition-all">
              <button
                onClick={() => setPadariaTab('produtos')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  padariaTab === 'produtos'
                    ? 'bg-[#4A2F17] text-white shadow-xs'
                    : 'bg-white text-[#75604C] hover:bg-[#F2EADB] border border-[#E0D3C1]'
                }`}
              >
                <Sliders className="w-4 h-4 text-[#E5A823]" />
                <span>Produtos & Personalização Estilo iFood ({produtosDaPadaria.length})</span>
              </button>

              <button
                onClick={() => setPadariaTab('avaliacoes')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  padariaTab === 'avaliacoes'
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
          {padariaTab === 'produtos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#3E2512] font-['Space_Grotesk']">
                    Lanches e Pães Disponíveis para Personalização
                  </h3>
                  <p className="text-xs text-[#75604C]">
                    Clique em qualquer item para adicionar recheios, retirar ingredientes padrão e enviar para a chapa.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {produtosDaPadaria.map((produto, prodIdx) => (
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
          {padariaTab === 'avaliacoes' && (
            <ReviewsSection
              padaria={selectedPadaria}
              reviews={reviews}
              onAddReview={onAddReview}
            />
          )}

        </div>
      )}

      {/* Identificador de Rodapé Institucional para o Tópico 8 */}
      <div id="tour-client-footer-meta" className="pt-2 text-center text-xs text-[#9B6F26] font-medium border-t border-[#EADBCA]/60">
        Unespão • Plataforma de Delivery de Padaria Universitária • UNESP FC Bauru
      </div>

      {/* Modal de Personalização Estilo iFood */}
      <ProductCustomizerModal
        isOpen={!!customizingProduct}
        onClose={() => setCustomizingProduct(null)}
        produto={customizingProduct}
        padaria={selectedPadaria}
        ingredientesDisponiveis={ingredientes}
        onAddToCart={onAddToCart}
      />

    </div>
  );
};
