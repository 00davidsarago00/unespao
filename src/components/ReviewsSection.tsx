import React, { useState } from 'react';
import { Star, MessageSquare, Plus, CheckCircle2, User, ThumbsUp } from 'lucide-react';
import { ReviewOnline, Padaria } from '../types';

interface ReviewsSectionProps {
  padaria: Padaria;
  reviews: ReviewOnline[];
  onAddReview: (review: ReviewOnline) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  padaria,
  reviews,
  onAddReview,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [nota, setNota] = useState(5);
  const [hoverNota, setHoverNota] = useState(0);
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [comentario, setComentario] = useState('');
  const [lancheFavorito, setLancheFavorito] = useState('');
  const [sucessoMsg, setSucessoMsg] = useState(false);

  const padariaReviews = reviews.filter(r => r.padariaId === padaria.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !comentario.trim()) return;

    const novoReview: ReviewOnline = {
      id: `rev-${Date.now()}`,
      padariaId: padaria.id,
      autorNome: nome.trim(),
      autorCargoOuCurso: curso.trim() || 'Comunidade UNESP Bauru',
      nota,
      data: 'Agora mesmo',
      comentario: comentario.trim(),
      lancheFavorito: lancheFavorito.trim() || undefined,
    };

    onAddReview(novoReview);
    setSucessoMsg(true);
    setTimeout(() => {
      setSucessoMsg(false);
      setIsFormOpen(false);
      setNome('');
      setCurso('');
      setComentario('');
      setLancheFavorito('');
      setNota(5);
    }, 1500);
  };

  // Calcular média de avaliações
  const mediaNotas = padariaReviews.length > 0 
    ? (padariaReviews.reduce((acc, r) => acc + r.nota, 0) / padariaReviews.length).toFixed(1)
    : padaria.nota.toFixed(1);

  return (
    <div className="space-y-6">
      {/* Resumo de Avaliações */}
      <div className="bg-[#FAF6EF] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#EADBCA] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#4A2F17] text-white flex flex-col items-center justify-center shadow-xs">
            <span className="text-3xl font-extrabold text-[#E5A823] font-['Space_Grotesk'] leading-none">
              {mediaNotas}
            </span>
            <div className="flex items-center text-[#E5A823] mt-1 text-xs">
              {'★'.repeat(5)}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#3E2512] font-['Space_Grotesk']">
              Avaliações Online de Clientes
            </h3>
            <p className="text-xs sm:text-sm text-[#75604C] mt-0.5">
              {padariaReviews.length} avaliações verificadas de alunos e moradores de Bauru
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#9B6F26] font-semibold">
              <span>✓ 98% dos clientes recomendam os lanches personalizados</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E5A823] hover:bg-[#D99A16] text-[#3B220B] font-bold text-xs sm:text-sm shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen ? 'Fechar Formulário' : 'Avaliar Esta Padaria'}</span>
        </button>
      </div>

      {/* Formulário de Nova Avaliação */}
      {isFormOpen && (
        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-5 sm:p-7 border border-[#DE9E1E] shadow-sm space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-[#F2EADB] pb-3">
            <h4 className="font-bold text-[#3E2512] text-sm sm:text-base font-['Space_Grotesk']">
              Escrever Avaliação para {padaria.nome}
            </h4>
            <span className="text-xs text-[#75604C]">Sua opinião ajuda outros alunos</span>
          </div>

          {sucessoMsg ? (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 flex items-center gap-2 text-sm font-bold">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Avaliação publicada com sucesso! Obrigado pelo feedback.</span>
            </div>
          ) : (
            <>
              {/* Estrelas Interativas */}
              <div>
                <label className="block text-xs font-bold text-[#3E2512] mb-1.5">
                  Sua Nota (1 a 5 estrelas)
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNota(star)}
                      onMouseEnter={() => setHoverNota(star)}
                      onMouseLeave={() => setHoverNota(0)}
                      className="p-1 text-2xl transition-transform hover:scale-110"
                    >
                      <span className={
                        (hoverNota || nota) >= star ? 'text-[#E5A823]' : 'text-stone-300'
                      }>
                        ★
                      </span>
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-[#7A561D]">
                    {nota === 5 ? 'Excelente!' : nota === 4 ? 'Muito Bom' : nota === 3 ? 'Bom' : 'Regular'}
                  </span>
                </div>
              </div>

              {/* Nome e Curso/Vínculo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#3E2512] mb-1">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder="Ex.: Thiago Nomura"
                    className="w-full bg-[#FAF6EF] border border-[#E0D3C1] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#3E2512] focus:outline-hidden focus:ring-2 focus:ring-[#DE9E1E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3E2512] mb-1">
                    Curso ou Vínculo (Opcional)
                  </label>
                  <input
                    type="text"
                    value={curso}
                    onChange={e => setCurso(e.target.value)}
                    placeholder="Ex.: Ciência da Computação • UNESP"
                    className="w-full bg-[#FAF6EF] border border-[#E0D3C1] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#3E2512] focus:outline-hidden focus:ring-2 focus:ring-[#DE9E1E]"
                  />
                </div>
              </div>

              {/* Lanche que personalizou */}
              <div>
                <label className="block text-xs font-bold text-[#3E2512] mb-1">
                  Lanche que você personalizou (Opcional)
                </label>
                <input
                  type="text"
                  value={lancheFavorito}
                  onChange={e => setLancheFavorito(e.target.value)}
                  placeholder="Ex.: Pão Francês com Frango, Canastra e Maionese Verde"
                  className="w-full bg-[#FAF6EF] border border-[#E0D3C1] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#3E2512] focus:outline-hidden focus:ring-2 focus:ring-[#DE9E1E]"
                />
              </div>

              {/* Comentário */}
              <div>
                <label className="block text-xs font-bold text-[#3E2512] mb-1">
                  Seu Comentário sincero *
                </label>
                <textarea
                  required
                  rows={3}
                  value={comentario}
                  onChange={e => setComentario(e.target.value)}
                  placeholder="Conte como foi o pão, o ponto na chapa, a agilidade do atendimento..."
                  className="w-full bg-[#FAF6EF] border border-[#E0D3C1] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#3E2512] focus:outline-hidden focus:ring-2 focus:ring-[#DE9E1E] resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E0D3C1] text-xs font-bold text-[#75604C] hover:bg-stone-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#E5A823] hover:bg-[#D99A16] text-[#3B220B] text-xs font-bold shadow-xs"
                >
                  Publicar Avaliação
                </button>
              </div>
            </>
          )}
        </form>
      )}

      {/* Lista de Reviews */}
      <div className="space-y-3.5">
        {padariaReviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#EADBCA] text-[#75604C]">
            <MessageSquare className="w-8 h-8 text-[#DE9E1E] mx-auto mb-2 opacity-70" />
            <p className="font-bold text-[#3E2512]">Nenhuma avaliação ainda para esta padaria.</p>
            <p className="text-xs mt-1">Seja o primeiro a avaliar e compartilhar sua experiência!</p>
          </div>
        ) : (
          padariaReviews.map(rev => (
            <div 
              key={rev.id}
              className="bg-white rounded-2xl p-5 border border-[#EADBCA] shadow-2xs space-y-2.5 hover:border-[#DE9E1E] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FAF6EF] border border-[#E0D3C1] flex items-center justify-center font-bold text-[#4A2F17] text-sm">
                    {rev.autorNome.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#3E2512] leading-none">
                      {rev.autorNome}
                    </h5>
                    <span className="text-[11px] text-[#75604C]">
                      {rev.autorCargoOuCurso}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center text-[#E5A823] text-sm">
                    {'★'.repeat(rev.nota)}
                    <span className="text-stone-300">{'★'.repeat(5 - rev.nota)}</span>
                  </div>
                  <span className="text-[10px] text-[#9E8B7A] mt-0.5">{rev.data}</span>
                </div>
              </div>

              {rev.lancheFavorito && (
                <div className="inline-block bg-[#FAF6EF] text-[#7A561D] text-[11px] font-semibold px-2.5 py-1 rounded-md border border-[#EADBCA]">
                  🥪 Pediu: {rev.lancheFavorito}
                </div>
              )}

              <p className="text-xs sm:text-sm text-[#4A3828] leading-relaxed">
                "{rev.comentario}"
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
