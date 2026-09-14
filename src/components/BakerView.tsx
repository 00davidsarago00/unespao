import React, { useState } from 'react';
import { 
  Flame, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Bell, 
  Plus, 
  Sparkles, 
  User, 
  Package, 
  Filter,
  Check,
  ChevronRight
} from 'lucide-react';
import { Pedido, OrderStatus, ClientChannel } from '../types';

interface BakerViewProps {
  pedidos: Pedido[];
  onUpdateOrderStatus: (pedidoId: string, novoStatus: OrderStatus) => void;
  onSimulateIncomingOrder: () => void;
}

export const BakerView: React.FC<BakerViewProps> = ({
  pedidos,
  onUpdateOrderStatus,
  onSimulateIncomingOrder,
}) => {
  const [statusFilter, setStatusFilter] = useState<'todos' | 'aguardando_preparo' | 'em_preparo' | 'pronto'>('todos');

  // Filtragem dos pedidos
  const pedidosFiltrados = pedidos.filter(p => {
    if (statusFilter === 'todos') return p.status !== 'concluido' && p.status !== 'cancelado';
    return p.status === statusFilter;
  });

  const pedidosPendentes = pedidos.filter(p => p.status === 'aguardando_preparo');
  const pedidosEmPreparo = pedidos.filter(p => p.status === 'em_preparo');
  const pedidosProntos = pedidos.filter(p => p.status === 'pronto');

  return (
    <div className="w-full max-w-5xl mx-auto py-2 sm:py-6 px-2 sm:px-4 space-y-6">
      
      {/* Header Limpo da Cozinha & Forno */}
      <div id="tour-baker-header-kds" className="bg-[#FAF6EF] rounded-3xl p-6 sm:p-8 border border-[#EADBCA] shadow-2xs transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#9B6F26] font-['Space_Grotesk']">
                PAINEL DO PADEIRO • FORNO & CHAPA EM OPERAÇÃO
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3E2512] font-['Space_Grotesk']">
              Pedidos Chegando em Tempo Real
            </h1>
            <p className="text-xs sm:text-sm text-[#75604C] mt-1">
              Fila direta para a chapa. Confira os ingredientes personalizados de cada lanche e avance o preparo.
            </p>
          </div>

          {/* Botão de Simulação Rápida para Teste */}
          <button
            id="tour-baker-simular-btn"
            onClick={onSimulateIncomingOrder}
            className="flex items-center gap-2 bg-[#4A2F17] hover:bg-[#3B220B] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-[#E5A823]" />
            <span>Simular Pedido Chegando</span>
          </button>
        </div>

        {/* Barra de Filtros por Etapa de Produção */}
        <div id="tour-baker-status-filter-bar" className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#EADBCA] pt-4 transition-all">
          <button
            onClick={() => setStatusFilter('todos')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'todos'
                ? 'bg-[#4A2F17] text-white shadow-2xs'
                : 'bg-white border border-[#E0D3C1] text-[#75604C] hover:bg-[#FAF6EF]'
            }`}
          >
            Fila Ativa ({pedidosFiltrados.length})
          </button>

          <button
            onClick={() => setStatusFilter('aguardando_preparo')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              statusFilter === 'aguardando_preparo'
                ? 'bg-red-600 text-white shadow-2xs'
                : 'bg-white border border-[#E0D3C1] text-[#75604C] hover:bg-[#FAF6EF]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>Chegando / Pendentes ({pedidosPendentes.length})</span>
          </button>

          <button
            onClick={() => setStatusFilter('em_preparo')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              statusFilter === 'em_preparo'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-white border border-[#E0D3C1] text-[#75604C] hover:bg-[#FAF6EF]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>Na Chapa / Em Preparo ({pedidosEmPreparo.length})</span>
          </button>

          <button
            onClick={() => setStatusFilter('pronto')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              statusFilter === 'pronto'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'bg-white border border-[#E0D3C1] text-[#75604C] hover:bg-[#FAF6EF]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>Prontos no Balcão ({pedidosProntos.length})</span>
          </button>
        </div>
      </div>

      {/* Lista de Pedidos na Fila */}
      <div className="space-y-4">
        {pedidosFiltrados.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-[#EADBCA]">
            <div className="w-16 h-16 rounded-full bg-[#FAF6EF] text-[#DE9E1E] flex items-center justify-center mx-auto mb-3">
              <Flame className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#3E2512] font-['Space_Grotesk']">
              Chapa livre no momento!
            </h3>
            <p className="text-xs sm:text-sm text-[#75604C] mt-1 max-w-md mx-auto">
              Nenhum pedido pendente nesta etapa. Assim que um cliente confirmar uma personalização, o pedido aparecerá aqui automaticamente.
            </p>
            <button
              onClick={onSimulateIncomingOrder}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E5A823] text-[#3B220B] font-bold text-xs shadow-xs hover:bg-[#D99A16]"
            >
              <Plus className="w-4 h-4" />
              <span>Simular Novo Pedido Chegando</span>
            </button>
          </div>
        ) : (
          pedidosFiltrados.map((pedido, pIndex) => {
            const isPendente = pedido.status === 'aguardando_preparo';
            const isEmPreparo = pedido.status === 'em_preparo';
            const isPronto = pedido.status === 'pronto';

            return (
              <div
                key={pedido.id}
                id={pIndex === 0 ? 'tour-baker-comanda-card-first' : `pedido-${pedido.codigo}`}
                className={`bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border transition-all ${
                  isPendente 
                    ? 'border-red-300 shadow-md ring-1 ring-red-200' 
                    : isEmPreparo 
                    ? 'border-amber-300 shadow-sm' 
                    : 'border-[#EADBCA] shadow-2xs'
                }`}
              >
                {/* Header do Card de Comanda */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F2EADB] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl font-black text-[#3E2512] font-['Space_Grotesk'] tracking-tight">
                      {pedido.codigo}
                    </span>
                    <span className="text-xs text-[#75604C]">
                      • {pedido.clienteNome}
                    </span>
                    <span className="text-[11px] text-[#7A561D] bg-[#FAF6EF] px-2.5 py-0.5 rounded-full border border-[#EADBCA]">
                      {pedido.padariaNome || 'Padaria Central Unesp'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div 
                      id={pIndex === 0 ? 'tour-baker-time-meta' : undefined}
                      className="flex items-center gap-1.5 text-xs text-[#75604C] bg-[#FAF6EF] px-2.5 py-1 rounded-lg transition-all"
                    >
                      <Clock className="w-3.5 h-3.5 text-[#DE9E1E]" />
                      <span>{pedido.criadoEm}</span>
                    </div>

                    {/* Status Badge */}
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      isPendente 
                        ? 'bg-red-100 text-red-700 animate-pulse' 
                        : isEmPreparo 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {isPendente ? '🔴 Novo Pedido Chegando' : isEmPreparo ? '🟡 Na Chapa / Preparando' : '🟢 Pronto no Balcão'}
                    </span>
                  </div>
                </div>

                {/* Itens do Pedido com Detalhamento de Personalização para o Padeiro */}
                <div className="py-4 space-y-4">
                  {pedido.itens.map((item, index) => (
                    <div 
                      key={item.id || index}
                      id={pIndex === 0 && index === 0 ? 'tour-baker-ingredients-box' : undefined}
                      className="bg-[#FAF6EF] rounded-2xl p-4 border border-[#EADBCA] space-y-3 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{item.produtoBase.icone}</span>
                          <div>
                            <h4 className="text-base font-extrabold text-[#3E2512] font-['Space_Grotesk']">
                              {item.quantidade}x {item.produtoBase.nome}
                            </h4>
                            <span className="text-xs text-[#75604C]">
                              Base: {item.produtoBase.categoria}
                            </span>
                          </div>
                        </div>

                        <span className="text-sm font-bold text-[#3E2512]">
                          R$ {item.precoTotal.toFixed(2)}
                        </span>
                      </div>

                      {/* DESTAQUE DE INGREDIENTES ADICIONADOS */}
                      {item.ingredientes && item.ingredientes.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-[#2D6A28] uppercase tracking-wider flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                            Adicionar ao Lanche:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.ingredientes.map(ing => (
                              <span 
                                key={ing.id}
                                className="text-xs font-bold bg-white text-[#2D6A28] border border-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs"
                              >
                                <span>{ing.icone}</span>
                                <span>{ing.nome}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* DESTAQUE DE INGREDIENTES REMOVIDOS (MUITO IMPORTANTE PARA O PADEIRO!) */}
                      {item.ingredientesRemovidos && item.ingredientesRemovidos.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-600"></span>
                            Atenção: Não colocar (Removidos):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.ingredientesRemovidos.map(removido => (
                              <span 
                                key={removido}
                                className="text-xs font-bold bg-red-100 text-red-800 border border-red-300 px-2.5 py-1 rounded-lg line-through"
                              >
                                {removido}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* OBSERVAÇÃO DO CLIENTE PARA A CHAPA */}
                      {item.observacoes && (
                        <div className="bg-[#FFF8E6] border border-[#E8D196] rounded-xl p-3 text-xs text-[#6A4D0E]">
                          <span className="font-extrabold uppercase text-[10px] tracking-wider block mb-0.5">
                            📝 Bilhete do Cliente para a Chapa:
                          </span>
                          <p className="font-medium italic">"{item.observacoes}"</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Ações Rápidas do Padeiro */}
                <div 
                  id={pIndex === 0 ? 'tour-baker-action-buttons-first' : undefined}
                  className="pt-3 border-t border-[#F2EADB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                >
                  <div className="text-xs text-[#75604C]">
                    <span>Total do pedido: </span>
                    <span className="font-bold text-[#3E2512] text-sm">
                      R$ {pedido.valorTotal.toFixed(2)}
                    </span>
                    <span className="ml-2 text-[11px] text-[#7A561D]">
                      ({pedido.metodoPagamento === 'pix' ? 'Pago via Pix' : 'Cartão / Balcão'})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isPendente && (
                      <button
                        onClick={() => onUpdateOrderStatus(pedido.id, 'em_preparo')}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E5A823] hover:bg-[#D99A16] text-[#3B220B] font-bold text-xs sm:text-sm shadow-xs transition-colors"
                      >
                        <Flame className="w-4 h-4" />
                        <span>Iniciar Preparo na Chapa</span>
                      </button>
                    )}

                    {isEmPreparo && (
                      <button
                        onClick={() => onUpdateOrderStatus(pedido.id, 'pronto')}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        <span>Marcar como Pronto no Balcão</span>
                      </button>
                    )}

                    {isPronto && (
                      <button
                        onClick={() => onUpdateOrderStatus(pedido.id, 'concluido')}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#4A2F17] hover:bg-[#3B220B] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                      >
                        <Package className="w-4 h-4 text-[#E5A823]" />
                        <span>Concluir Entrega ao Cliente</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Identificador de Rodapé Institucional para o Tópico 8 */}
      <div id="tour-baker-system-footer" className="pt-2 text-center text-xs text-[#9B6F26] font-medium border-t border-[#EADBCA]/60">
        Unespão • Painel KDS de Cozinha da Padaria • UNESP FC Bauru
      </div>

    </div>
  );
};
