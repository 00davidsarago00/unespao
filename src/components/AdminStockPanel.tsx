import React, { useState } from 'react';
import { ProdutoBase, Ingrediente, Pedido, OrderStatus } from '../types';
import { 
  Store, 
  Package, 
  AlertTriangle, 
  Plus, 
  Minus, 
  RefreshCw, 
  ChefHat, 
  CheckCircle, 
  Clock, 
  TrendingDown,
  Layers,
  Search
} from 'lucide-react';

interface AdminStockPanelProps {
  bases: ProdutoBase[];
  ingredientes: Ingrediente[];
  pedidos: Pedido[];
  onUpdateBaseStock: (id: string, newStock: number) => void;
  onUpdateIngredientStock: (id: string, newStock: number) => void;
  onUpdateOrderStatus: (pedidoId: string, status: OrderStatus) => void;
  onAddNewIngredient: (ing: Partial<Ingrediente>) => void;
}

export const AdminStockPanel: React.FC<AdminStockPanelProps> = ({
  bases,
  ingredientes,
  pedidos,
  onUpdateBaseStock,
  onUpdateIngredientStock,
  onUpdateOrderStatus,
  onAddNewIngredient,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'estoque' | 'pedidos' | 'adicionar'>('estoque');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);

  // New Ingredient form state
  const [newNome, setNewNome] = useState('');
  const [newCat, setNewCat] = useState<any>('Recheio / Proteína');
  const [newPreco, setNewPreco] = useState('5.00');
  const [newEstoque, setNewEstoque] = useState('30');
  const [newDesc, setNewDesc] = useState('');

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
    if (!newNome.trim()) return;

    onAddNewIngredient({
      id: `ing-${Date.now()}`,
      nome: newNome.trim(),
      categoria: newCat,
      descricao: newDesc.trim() || 'Ingrediente cadastrado pelo Atendente',
      precoUnitario: parseFloat(newPreco) || 5.0,
      estoque: parseInt(newEstoque, 10) || 20,
      unidade: 'porção',
      icone: '✨',
    });

    setNewNome('');
    setNewDesc('');
    setActiveSubTab('estoque');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner explaining role */}
      <div className="bg-stone-900 text-white rounded-2xl p-5 border border-stone-800 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Store className="w-4 h-4" />
              <span>Painel Operacional do Atendente / Administrador</span>
            </div>
            <h2 className="text-xl font-black mt-1 text-white">
              Gestão de Catálogo, Estoque (SRP) & Fila da Chapa
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-2xl">
              Conforme definido no <strong>Capítulo 3 (SOLID SRP)</strong> e <strong>Capítulo 4 (Interface do Atendente)</strong>: 
              toda alteração de insumo aqui reflete imediatamente na disponibilidade do totem.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-stone-800 p-1.5 rounded-xl border border-stone-700">
            <button
              onClick={() => setActiveSubTab('estoque')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'estoque' ? 'bg-amber-500 text-stone-950 shadow' : 'text-stone-300 hover:text-white'
              }`}
            >
              Estoque de Insumos
            </button>
            <button
              onClick={() => setActiveSubTab('pedidos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                activeSubTab === 'pedidos' ? 'bg-amber-500 text-stone-950 shadow' : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>Fila da Cozinha</span>
              <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 text-[10px] font-extrabold flex items-center justify-center">
                {pedidos.filter(p => p.status === 'em_preparo' || p.status === 'pronto').length}
              </span>
            </button>
            <button
              onClick={() => setActiveSubTab('adicionar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'adicionar' ? 'bg-amber-500 text-stone-950 shadow' : 'text-stone-300 hover:text-white'
              }`}
            >
              + Novo Insumo
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: GESTÃO DE ESTOQUE */}
      {activeSubTab === 'estoque' && (
        <div className="space-y-6">
          {/* Controls: search and low stock filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200">
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
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-600" />
                <span>Estoque de Produtos Base ({filteredBases.length})</span>
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ingredientes Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-amber-600" />
                <span>Estoque de Ingredientes ({filteredIngredients.length})</span>
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: FILA DE PREPARO / COZINHA */}
      {activeSubTab === 'pedidos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Fila de Pedidos na Chapa & Balcão</span>
            </h3>
            <span className="text-xs text-stone-500">
              Total de pedidos registrados: {pedidos.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pedidos.map(ped => (
              <div
                key={ped.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-xs font-mono font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {ped.codigo}
                    </span>
                    <h4 className="font-bold text-stone-900 text-sm mt-1">{ped.clienteNome}</h4>
                    <span className="text-[11px] text-stone-400">Canal: {ped.canal.replace('_', ' ').toUpperCase()}</span>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                      ped.status === 'pronto'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ped.status === 'em_preparo'
                        ? 'bg-amber-100 text-amber-800 animate-pulse'
                        : 'bg-stone-100 text-stone-700'
                    }`}>
                      {ped.status.replace('_', ' ')}
                    </span>
                    <div className="text-xs font-black text-stone-900 mt-1">
                      R$ {ped.valorTotal.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-2">
                  <div className="text-[11px] uppercase font-bold text-stone-400">Itens para Montagem:</div>
                  {ped.itens.map((item, idx) => (
                    <div key={idx} className="bg-stone-50 p-2.5 rounded-xl text-xs space-y-1">
                      <div className="font-bold text-stone-800 flex items-center gap-1.5">
                        <span>{item.produtoBase.icone}</span>
                        <span>{item.produtoBase.nome}</span>
                      </div>
                      <div className="text-[11px] text-stone-600 pl-5">
                        {item.ingredientes.map(i => i.nome).join(', ')}
                      </div>
                      {item.observacoes && (
                        <div className="text-[10px] text-amber-800 font-medium pl-5 italic">
                          Obs: "{item.observacoes}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Status action buttons */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-400">{ped.criadoEm}</span>
                  
                  <div className="flex items-center space-x-2">
                    {ped.status === 'em_preparo' && (
                      <button
                        onClick={() => onUpdateOrderStatus(ped.id, 'pronto')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1 shadow-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Marcar Pronto</span>
                      </button>
                    )}
                    {ped.status === 'pronto' && (
                      <button
                        onClick={() => onUpdateOrderStatus(ped.id, 'concluido')}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-sm"
                      >
                        Entregar no Balcão
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: ADICIONAR NOVO INSUMO */}
      {activeSubTab === 'adicionar' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm max-w-xl mx-auto">
          <h3 className="font-bold text-stone-900 text-base mb-1">
            Cadastrar Novo Ingrediente no Catálogo
          </h3>
          <p className="text-xs text-stone-500 mb-5">
            Ao salvar, o ingrediente será disponibilizado instantaneamente no Totem e no App móvel.
          </p>

          <form onSubmit={handleCreateIngredient} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase block mb-1">
                Nome do Ingrediente
              </label>
              <input
                type="text"
                required
                value={newNome}
                onChange={(e) => setNewNome(e.target.value)}
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
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Recheio / Proteína">Recheio / Proteína</option>
                  <option value="Queijo">Queijo</option>
                  <option value="Salada / Vegetal">Salada / Vegetal</option>
                  <option value="Molho Artesanal">Molho Artesanal</option>
                  <option value="Crocante & Toque Final">Crocante & Toque Final</option>
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
                  value={newPreco}
                  onChange={(e) => setNewPreco(e.target.value)}
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
                value={newEstoque}
                onChange={(e) => setNewEstoque(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 uppercase block mb-1">
                Descrição Curta
              </label>
              <textarea
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
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
        </div>
      )}
    </div>
  );
};
