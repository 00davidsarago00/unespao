import React, { useState } from 'react';
import { ProdutoBase, Ingrediente, BaseCategory, IngredientCategory } from '../types';
import {
  Store,
  Package,
  AlertTriangle,
  Plus,
  Minus,
  Trash2,
  ChefHat,
  Search
} from 'lucide-react';

interface AdminStockPanelProps {
  bases: ProdutoBase[];
  ingredientes: Ingrediente[];
  onUpdateBaseStock: (id: string, newStock: number) => void;
  onUpdateIngredientStock: (id: string, newStock: number) => void;
  onAddNewIngredient: (ing: Partial<Ingrediente>) => void;
  onRemoveIngredient: (id: string) => void;
  onAddNewBase: (base: Partial<ProdutoBase>) => void;
  onRemoveBase: (id: string) => void;
}

const BASE_CATEGORIES: BaseCategory[] = ['Pão Artesanal', 'Base Leve', 'Massa Especial'];
const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  'Recheio / Proteína',
  'Queijo',
  'Salada / Vegetal',
  'Molho Artesanal',
  'Crocante & Toque Final',
];

export const AdminStockPanel: React.FC<AdminStockPanelProps> = ({
  bases,
  ingredientes,
  onUpdateBaseStock,
  onUpdateIngredientStock,
  onAddNewIngredient,
  onRemoveIngredient,
  onAddNewBase,
  onRemoveBase,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'estoque' | 'catalogo'>('estoque');
  const [catalogoForm, setCatalogoForm] = useState<'ingrediente' | 'base'>('ingrediente');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);

  // Formulário: novo ingrediente
  const [newIngNome, setNewIngNome] = useState('');
  const [newIngCat, setNewIngCat] = useState<IngredientCategory>('Recheio / Proteína');
  const [newIngPreco, setNewIngPreco] = useState('5.00');
  const [newIngEstoque, setNewIngEstoque] = useState('30');
  const [newIngDesc, setNewIngDesc] = useState('');

  // Formulário: novo produto base
  const [newBaseNome, setNewBaseNome] = useState('');
  const [newBaseCat, setNewBaseCat] = useState<BaseCategory>('Pão Artesanal');
  const [newBasePreco, setNewBasePreco] = useState('8.00');
  const [newBaseEstoque, setNewBaseEstoque] = useState('30');
  const [newBaseDesc, setNewBaseDesc] = useState('');

  const filteredBases = bases.filter(b => {
    const matchesSearch = b.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLow = filterLowStock ? b.estoque <= 10 : true;
    return matchesSearch && matchesLow;
  });

  const filteredIngredients = ingredientes.filter(i => {
    const matchesSearch = i.nome.toLowerCase().includes(searchTerm.toLowerCase()) || i.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLow = filterLowStock ? i.estoque <= 10 : true;
    return matchesSearch && matchesLow;
  });

  const handleCreateIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIngNome.trim()) return;

    onAddNewIngredient({
      id: `ing-${Date.now()}`,
      nome: newIngNome.trim(),
      categoria: newIngCat,
      descricao: newIngDesc.trim() || 'Ingrediente cadastrado pelo Atendente/Administrador',
      precoUnitario: parseFloat(newIngPreco) || 5.0,
      estoque: parseInt(newIngEstoque, 10) || 20,
      unidade: 'porção',
      icone: '✨',
    });

    setNewIngNome('');
    setNewIngDesc('');
    setActiveSubTab('estoque');
  };

  const handleCreateBase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBaseNome.trim()) return;

    onAddNewBase({
      id: `base-${Date.now()}`,
      nome: newBaseNome.trim(),
      categoria: newBaseCat,
      descricao: newBaseDesc.trim() || 'Produto base cadastrado pelo Atendente/Administrador',
      precoBase: parseFloat(newBasePreco) || 8.0,
      estoque: parseInt(newBaseEstoque, 10) || 20,
      unidade: 'unid',
      icone: '🥖',
      calorias: 0,
    });

    setNewBaseNome('');
    setNewBaseDesc('');
    setActiveSubTab('estoque');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner explaining role */}
      <div id="tour-atendente-banner" className="bg-stone-900 text-white rounded-2xl p-5 border border-stone-800 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Store className="w-4 h-4" />
              <span>Painel Operacional do Atendente/Administrador</span>
            </div>
            <h2 className="text-xl font-black mt-1 text-white">
              Gestão de Catálogo e Estoque (SRP)
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl">
              Conforme definido no <strong>Capítulo 3 (SOLID SRP)</strong> e <strong>Capítulo 4 (Interface do Atendente/Administrador)</strong>:
              o Atendente/Administrador cadastra e mantém Produtos Base, Ingredientes e seus níveis de estoque — toda alteração
              reflete imediatamente na disponibilidade do totem e do aplicativo.
            </p>
          </div>

          <div id="tour-atendente-subtabs" className="flex items-center space-x-2 bg-stone-800 p-1.5 rounded-xl border border-stone-700">
            <button
              onClick={() => setActiveSubTab('estoque')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'estoque' ? 'bg-amber-500 text-stone-950 shadow' : 'text-stone-300 hover:text-white'
              }`}
            >
              Catálogo & Estoque
            </button>
            <button
              onClick={() => setActiveSubTab('catalogo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'catalogo' ? 'bg-amber-500 text-stone-950 shadow' : 'text-stone-300 hover:text-white'
              }`}
            >
              + Novo Item
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: GESTÃO DE ESTOQUE E CATÁLOGO */}
      {activeSubTab === 'estoque' && (
        <div className="space-y-6">
          {/* Controls: search and low stock filter */}
          <div id="tour-atendente-lowstock-filter" className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar produto ou ingrediente..."
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between">
              <label className="flex items-center space-x-2 text-xs font-semibold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterLowStock}
                  onChange={(e) => setFilterLowStock(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <span>Mostrar apenas estoque crítico (&le; 10)</span>
              </label>

              <span className="text-xs text-stone-400">
                {filteredBases.length + filteredIngredients.length} item(ns)
              </span>
            </div>
          </div>

          {/* Produtos Base Table */}
          <div id="tour-atendente-base-table" className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-600" />
                <span>Catálogo de Produtos Base ({filteredBases.length})</span>
              </h3>
              <span className="text-xs text-stone-500">Pães e bases para montagem</span>
            </div>

            <div className="divide-y divide-stone-100">
              {filteredBases.map(base => {
                const isCritical = base.estoque <= 5;
                const isLow = base.estoque <= 10;

                return (
                  <div key={base.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-xl shrink-0">
                        {base.icone}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-stone-900 text-sm">{base.nome}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-semibold">
                            {base.categoria}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          Preço base no totem: <strong>R$ {base.precoBase.toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className={`text-sm font-black flex items-center gap-1 ${
                          isCritical ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-stone-900'
                        }`}>
                          {base.estoque} {base.unidade}
                          {isCritical && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                        </span>
                        <div className="text-[10px] text-stone-400">
                          {isCritical ? 'ESTOQUE CRÍTICO' : isLow ? 'NÍVEL BAIXO' : 'REGULAR'}
                        </div>
                      </div>

                      {/* Stock Stepper */}
                      <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-xl">
                        <button
                          id={`btn-dec-base-${base.id}`}
                          onClick={() => onUpdateBaseStock(base.id, Math.max(0, base.estoque - 5))}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 flex items-center justify-center text-stone-700 shadow-sm"
                          title="-5 unidades"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`btn-inc-base-${base.id}`}
                          onClick={() => onUpdateBaseStock(base.id, base.estoque + 10)}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 flex items-center justify-center text-stone-700 shadow-sm"
                          title="+10 unidades"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        id={`btn-remove-base-${base.id}`}
                        onClick={() => onRemoveBase(base.id)}
                        className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600 shadow-sm"
                        title="Remover do catálogo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ingredientes Table */}
          <div id="tour-atendente-ingredient-table" className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-amber-600" />
                <span>Catálogo de Ingredientes ({filteredIngredients.length})</span>
              </h3>
              <span className="text-xs text-stone-500">Recheios, queijos, molhos e saladas</span>
            </div>

            <div className="divide-y divide-stone-100">
              {filteredIngredients.map(ing => {
                const isCritical = ing.estoque <= 5;
                const isLow = ing.estoque <= 10;

                return (
                  <div key={ing.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-xl shrink-0">
                        {ing.icone}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-stone-900 text-sm">{ing.nome}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-semibold">
                            {ing.categoria}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          Adicional: <strong>+ R$ {ing.precoUnitario.toFixed(2)}</strong> ({ing.unidade})
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className={`text-sm font-black flex items-center gap-1 ${
                          isCritical ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-stone-900'
                        }`}>
                          {ing.estoque} {ing.unidade}
                          {isCritical && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                        </span>
                        <div className="text-[10px] text-stone-400">
                          {isCritical ? 'BLOQUEADO NO TOTEM' : isLow ? 'REABASTECER' : 'DISPONÍVEL'}
                        </div>
                      </div>

                      {/* Stock Stepper */}
                      <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-xl">
                        <button
                          id={`btn-dec-ing-${ing.id}`}
                          onClick={() => onUpdateIngredientStock(ing.id, Math.max(0, ing.estoque - 5))}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 flex items-center justify-center text-stone-700 shadow-sm"
                          title="-5 unidades"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`btn-inc-ing-${ing.id}`}
                          onClick={() => onUpdateIngredientStock(ing.id, ing.estoque + 10)}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 flex items-center justify-center text-stone-700 shadow-sm"
                          title="+10 unidades"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        id={`btn-remove-ing-${ing.id}`}
                        onClick={() => onRemoveIngredient(ing.id)}
                        className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600 shadow-sm"
                        title="Remover do catálogo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: ADICIONAR NOVO ITEM AO CATÁLOGO */}
      {activeSubTab === 'catalogo' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm max-w-xl mx-auto">
          <div className="flex items-center space-x-2 bg-stone-100 p-1 rounded-xl mb-5 w-fit">
            <button
              onClick={() => setCatalogoForm('ingrediente')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                catalogoForm === 'ingrediente' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              Novo Ingrediente
            </button>
            <button
              onClick={() => setCatalogoForm('base')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                catalogoForm === 'base' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              Novo Produto Base
            </button>
          </div>

          {catalogoForm === 'ingrediente' ? (
            <>
              <h3 className="font-bold text-stone-900 text-base mb-1">
                Cadastrar Novo Ingrediente no Catálogo
              </h3>
              <p className="text-xs text-stone-500 mb-5">
                Ao salvar, o ingrediente será disponibilizado instantaneamente no totem e no aplicativo.
              </p>

              <form onSubmit={handleCreateIngredient} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">
                    Nome do Ingrediente
                  </label>
                  <input
                    type="text"
                    required
                    value={newIngNome}
                    onChange={(e) => setNewIngNome(e.target.value)}
                    placeholder="Ex: Queijo Brie com Nozes"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 uppercase block mb-1">
                      Categoria
                    </label>
                    <select
                      value={newIngCat}
                      onChange={(e) => setNewIngCat(e.target.value as IngredientCategory)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      {INGREDIENT_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 uppercase block mb-1">
                      Preço Adicional (R$)
                    </label>
                    <input
                      type="number"
                      step="0.10"
                      required
                      value={newIngPreco}
                      onChange={(e) => setNewIngPreco(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">
                    Estoque Inicial (unidades/porções)
                  </label>
                  <input
                    type="number"
                    required
                    value={newIngEstoque}
                    onChange={(e) => setNewIngEstoque(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">
                    Descrição Curta
                  </label>
                  <textarea
                    rows={2}
                    value={newIngDesc}
                    onChange={(e) => setNewIngDesc(e.target.value)}
                    placeholder="Ex: Queijo de pasta mole francês com fatias finas de nozes crocantes."
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('estoque')}
                    className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md"
                  >
                    Salvar no Catálogo
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h3 className="font-bold text-stone-900 text-base mb-1">
                Cadastrar Novo Produto Base no Catálogo
              </h3>
              <p className="text-xs text-stone-500 mb-5">
                Ao salvar, o produto base será disponibilizado instantaneamente no totem e no aplicativo.
              </p>

              <form onSubmit={handleCreateBase} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">
                    Nome do Produto Base
                  </label>
                  <input
                    type="text"
                    required
                    value={newBaseNome}
                    onChange={(e) => setNewBaseNome(e.target.value)}
                    placeholder="Ex: Pão Sírio Integral"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 uppercase block mb-1">
                      Categoria
                    </label>
                    <select
                      value={newBaseCat}
                      onChange={(e) => setNewBaseCat(e.target.value as BaseCategory)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      {BASE_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 uppercase block mb-1">
                      Preço Base (R$)
                    </label>
                    <input
                      type="number"
                      step="0.10"
                      required
                      value={newBasePreco}
                      onChange={(e) => setNewBasePreco(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">
                    Estoque Inicial (unidades)
                  </label>
                  <input
                    type="number"
                    required
                    value={newBaseEstoque}
                    onChange={(e) => setNewBaseEstoque(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 uppercase block mb-1">
                    Descrição Curta
                  </label>
                  <textarea
                    rows={2}
                    value={newBaseDesc}
                    onChange={(e) => setNewBaseDesc(e.target.value)}
                    placeholder="Ex: Pão sírio integral leve, ideal para bases mais leves."
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('estoque')}
                    className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md"
                  >
                    Salvar no Catálogo
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      {/* Identificador de Rodapé Institucional para o Tópico de Controle de Versões */}
      <div id="tour-atendente-footer-meta" className="pt-2 text-center text-xs text-stone-400 font-medium border-t border-stone-200">
        Unespão • Painel do Atendente/Administrador
      </div>
    </div>
  );
};
