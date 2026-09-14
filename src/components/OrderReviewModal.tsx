import React, { useState } from 'react';
import { ItemPersonalizado, PaymentMethod, Pedido, ClientChannel } from '../types';
import { 
  X, 
  Trash2, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  Clock,
  Receipt
} from 'lucide-react';

interface OrderReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: ItemPersonalizado[];
  onRemoveItem: (id: string) => void;
  onConfirmOrder: (pedido: Pedido) => void;
  channel: ClientChannel;
  clienteNome: string;
}

export const OrderReviewModal: React.FC<OrderReviewModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onConfirmOrder,
  channel,
  clienteNome,
}) => {
  const [step, setStep] = useState<'revisao' | 'pagamento' | 'sucesso'>('revisao');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedPedido, setConfirmedPedido] = useState<Pedido | null>(null);

  if (!isOpen) return null;

  const totalOrderValue = cartItems.reduce((acc, item) => acc + item.precoTotal * item.quantidade, 0);

  const handleProceedToPayment = () => {
    if (cartItems.length === 0) return;
    setStep('pagamento');
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);

    // Simulate API Unespão calling IGatewayPagamentoAdapter
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderNum = Math.floor(100 + Math.random() * 900);
      const newPedido: Pedido = {
        id: `ped-${Date.now()}`,
        codigo: `UNESP-${randomOrderNum}`,
        padariaId: cartItems[0]?.padariaId || 'padaria-1',
        padariaNome: cartItems[0]?.padariaNome || 'Padaria Central Unesp',
        canal: channel,
        clienteNome,
        itens: [...cartItems],
        valorTotal: totalOrderValue,
        status: 'em_preparo',
        metodoPagamento: paymentMethod,
        criadoEm: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + ' - Hoje',
        tempoEstimadoMin: 10 + Math.floor(Math.random() * 6),
      };

      setConfirmedPedido(newPedido);
      setStep('sucesso');
      onConfirmOrder(newPedido);
    }, 1500);
  };

  const handleFinish = () => {
    setStep('revisao');
    setConfirmedPedido(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Receipt className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-stone-100">
              {step === 'revisao' && 'Revisão do Pedido (Editar / Cancelar Itens)'}
              {step === 'pagamento' && 'Checkout Seguro — Gateway de Pagamento'}
              {step === 'sucesso' && 'Pedido Confirmado — Em Preparo!'}
            </h3>
          </div>
          <button
            onClick={step === 'sucesso' ? handleFinish : onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: REVISÃO (Req. Funcional: Permitir cancelamento/edição antes do pagamento) */}
          {step === 'revisao' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span>Cliente: <strong className="text-stone-800">{clienteNome}</strong></span>
                <span>Canal: <strong className="text-stone-800">{channel.replace('_', ' ').toUpperCase()}</strong></span>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-stone-400">
                  <Receipt className="w-12 h-12 mx-auto stroke-[1.5] mb-2 text-stone-300" />
                  <p className="text-sm font-medium">Seu carrinho está vazio.</p>
                  <p className="text-xs text-stone-400 mt-1">
                    Monte seu lanche personalizado escolhendo uma base e ingredientes.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {cartItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl shrink-0">
                          {item.produtoBase.icone}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-stone-900 text-sm">
                              Item #{idx + 1}: {item.produtoBase.nome}
                            </span>
                            <span className="text-xs text-stone-500">
                              (Base: R$ {item.produtoBase.precoBase.toFixed(2)})
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {item.ingredientes.map(ing => (
                              <span
                                key={ing.id}
                                className="text-[11px] px-2 py-0.5 rounded bg-white text-stone-700 border border-stone-200"
                              >
                                {ing.nome} (+R$ {ing.precoUnitario.toFixed(2)})
                              </span>
                            ))}
                          </div>

                          {item.observacoes && (
                            <p className="text-xs text-stone-500 italic mt-1.5">
                              Obs: "{item.observacoes}"
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-200">
                        <span className="font-black text-stone-900 text-base">
                          R$ {item.precoTotal.toFixed(2)}
                        </span>
                        <button
                          id={`btn-remove-item-${item.id}`}
                          onClick={() => onRemoveItem(item.id)}
                          className="mt-1 text-xs text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remover</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Order total & Proceed */}
              {cartItems.length > 0 && (
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-stone-400 uppercase tracking-wider font-bold">
                      Valor Total do Pedido
                    </span>
                    <div className="text-2xl font-black text-stone-900">
                      R$ {totalOrderValue.toFixed(2)}
                    </div>
                  </div>

                  <button
                    id="btn-seguir-pagamento"
                    onClick={handleProceedToPayment}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg transition-transform active:scale-95"
                  >
                    <span>Seguir para Pagamento</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: PAGAMENTO (C4: IGatewayPagamentoAdapter via API Unespão) */}
          {step === 'pagamento' && (
            <div className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Segurança e Princípio DIP (SOLID):</strong>
                  <p className="mt-0.5 text-amber-800">
                    Conforme o Cap. 4 e o padrão GoF Adapter, o frontend nunca lida com credenciais financeiras. 
                    A transação é processada pelo <code>PedidoService</code> mediada pelo <code>IGatewayPagamentoAdapter</code> no backend.
                  </p>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wide block mb-2">
                  Escolha o Método de Pagamento
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="pay-method-pix"
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-sm'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm">Pix Instantâneo</div>
                      <div className="text-[11px] text-stone-500">Aprovação em segundos</div>
                    </div>
                  </button>

                  <button
                    id="pay-method-card"
                    type="button"
                    onClick={() => setPaymentMethod('cartao_credito')}
                    className={`p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                      paymentMethod === 'cartao_credito'
                        ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-sm'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm">Cartão de Crédito/Débito</div>
                      <div className="text-[11px] text-stone-500">Aproximação ou Chip</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Mock Payment Details */}
              {paymentMethod === 'pix' ? (
                <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50 text-center space-y-3">
                  <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl border border-stone-300 shadow-inner flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-8 h-8 bg-stone-900" />
                      <div className="w-8 h-8 bg-stone-900" />
                    </div>
                    <span className="text-[9px] font-mono text-stone-500">PIX-UNESPAO-PAGTO</span>
                    <div className="flex justify-between">
                      <div className="w-8 h-8 bg-stone-900" />
                      <div className="w-4 h-4 bg-stone-900" />
                    </div>
                  </div>
                  <p className="text-xs text-stone-600">
                    Escaneie o QR Code acima ou utilize o botão abaixo para simular a autorização bancária.
                  </p>
                </div>
              ) : (
                <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-stone-700">
                    <CreditCard className="w-4 h-4" />
                    <span>Simulador de Máquina Integrada ao Totem (Pinpad)</span>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    No totem físico, a cobrança é enviada para o pinpad acoplado. No aplicativo móvel, é acionada a carteira digital.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setStep('revisao')}
                  className="text-xs font-bold text-stone-600 hover:text-stone-900"
                >
                  Voltar à Revisão
                </button>

                <button
                  id="btn-confirmar-pagamento"
                  disabled={isProcessing}
                  onClick={handleSimulatePayment}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm flex items-center space-x-2 shadow-lg disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                      <span>Processando no Gateway...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirmar Pagamento (R$ {totalOrderValue.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCESSO & COMPROVANTE */}
          {step === 'sucesso' && confirmedPedido && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-700 font-extrabold">
                  Pagamento Autorizado com Sucesso
                </span>
                <h3 className="text-3xl font-black text-stone-900 font-mono mt-1">
                  Senha: {confirmedPedido.codigo}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Seu pedido já foi enviado para a esteira de preparo da cozinha.
                </p>
              </div>

              {/* Ticket Details */}
              <div className="max-w-md mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Tempo estimado:</span>
                  <strong className="text-amber-600 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> ~{confirmedPedido.tempoEstimadoMin} minutos
                  </strong>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Itens no lanche:</span>
                  <span className="font-semibold text-stone-800">
                    {confirmedPedido.itens.length} lanche(s) personalizado(s)
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Total pago:</span>
                  <strong className="text-stone-900 font-black">
                    R$ {confirmedPedido.valorTotal.toFixed(2)}
                  </strong>
                </div>
                <div className="flex justify-between text-[11px] text-stone-400 pt-1">
                  <span>Baixa de estoque efetuada pelo EstoqueService (SRP)</span>
                  <span>PostgreSQL persistido</span>
                </div>
              </div>

              <button
                id="btn-fechar-sucesso"
                onClick={handleFinish}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md"
              >
                Fazer Novo Pedido / Ir para Início
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
