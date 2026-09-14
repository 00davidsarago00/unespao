import React, { useState } from 'react';
import { X, Plus, Minus, Check, AlertCircle, Sparkles } from 'lucide-react';
import { ProdutoBase, Ingrediente, ItemPersonalizado, Padaria } from '../types';

interface ProductCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  produto: ProdutoBase | null;
  padaria: Padaria | null;
  ingredientesDisponiveis: Ingrediente[];
  onAddToCart: (item: ItemPersonalizado) => void;
}

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({
  isOpen,
  onClose,
  produto,
  padaria,
  ingredientesDisponiveis,
  onAddToCart,
}) => {
  if (!isOpen || !produto) return null;

  // Itens padrão inclusos que o cliente pode optar por remover (estilo iFood)
  const [ingredientesRemovidos, setIngredientesRemovidos] = useState<string[]>([]);
  
  // Ingredientes adicionais selecionados
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState<Ingrediente[]>([]);
  
  // Observações
  const [observacoes, setObservacoes] = useState('');
  
  // Quantidade
  const [quantidade, setQuantidade] = useState(1);

  // Toggle remoção de item padrão
  const handleToggleRemovido = (itemNome: string) => {
    setIngredientesRemovidos(prev => 
      prev.includes(itemNome) ? prev.filter(i => i !== itemNome) : [...prev, itemNome]
    );
  };

  // Toggle inclusão de ingrediente adicional
  const handleToggleIngrediente = (ingrediente: Ingrediente) => {
    setIngredientesSelecionados(prev => {
      const existe = prev.some(i => i.id === ingrediente.id);
      if (existe) {
        return prev.filter(i => i.id !== ingrediente.id);
      } else {
        return [...prev, ingrediente];
      }
    });
  };

  // Preço unitário calculado em tempo real
  const precoAdicionais = ingredientesSelecionados.reduce((sum, ing) => sum + ing.precoUnitario, 0);
  const precoUnitarioTotal = produto.precoBase + precoAdicionais;
  const precoFinalCalculado = precoUnitarioTotal * quantidade;

  const handleConfirm = () => {
    const item: ItemPersonalizado = {
      id: `item-${Date.now()}`,
      produtoBase: produto,
      padariaId: padaria?.id,
      padariaNome: padaria?.nome,
      ingredientes: ingredientesSelecionados,
      ingredientesRemovidos: ingredientesRemovidos,
      observacoes: observacoes.trim() || undefined,
      quantidade,
      precoTotal: precoFinalCalculado,
    };
    onAddToCart(item);
    onClose();
    // Reset
    setIngredientesRemovidos([]);
    setIngredientesSelecionados([]);
    setObservacoes('');
    setQuantidade(1);
  };

  // Categorias de ingredientes para organização estilo iFood
  const categorias: Array<Ingrediente['categoria']> = [
    'Recheio / Proteína',
    'Queijo',
    'Salada / Vegetal',
    'Molho Artesanal',
    'Crocante & Toque Final'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        id="modal-customizacao-produto"
        className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#EADBCA] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Top Header */}
        <div className="bg-[#FAF6EF] px-5 sm:px-8 py-5 border-b border-[#EADBCA] flex items-start justify-between relative">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#4A2F17] text-white flex items-center justify-center text-3xl shadow-xs flex-shrink-0">
              {produto.icone}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#9B6F26] bg-[#F4E9D8] px-2.5 py-0.5 rounded-full">
                  Personalização Estilo iFood
                </span>
                {padaria && (
                  <span className="text-xs text-[#75604C] truncate max-w-[200px]">
                    • {padaria.nome}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#3E2512] mt-0.5 font-['Space_Grotesk']">
                {produto.nome}
              </h2>
              <p className="text-xs sm:text-sm text-[#75604C] mt-1 leading-snug">
                {produto.descricao}
              </p>
              <div className="mt-2 text-sm font-bold text-[#3E2512]">
                Preço base: <span className="text-[#DE9E1E]">R$ {produto.precoBase.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#E9DFCE] text-[#75604C] hover:text-[#3E2512] hover:bg-[#F2EADB] flex items-center justify-center transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Customization Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-white">

          {/* Seção 1: Ingredientes Padrão Inclusos (Deseja remover algum?) */}
          {produto.ingredientesInclusos && produto.ingredientesInclusos.length > 0 && (
            <div className="bg-[#FAF6EF] rounded-2xl p-4 sm:p-5 border border-[#EADBCA]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-[#3E2512] flex items-center gap-1.5">
                    <span>Itens Padrão do Pão</span>
                    <span className="text-xs font-normal text-[#75604C]">(Deseja retirar algo?)</span>
                  </h3>
                  <p className="text-xs text-[#75604C]">Selecione caso queira seu lanche sem algum destes itens.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {produto.ingredientesInclusos.map(itemPadrao => {
                  const estaRemovido = ingredientesRemovidos.includes(itemPadrao);
                  return (
                    <button
                      key={itemPadrao}
                      type="button"
                      onClick={() => handleToggleRemovido(itemPadrao)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        estaRemovido 
                          ? 'bg-red-50 border-red-200 text-red-800' 
                          : 'bg-white border-[#E9DFCE] text-[#3E2512] hover:border-[#DE9E1E]'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-medium">
                        {estaRemovido ? `❌ Sem ${itemPadrao}` : `✓ ${itemPadrao}`}
                      </span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        estaRemovido ? 'bg-red-200/80 text-red-900' : 'bg-[#F2EADB] text-[#7A561D]'
                      }`}>
                        {estaRemovido ? 'Removido' : 'Incluso'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Seções de Adicionais Categorizados */}
          {categorias.map(cat => {
            const itensDestaCategoria = ingredientesDisponiveis.filter(i => i.categoria === cat);
            if (itensDestaCategoria.length === 0) return null;

            return (
              <div key={cat} className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#F2EADB] pb-2">
                  <h3 className="text-sm sm:text-base font-bold text-[#3E2512] flex items-center gap-2 font-['Space_Grotesk']">
                    <span>{cat}</span>
                    <span className="text-xs font-normal text-[#75604C]">
                      • Opcional
                    </span>
                  </h3>
                  <span className="text-[11px] text-[#7A561D] bg-[#F5ECDC] px-2 py-0.5 rounded-md font-medium">
                    Escolha à vontade
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {itensDestaCategoria.map(ing => {
                    const isSelected = ingredientesSelecionados.some(i => i.id === ing.id);
                    const semEstoque = ing.estoque <= 0;

                    return (
                      <div
                        key={ing.id}
                        onClick={() => !semEstoque && handleToggleIngrediente(ing)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          semEstoque
                            ? 'opacity-45 bg-gray-50 border-gray-200 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#FAF5EC] border-[#DE9E1E] shadow-xs'
                            : 'bg-white border-[#E9DFCE] hover:border-[#DE9E1E]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{ing.icone}</span>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-[#3E2512] leading-tight">
                              {ing.nome}
                            </div>
                            <div className="text-xs font-semibold text-[#DE9E1E]">
                              + R$ {ing.precoUnitario.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <div className="flex-shrink-0 ml-2">
                          {semEstoque ? (
                            <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-md">
                              Esgotado
                            </span>
                          ) : isSelected ? (
                            <div className="w-6 h-6 rounded-full bg-[#DE9E1E] text-[#3B220B] flex items-center justify-center font-bold">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-[#D6C5AF] flex items-center justify-center text-[#75604C]">
                              <Plus className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Observações para a Cozinha */}
          <div className="bg-[#FAF6EF] p-4 sm:p-5 rounded-2xl border border-[#EADBCA] space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-[#3E2512]">
              Alguma observação para o padeiro?
            </label>
            <textarea
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
              placeholder="Ex.: Pão bem tostadinho e crocante na chapa, caprichar no queijo..."
              maxLength={140}
              rows={2}
              className="w-full bg-white border border-[#E0D3C1] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#3E2512] placeholder-[#A89684] focus:outline-hidden focus:ring-2 focus:ring-[#DE9E1E] resize-none"
            />
            <div className="flex justify-between text-[11px] text-[#75604C]">
              <span>O padeiro verá esse bilhete na comanda da cozinha</span>
              <span>{observacoes.length}/140</span>
            </div>
          </div>

        </div>

        {/* Fixed Bottom Action Bar (estilo iFood) */}
        <div className="bg-[#FAF6EF] border-t border-[#EADBCA] px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Seletor de Quantidade */}
          <div className="flex items-center gap-3 bg-white border border-[#E0D3C1] rounded-xl px-3 py-1.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
              disabled={quantidade <= 1}
              className="w-7 h-7 rounded-lg text-[#3E2512] hover:bg-[#FAF6EF] disabled:opacity-30 flex items-center justify-center font-bold"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm sm:text-base text-[#3E2512] w-6 text-center">
              {quantidade}
            </span>
            <button
              type="button"
              onClick={() => setQuantidade(quantidade + 1)}
              className="w-7 h-7 rounded-lg text-[#3E2512] hover:bg-[#FAF6EF] flex items-center justify-center font-bold"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Botão de Adicionar à Sacola com Preço Calculado */}
          <button
            type="button"
            id="btn-adicionar-sacola-personalizado"
            onClick={handleConfirm}
            className="w-full sm:w-auto flex-1 flex items-center justify-between sm:justify-center gap-4 bg-[#E5A823] hover:bg-[#D99A16] text-[#3B220B] font-bold py-3.5 px-6 rounded-xl shadow-xs transition-colors"
          >
            <span>Adicionar à Sacola</span>
            <span className="bg-[#FAF6EF]/70 text-[#3B220B] px-3 py-1 rounded-lg text-sm sm:text-base font-extrabold">
              R$ {precoFinalCalculado.toFixed(2)}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
