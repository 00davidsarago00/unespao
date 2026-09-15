import React, { useState } from 'react';
import { 
  ProdutoBase, 
  Ingrediente, 
  ItemPersonalizado, 
  ClientChannel, 
  IngredientCategory,
  SugestaoPersonalizada
} from '../types';
import { 
  QrCode, 
  UserCheck, 
  Smartphone, 
  Check, 
  Plus, 
  Minus, 
  Sparkles, 
  Flame, 
  AlertTriangle,
  ArrowRight,
  Info,
  RefreshCw
} from 'lucide-react';

interface TotemOrderingProps {
  bases: ProdutoBase[];
  ingredientes: Ingrediente[];
  sugestoes: SugestaoPersonalizada[];
  channel: ClientChannel;
  setChannel: (channel: ClientChannel) => void;
  clienteNome: string;
  setClienteNome: (nome: string) => void;
  onAddToCart: (item: ItemPersonalizado) => void;
  onOpenCart: () => void;
}

const CATEGORIAS_INGREDIENTES: IngredientCategory[] = [
  'Recheio / Proteína',
  'Queijo',
  'Salada / Vegetal',
  'Molho Artesanal',
  'Crocante & Toque Final'
];

export const TotemOrdering: React.FC<TotemOrderingProps> = ({
  bases,
  ingredientes,
  sugestoes,
  channel,
  setChannel,
  clienteNome,
  setClienteNome,
  onAddToCart,
  onOpenCart,
}) => {
  // Step 1: Base selection
  const [selectedBase, setSelectedBase] = useState<ProdutoBase>(bases[0] || null);

  // Step 2: Selected ingredients
  const [selectedIngredients, setSelectedIngredients] = useState<Ingrediente[]>([]);
  const [activeCategory, setActiveCategory] = useState<IngredientCategory>('Recheio / Proteína');
  const [observacoes, setObservacoes] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);

  // Incremental Price Calculation (Chapter 4 requirement)
  const basePrice = selectedBase ? selectedBase.precoBase : 0;
  const ingredientsPrice = selectedIngredients.reduce((acc, curr) => acc + curr.precoUnitario, 0);
  const currentItemTotalPrice = basePrice + ingredientsPrice;

  // Toggle ingredient selection
  const handleToggleIngredient = (ing: Ingrediente) => {
    if (ing.estoque <= 0) return; // Out of stock check

    const exists = selectedIngredients.some(item => item.id === ing.id);
    if (exists) {
      setSelectedIngredients(selectedIngredients.filter(item => item.id !== ing.id));
    } else {
      setSelectedIngredients([...selectedIngredients, ing]);
    }
  };

  // Apply a smart recommendation (Sugestão Personalizada)
  const handleApplySuggestion = (sug: SugestaoPersonalizada) => {
    const base = bases.find(b => b.id === sug.produtoBaseId);
    if (base) {
      setSelectedBase(base);
    }
    const matchedIngs = ingredientes.filter(ing => sug.ingredientesIds.includes(ing.id) && ing.estoque > 0);
    setSelectedIngredients(matchedIngs);
  };

  const handleResetItem = () => {
    setSelectedIngredients([]);
    setObservacoes('');
  };

  const handleAddCurrentItem = () => {
    if (!selectedBase) return;

    const newItem: ItemPersonalizado = {
      id: `item-${Date.now()}`,
      produtoBase: selectedBase,
      ingredientes: [...selectedIngredients],
      observacoes: observacoes.trim() || undefined,
      quantidade: 1,
      precoTotal: currentItemTotalPrice,
    };

    onAddToCart(newItem);
    handleResetItem();
  };

  return (
    <div className="space-y-6">
      {/* CHANNEL IDENTIFICATION BANNER (C4 & Chapter 4 Specification) */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm text-stone-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Ponto de Acesso & Identificação
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-xs text-stone-400">Decisão Arquitetural Cap. 4</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              {channel === 'totem_qrcode' && 'Totem Físico — Vinculado via QR Code do App'}
              {channel === 'totem_anonimo' && 'Totem Físico — Pedido Rápido sem Login (Anônimo)'}
              {channel === 'app_mobile' && 'Aplicativo Móvel — Conta Google Conectada'}
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl">
              Conforme definido no projeto, o totem público evita digitação de senhas em teclados compartilhados.
              O cliente pode escanear o QR code da sessão do celular ou seguir anonimamente com vínculo posterior.
            </p>
          </div>

          {/* Channel selector buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="channel-totem-qr"
              onClick={() => {
                setChannel('totem_qrcode');
                setShowQrModal(true);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors border ${
                channel === 'totem_qrcode'
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow'
                  : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-700'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Totem (QR Code)</span>
            </button>

            <button
              id="channel-totem-anonimo"
              onClick={() => {
                setChannel('totem_anonimo');
                setClienteNome('Cliente Balcão (Anônimo)');
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors border ${
                channel === 'totem_anonimo'
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow'
                  : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-700'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Totem (Anônimo)</span>
            </button>

            <button
              id="channel-app-mobile"
              onClick={() => {
                setChannel('app_mobile');
                setClienteNome('Thiago Nomura (Google OAuth)');
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors border ${
                channel === 'app_mobile'
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow'
                  : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-700'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>App Móvel</span>
            </button>
          </div>
        </div>

        {/* QR Code Demo Modal */}
        {showQrModal && (
          <div className="mt-4 pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center gap-4 bg-stone-950/60 p-4 rounded-xl">
            <div className="p-2 bg-white rounded-lg shadow">
              {/* Fake QR code SVG */}
              <div className="w-20 h-20 bg-stone-900 p-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-5 h-5 bg-white border border-stone-900" />
                  <div className="w-5 h-5 bg-white border border-stone-900" />
                </div>
                <div className="text-[8px] text-center text-amber-400 font-mono">UNESPAO-AUTH</div>
                <div className="flex justify-between">
                  <div className="w-5 h-5 bg-white border border-stone-900" />
                  <div className="w-2 h-2 bg-white" />
                </div>
              </div>
            </div>
            <div className="text-xs space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5" /> Simulação de Pareamento com App do Celular
              </span>
              <p className="text-stone-300">
                O totem leu a sessão criptografada do app móvel. Conta identificada com sucesso:
              </p>
              <div className="font-mono text-amber-300 font-medium">
                Cliente: Thiago Nomura • Histórico Recorrente Ativado
              </div>
            </div>
            <button 
              onClick={() => setShowQrModal(false)}
              className="sm:ml-auto text-xs px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
            >
              Fechar aviso
            </button>
          </div>
        )}
      </div>

      {/* SMART SUGGESTIONS (Capítulo 1 & 4: Sugestões Personalizadas para Clientes Recorrentes) */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
              Sugestões Personalizadas da Padaria Unespão
            </h3>
          </div>
          <span className="text-xs text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full font-medium">
            Baseado no Histórico & Avaliações
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sugestoes.map(sug => (
            <div
              key={sug.id}
              className="bg-white/90 backdrop-blur rounded-xl p-3.5 border border-amber-200 shadow-sm flex flex-col justify-between hover:border-amber-400 transition-all"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-stone-900 text-sm">{sug.titulo}</h4>
                  <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    R$ {sug.precoEstimado.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {sug.motivo}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-2">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span>{sug.popularidade}% de aprovação</span>
                </div>
              </div>

              <button
                id={`btn-apply-sug-${sug.id}`}
                onClick={() => handleApplySuggestion(sug)}
                className="mt-3 w-full py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center space-x-1 transition-colors"
              >
                <span>Montar esta Combinação</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: PRODUTO BASE */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="font-bold text-stone-900 text-base">
              Escolha seu Produto Base (Pão ou Base de Salada)
            </h3>
          </div>
          <span className="text-xs text-stone-500">Obrigatório selecionar 1 item</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {bases.map(base => {
            const isSelected = selectedBase?.id === base.id;
            const isOutOfStock = base.estoque <= 0;

            return (
              <div
                key={base.id}
                id={`card-base-${base.id}`}
                onClick={() => !isOutOfStock && setSelectedBase(base)}
                className={`relative rounded-2xl p-4 border transition-all cursor-pointer ${
                  isOutOfStock 
                    ? 'opacity-50 bg-stone-100 border-stone-200 cursor-not-allowed'
                    : isSelected
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                    : 'bg-white border-stone-200 hover:border-stone-400 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-2xl shadow-inner">
                    {base.icone}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-stone-900">
                      R$ {base.precoBase.toFixed(2)}
                    </span>
                    <div className="text-[11px] text-stone-400">
                      {base.calorias} kcal
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-stone-900 text-sm">{base.nome}</h4>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {base.descricao}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400 font-medium">{base.categoria}</span>
                  {isOutOfStock ? (
                    <span className="text-red-600 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Esgotado
                    </span>
                  ) : (
                    <span className={`font-semibold ${base.estoque <= 5 ? 'text-amber-600' : 'text-emerald-700'}`}>
                      Estoque: {base.estoque} {base.unidade}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STEP 2: INGREDIENTES COM PREÇO INCREMENTAL EM TEMPO REAL */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold text-xs flex items-center justify-center">
              2
            </span>
            <div>
              <h3 className="font-bold text-stone-900 text-base">
                Personalize seus Ingredientes (Atualização Incremental de Preço)
              </h3>
              <p className="text-xs text-stone-500">
                A cada ingrediente adicionado, o preço é recalculado instantaneamente no resumo.
              </p>
            </div>
          </div>

          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-900 self-start sm:self-auto">
            {selectedIngredients.length} ingrediente(s) selecionado(s)
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIAS_INGREDIENTES.map(cat => {
            const countInCat = selectedIngredients.filter(i => i.categoria === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase().replace(/[\s\/&]/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{cat}</span>
                {countInCat > 0 && (
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-black ${
                    isActive ? 'bg-amber-400 text-stone-950' : 'bg-stone-200 text-stone-800'
                  }`}>
                    {countInCat}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Ingredient Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ingredientes
            .filter(ing => ing.categoria === activeCategory)
            .map(ing => {
              const isSelected = selectedIngredients.some(item => item.id === ing.id);
              const isOutOfStock = ing.estoque <= 0;

              return (
                <div
                  key={ing.id}
                  id={`card-ing-${ing.id}`}
                  onClick={() => handleToggleIngredient(ing)}
                  className={`relative rounded-xl p-3.5 border transition-all cursor-pointer flex flex-col justify-between ${
                    isOutOfStock
                      ? 'opacity-40 bg-stone-100 border-stone-200 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-500/10 border-amber-500 shadow-sm ring-1 ring-amber-500/30'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-lg">
                        {ing.icone}
                      </div>
                      <span className="text-xs font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        + R$ {ing.precoUnitario.toFixed(2)}
                      </span>
                    </div>

                    <div className="mt-2.5">
                      <div className="flex items-center space-x-1.5">
                        <h4 className="font-bold text-stone-900 text-xs">{ing.nome}</h4>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                        {ing.descricao}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className={`text-[10px] ${ing.estoque <= 5 ? 'text-amber-600 font-bold' : 'text-stone-400'}`}>
                      {isOutOfStock ? 'Esgotado' : `Estoque: ${ing.estoque} ${ing.unidade}`}
                    </span>

                    <button
                      type="button"
                      disabled={isOutOfStock}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform active:scale-90 ${
                        isOutOfStock
                          ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* LIVE ITEM BUILDER & INCREMENTAL PRICE FOOTER DOCK */}
      <div className="sticky bottom-4 z-30 bg-stone-950 border border-stone-800 text-white rounded-2xl p-4 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Sandwich stack representation */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 text-xs text-amber-400 font-bold uppercase tracking-wider">
              <span>Resumo da Composição em Tempo Real</span>
              <span className="text-stone-600">•</span>
              <span className="text-stone-400 font-normal normal-case">
                {selectedBase?.nome} + {selectedIngredients.length} adicionais
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 mt-2 max-h-16 overflow-y-auto">
              <span className="px-2 py-0.5 rounded-md bg-stone-800 text-amber-300 font-semibold text-xs flex items-center gap-1">
                <span>{selectedBase?.icone}</span>
                <span>{selectedBase?.nome}</span>
                <span className="text-stone-400 text-[10px]">R$ {basePrice.toFixed(2)}</span>
              </span>

              {selectedIngredients.map(ing => (
                <span
                  key={ing.id}
                  className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-200 text-xs flex items-center gap-1 border border-stone-700"
                >
                  <span>{ing.icone}</span>
                  <span className="truncate max-w-[120px]">{ing.nome}</span>
                  <span className="text-amber-400 text-[10px]">+{ing.precoUnitario.toFixed(2)}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleIngredient(ing);
                    }}
                    className="ml-1 text-stone-400 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}

              {selectedIngredients.length === 0 && (
                <span className="text-xs text-stone-500 italic">
                  Adicione ingredientes acima para enriquecer seu lanche.
                </span>
              )}
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-stone-800 pt-3 md:pt-0">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                Preço Incremental
              </div>
              <div className="text-2xl font-black text-amber-400">
                R$ {currentItemTotalPrice.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                id="btn-limpar-composicao"
                onClick={handleResetItem}
                className="px-3 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
                title="Limpar seleção de ingredientes"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                id="btn-adicionar-carrinho"
                onClick={handleAddCurrentItem}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm flex items-center space-x-2 shadow-lg transition-transform active:scale-95"
              >
                <span>Adicionar ao Pedido</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
