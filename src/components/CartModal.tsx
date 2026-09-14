import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, QrCode, CreditCard, Banknote, CheckCircle2 } from 'lucide-react';
import { ItemPersonalizado, Pedido, PaymentMethod } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: ItemPersonalizado[];
  onRemoveItem: (itemId: string) => void;
  onConfirmOrder: (pedido: Pedido) => void;
  clienteNomePadrao?: string;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onConfirmOrder,
  clienteNomePadrao = 'Thiago (Aluno UNESP)',
}) => {
  if (!isOpen) return null;

  const [clienteNome, setClienteNome] = useState(clienteNomePadrao);
  const [metodoPagamento, setMetodoPagamento] = useState<PaymentMethod>('pix');
  const [isFinalizado, setIsFinalizado] = useState(false);
  const [pedidoGerado, setPedidoGerado] = useState<Pedido | null>(null);

  const totalGeral = cartItems.reduce((acc, item) => acc + item.precoTotal, 0);

  const handleFinalizar = () => {
    if (cartItems.length === 0) return;

    const codigoUnico = `UNESP-${Math.floor(100 + Math.random() * 900)}`;
    const novoPedido: Pedido = {
      id: `ped-${Date.now()}`,
      codigo: codigoUnico,
      padariaId: cartItems[0]?.padariaId || 'padaria-1',
      padariaNome: cartItems[0]?.padariaNome || 'Padaria Central Unesp',
      canal: 'app_mobile',
      clienteNome: clienteNome.trim() || 'Cliente UNESP',
      itens: [...cartItems],
      valorTotal: totalGeral,
      status: 'aguardando_preparo',
      metodoPagamento,
      criadoEm: 'Agora mesmo',
      tempoEstimadoMin: 15,
    };

    setPedidoGerado(novoPedido);
    setIsFinalizado(true);
    onConfirmOrder(novoPedido);
  };

  const handleFecharTudo = () => {
    setIsFinalizado(false);
    setPedidoGerado(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        id="modal-sacola-pedidos"
        className="relative bg-white w-full max-w-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-[#EADBCA] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header da Sacola */}
        <div className="bg-[#FAF6EF] px-5 sm:px-8 py-5 border-b border-[#EADBCA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4A2F17] text-white flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#E5A823]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#3E2512] font-['Space_Grotesk']">
                {isFinalizado ? 'Pedido Enviado à Cozinha!' : 'Sua Sacola de Lanches'}
              </h2>
              <p className="text-xs text-[#75604C]">
                {isFinalizado ? 'Acompanhe a chamada na tela do padeiro' : `${cartItems.length} item(ns) selecionados`}
              </p>
            </div>
          </div>

          <button
            onClick={handleFecharTudo}
            className="w-8 h-8 rounded-full bg-white border border-[#E9DFCE] text-[#75604C] hover:text-[#3E2512] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-5">
          {isFinalizado && pedidoGerado ? (
            /* TELA DE SUCESSO DO PEDIDO */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#9B6F26]">
                  Senha do seu pedido:
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#3E2512] font-['Space_Grotesk'] mt-1">
                  {pedidoGerado.codigo}
                </div>
                <p className="text-xs sm:text-sm text-[#75604C] mt-1.5 max-w-sm mx-auto">
                  Seu lanche personalizado já apareceu na tela do forno da <strong>{pedidoGerado.padariaNome}</strong>!
                </p>
              </div>

              <div className="bg-[#FAF6EF] rounded-2xl p-4 border border-[#EADBCA] text-left max-w-md mx-auto text-xs space-y-1.5 text-[#75604C]">
                <div className="flex justify-between">
                  <span>Tempo estimado:</span>
                  <span className="font-bold text-[#3E2512]">~{pedidoGerado.tempoEstimadoMin} minutos</span>
                </div>
                <div className="flex justify-between">
                  <span>Cliente:</span>
                  <span className="font-bold text-[#3E2512]">{pedidoGerado.clienteNome}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valor total pago:</span>
                  <span className="font-bold text-[#3E2512]">R$ {pedidoGerado.valorTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleFecharTudo}
                className="w-full max-w-md mx-auto py-3 px-6 rounded-xl bg-[#E5A823] hover:bg-[#D99A16] text-[#3B220B] font-bold text-sm shadow-xs transition-colors"
              >
                Concluir & Voltar
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* SACOLA VAZIA */
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#D6C5AF] mx-auto" />
              <h3 className="text-base font-bold text-[#3E2512]">Sua sacola está vazia</h3>
              <p className="text-xs text-[#75604C] max-w-xs mx-auto">
                Escolha uma das padarias no campus ou em Bauru e monte seu lanche com ingredientes personalizados!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 rounded-xl bg-[#4A2F17] text-white font-bold text-xs"
              >
                Explorar Padarias
              </button>
            </div>
          ) : (
            /* LISTA DE ITENS NA SACOLA */
            <>
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="bg-[#FAF6EF] rounded-2xl p-4 border border-[#EADBCA] flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5">{item.produtoBase.icone}</span>
                      <div>
                        <h4 className="text-sm font-bold text-[#3E2512]">
                          {item.quantidade}x {item.produtoBase.nome}
                        </h4>

                        {/* Adicionados */}
                        {item.ingredientes && item.ingredientes.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-[#2D6A28]">
                            <span className="font-semibold">+</span>
                            {item.ingredientes.map(ing => (
                              <span key={ing.id} className="bg-white px-1.5 py-0.5 rounded-md border border-emerald-200">
                                {ing.nome}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Removidos */}
                        {item.ingredientesRemovidos && item.ingredientesRemovidos.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-red-700">
                            <span className="font-semibold">Sem:</span>
                            {item.ingredientesRemovidos.map(rem => (
                              <span key={rem} className="bg-red-50 px-1.5 py-0.5 rounded-md border border-red-200 line-through">
                                {rem}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Observações */}
                        {item.observacoes && (
                          <p className="mt-1 text-[11px] text-[#6A4D0E] italic">
                            Obs: "{item.observacoes}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="text-sm font-bold text-[#3E2512]">
                        R$ {item.precoTotal.toFixed(2)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        title="Remover lanche"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Identificação do Cliente */}
              <div className="bg-[#FAF6EF] rounded-2xl p-4 border border-[#EADBCA] space-y-2">
                <label className="block text-xs font-bold text-[#3E2512]">
                  Nome para a Comanda / Chamada do Lanche
                </label>
                <input
                  type="text"
                  value={clienteNome}
                  onChange={e => setClienteNome(e.target.value)}
                  placeholder="Seu nome ou apelido"
                  className="w-full bg-white border border-[#E0D3C1] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#3E2512] focus:outline-hidden focus:ring-2 focus:ring-[#DE9E1E]"
                />
              </div>

              {/* Forma de Pagamento */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#3E2512]">
                  Forma de Pagamento
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMetodoPagamento('pix')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      metodoPagamento === 'pix'
                        ? 'bg-[#FAF5EC] border-[#DE9E1E] text-[#3E2512] shadow-2xs'
                        : 'bg-white border-[#E0D3C1] text-[#75604C] hover:bg-[#FAF6EF]'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-[#DE9E1E]" />
                    <span>Pix Online</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMetodoPagamento('cartao_credito')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      metodoPagamento === 'cartao_credito'
                        ? 'bg-[#FAF5EC] border-[#DE9E1E] text-[#3E2512] shadow-2xs'
                        : 'bg-white border-[#E0D3C1] text-[#75604C] hover:bg-[#FAF6EF]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#DE9E1E]" />
                    <span>Cartão</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMetodoPagamento('balcao')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      metodoPagamento === 'balcao'
                        ? 'bg-[#FAF5EC] border-[#DE9E1E] text-[#3E2512] shadow-2xs'
                        : 'bg-white border-[#E0D3C1] text-[#75604C] hover:bg-[#FAF6EF]'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-[#DE9E1E]" />
                    <span>No Balcão</span>
                  </button>
                </div>
              </div>

              {/* Resumo Financeiro */}
              <div className="border-t border-[#EADBCA] pt-4 space-y-1.5 text-xs text-[#75604C]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-[#3E2512]">R$ {totalGeral.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de retirada no balcão:</span>
                  <span className="font-semibold text-emerald-700">Grátis</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-[#3E2512] pt-2 border-t border-[#EADBCA]">
                  <span>Total a pagar:</span>
                  <span className="text-[#DE9E1E]">R$ {totalGeral.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Rodapé da Sacola com Botão de Confirmação */}
        {!isFinalizado && cartItems.length > 0 && (
          <div className="bg-[#FAF6EF] border-t border-[#EADBCA] px-5 sm:px-8 py-4">
            <button
              onClick={handleFinalizar}
              className="w-full flex items-center justify-between bg-[#E5A823] hover:bg-[#D99A16] text-[#3B220B] font-bold py-3.5 px-6 rounded-xl shadow-xs transition-colors"
            >
              <span>Confirmar & Enviar ao Padeiro</span>
              <span className="bg-[#FAF6EF]/70 px-3 py-1 rounded-lg text-sm sm:text-base font-extrabold">
                R$ {totalGeral.toFixed(2)}
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
