import React, { useState } from 'react';
import { Pedido, AvaliacaoPrato } from '../types';
import { Star, MessageSquare, Check, X } from 'lucide-react';

interface OrderRatingModalProps {
  pedido: Pedido | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitRating: (pedidoId: string, avaliacao: AvaliacaoPrato) => void;
}

export const OrderRatingModal: React.FC<OrderRatingModalProps> = ({
  pedido,
  isOpen,
  onClose,
  onSubmitRating,
}) => {
  const [nota, setNota] = useState<number>(5);
  const [hoverNota, setHoverNota] = useState<number | null>(null);
  const [comentario, setComentario] = useState<string>('');

  if (!isOpen || !pedido) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const avaliacao: AvaliacaoPrato = {
      id: `aval-${Date.now()}`,
      pedidoId: pedido.id,
      clienteNome: pedido.clienteNome,
      nota,
      comentario: comentario.trim() || 'Sem comentários adicionais.',
      dataHora: 'Agora mesmo',
    };

    onSubmitRating(pedido.id, avaliacao);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold">
              Etapa 7 • Avaliação de Prato
            </span>
            <h3 className="font-bold text-base text-stone-100">
              Avaliar Pedido {pedido.codigo}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-stone-600 leading-relaxed">
            Conforme a especificação no <strong>Capítulo 1 e 4</strong>, a avaliação do cliente alimenta diretamente o 
            <code> AvaliacaoService</code> e calibra o motor de sugestões personalizadas para futuras visitas.
          </p>

          {/* Star rating */}
          <div className="text-center py-3 bg-stone-50 rounded-2xl border border-stone-200">
            <label className="text-xs font-bold text-stone-600 uppercase tracking-wide block mb-2">
              Sua nota para este lanche personalizado:
            </label>
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3, 4, 5].map(star => {
                const isFilled = (hoverNota !== null ? hoverNota : nota) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverNota(star)}
                    onMouseLeave={() => setHoverNota(null)}
                    onClick={() => setNota(star)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        isFilled
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <div className="text-xs font-bold text-amber-600 mt-2">
              {nota === 5 && '⭐️⭐️⭐️⭐️⭐️ Perfeito! Amamos a montagem!'}
              {nota === 4 && '⭐️⭐️⭐️⭐️ Muito bom!'}
              {nota === 3 && '⭐️⭐️⭐️ Regular'}
              {nota === 2 && '⭐️⭐️ Abaixo do esperado'}
              {nota === 1 && '⭐️ Precisa melhorar'}
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wide flex items-center space-x-1.5 mb-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
              <span>Comentários sobre a combinação de ingredientes:</span>
            </label>
            <textarea
              rows={3}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Ex: A ciabatta estava estaladiça e o molho de maionese temperada combinou perfeitamente com a carne seca!"
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900"
            >
              Pular
            </button>
            <button
              id="btn-enviar-avaliacao"
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center space-x-1.5 shadow"
            >
              <Check className="w-4 h-4" />
              <span>Registrar Avaliação</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
