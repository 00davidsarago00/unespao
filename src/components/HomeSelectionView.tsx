import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ChefHat, 
  MapPin, 
  Sliders, 
  Star, 
  Bell, 
  CheckCircle2, 
  Flame, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  Presentation,
  Compass,
  Layers,
  Terminal,
  HelpCircle
} from 'lucide-react';

interface HomeSelectionViewProps {
  onSelectRole: (role: 'cliente' | 'padeiro') => void;
  onStartGuidedTour: (role?: 'cliente' | 'padeiro') => void;
  onOpenDocs?: () => void;
  pedidosPendentesCount: number;
}

export const HomeSelectionView: React.FC<HomeSelectionViewProps> = ({
  onSelectRole,
  onStartGuidedTour,
  onOpenDocs,
  pedidosPendentesCount,
}) => {
  // Estado de seleção do modo na mesma página: 'livre' ou 'guiado'
  const [selectedExperienceMode, setSelectedExperienceMode] = useState<'livre' | 'guiado'>('livre');

  return (
    <div className="w-full max-w-5xl mx-auto py-3 sm:py-6 px-2 sm:px-4">
      {/* Moldura Externa Inspirada no Design do Anexo */}
      <div 
        id="home-frame"
        className="bg-[#FAF6EF] rounded-3xl sm:rounded-[32px] border-2 border-[#EADFCF] p-5 sm:p-9 shadow-sm transition-all"
      >
        {/* Cabeçalho com Logotipo Oficial Unespão e Subtítulo Alinhado */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-56 sm:w-72 md:w-84 max-w-full flex flex-col items-center">
            <img 
              id="unespao-hero-logo"
              src="/unespao_logo.svg" 
              alt="UNESPÃO" 
              className="w-full h-auto object-contain block"
            />
            <svg 
              id="unespao-hero-subtitle"
              viewBox="0 0 367.41464 24" 
              className="w-full h-auto mt-2 select-none overflow-visible"
              aria-label="Sistema de padarias"
            >
              <text
                x="0"
                y="19"
                fill="#8C6226"
                fontWeight="bold"
                fontSize="20"
                fontFamily="'Space Grotesk', system-ui, sans-serif"
                textLength="367.41464"
                lengthAdjust="spacing"
              >
                Sistema de padarias
              </text>
            </svg>
          </div>
        </div>

        {/* SELETOR DO MODO DE VISUALIZAÇÃO COM SWITCH TOGGLE & DESCRIÇÃO */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#EADFCF] mb-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Lado Esquerdo: Descrição contextual do modo em que está */}
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                selectedExperienceMode === 'guiado'
                  ? 'bg-[#3E2512] text-[#DE9E1E]'
                  : 'bg-[#F5ECDC] text-[#7A561D]'
              }`}>
                {selectedExperienceMode === 'guiado' ? (
                  <Presentation className="w-5 h-5 font-bold" />
                ) : (
                  <Compass className="w-5 h-5 font-bold" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#9B6F26]">
                    Modo Atual:
                  </span>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                    selectedExperienceMode === 'guiado'
                      ? 'bg-[#3E2512] text-[#DE9E1E]'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {selectedExperienceMode === 'guiado' ? 'Modo Tour (Ligado)' : 'Modo Normal'}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-black text-[#3E2512] mt-0.5 font-['Space_Grotesk']">
                  {selectedExperienceMode === 'guiado'
                    ? 'Apresentação Guiada dos 8 Tópicos de Engenharia de Software II'
                    : 'Navegação Livre e Autônoma pelas Padarias do Campus'}
                </h3>
                
                <p className="text-xs text-[#75604C] mt-1 leading-relaxed max-w-2xl">
                  {selectedExperienceMode === 'guiado'
                    ? 'O modo tour conduz você passo a passo pelos 8 tópicos de ES II (C4, SOLID, GoF Adapter, pirâmide de testes e CI/CD) com holofotes interativos sobre o sistema real.'
                    : 'Acesse diretamente e sem restrições a visão do Cliente (montagem de lanches artesanais) ou a visão do Padeiro (chapa e fila de pedidos em tempo real).'}
                </p>
              </div>
            </div>

            {/* Lado Direito: Botão Switch / Toggle (Desligado = Normal, Ligado = Tour) */}
            <div className="flex items-center gap-3 sm:self-center bg-[#FAF6EF] p-2.5 sm:p-3 rounded-2xl border border-[#EADBCA] flex-shrink-0">
              <button
                id="tab-modo-livre"
                type="button"
                onClick={() => setSelectedExperienceMode('livre')}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                  selectedExperienceMode === 'livre'
                    ? 'text-[#3E2512] font-black'
                    : 'text-[#8C755E] hover:text-[#3E2512]'
                }`}
              >
                Normal
              </button>

              {/* Botão Switch Físico */}
              <button
                id="switch-modo-tour"
                type="button"
                role="switch"
                aria-checked={selectedExperienceMode === 'guiado'}
                onClick={() => setSelectedExperienceMode(prev => prev === 'guiado' ? 'livre' : 'guiado')}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#DE9E1E] focus:ring-offset-2 cursor-pointer ${
                  selectedExperienceMode === 'guiado' ? 'bg-[#3E2512]' : 'bg-[#D1B898]'
                }`}
                title={selectedExperienceMode === 'guiado' ? 'Desligar Modo Tour (ir para Modo Normal)' : 'Ligar Modo Tour'}
              >
                <span className="sr-only">Alternar modo tour</span>
                <span
                  className={`flex items-center justify-center h-6 w-6 transform rounded-full shadow-md transition-transform ${
                    selectedExperienceMode === 'guiado' ? 'translate-x-9 bg-[#DE9E1E]' : 'translate-x-1 bg-white'
                  }`}
                >
                  {selectedExperienceMode === 'guiado' ? (
                    <Sparkles className="w-3.5 h-3.5 text-[#3E2512] block shrink-0" />
                  ) : (
                    <Compass className="w-3.5 h-3.5 text-[#7A561D] block shrink-0" />
                  )}
                </span>
              </button>

              <button
                id="tab-modo-guiado"
                type="button"
                onClick={() => setSelectedExperienceMode('guiado')}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  selectedExperienceMode === 'guiado'
                    ? 'text-[#3E2512] font-black'
                    : 'text-[#8C755E] hover:text-[#3E2512]'
                }`}
              >
                <span>Tour</span>
                <span className={`w-2 h-2 rounded-full ${
                  selectedExperienceMode === 'guiado' ? 'bg-[#DE9E1E] animate-pulse' : 'bg-stone-300'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* CONTEÚDO CONDICIONAL DE ACORDO COM O MODO SELECIONADO */}
        {selectedExperienceMode === 'guiado' ? (
          /* PAINEL DO MODO GUIADO */
          <div className="bg-[#3E2512] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#2B1B10] shadow-md mb-6 transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 pb-6 border-b border-[#5C3D23]">
              <div className="flex-1">
                <span className="text-xs font-black uppercase tracking-widest text-[#DE9E1E]">
                  Trilha Didática Completa
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#FAF6EF] mt-1 font-['Space_Grotesk']">
                  Demonstração Guiada dos 8 Tópicos de ES II
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
                  Percorra pela fundamentação teórica conectada ao Unespão. Inclui pop-up interativo com os diagramas C4 oficiais, simulador do padrão Adapter de pagamentos e runner de testes xUnit.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full sm:w-auto sm:min-w-[260px] lg:w-72 flex-shrink-0">
                <button
                  id="btn-iniciar-tour-cliente"
                  onClick={() => onStartGuidedTour('cliente')}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#FAF6EF] hover:bg-white text-[#3E2512] font-bold text-sm sm:text-base flex items-center justify-between shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FAF0DC] flex items-center justify-center">
                      <ShoppingBag className="w-4.5 h-4.5 text-[#DE9E1E]" />
                    </div>
                    <span>Tour no Cliente</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9B6F26]" />
                </button>

                <button
                  id="btn-iniciar-tour-padeiro"
                  onClick={() => onStartGuidedTour('padeiro')}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#DE9E1E] hover:bg-[#CF921A] text-[#3E2512] font-bold text-sm sm:text-base flex items-center justify-between shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#3E2512] text-[#DE9E1E] flex items-center justify-center">
                      <ChefHat className="w-4.5 h-4.5 text-[#DE9E1E]" />
                    </div>
                    <span>Tour no Padeiro</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#3E2512]" />
                </button>
              </div>
            </div>

            {/* Relação dos 8 Tópicos que serão percorridos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-[#4E311A] p-3 rounded-xl border border-[#694222]">
                <span className="text-[10px] font-bold text-[#DE9E1E] block">TÓPICO 1</span>
                <h4 className="text-xs font-bold text-[#FAF6EF]">1. Introdução & Objetivos</h4>
                <p className="text-[10px] text-stone-300 mt-0.5">Escopo UNESP e ISO 25010</p>
              </div>

              <div className="bg-[#4E311A] p-3 rounded-xl border border-[#694222]">
                <span className="text-[10px] font-bold text-[#DE9E1E] block">TÓPICO 2</span>
                <h4 className="text-xs font-bold text-[#FAF6EF]">2. Arquitetura do Sistema</h4>
                <p className="text-[10px] text-stone-300 mt-0.5">Clean Arch, C4 & Pop-up</p>
              </div>

              <div className="bg-[#4E311A] p-3 rounded-xl border border-[#694222]">
                <span className="text-[10px] font-bold text-[#DE9E1E] block">TÓPICO 3</span>
                <h4 className="text-xs font-bold text-[#FAF6EF]">3. Projeto de Componentes</h4>
                <p className="text-[10px] text-stone-300 mt-0.5">Padrão GoF Adapter & Repos</p>
              </div>

              <div className="bg-[#4E311A] p-3 rounded-xl border border-[#694222]">
                <span className="text-[10px] font-bold text-[#DE9E1E] block">TÓPICO 4</span>
                <h4 className="text-xs font-bold text-[#FAF6EF]">4. Interface do Usuário</h4>
                <p className="text-[10px] text-stone-300 mt-0.5">Visão Cliente vs Padeiro</p>
              </div>

              <div className="bg-[#4E311A] p-3 rounded-xl border border-[#694222]">
                <span className="text-[10px] font-bold text-[#DE9E1E] block">TÓPICO 5</span>
                <h4 className="text-xs font-bold text-[#DE9E1E] block">5. Estratégia de Testes</h4>
                <p className="text-[10px] text-stone-300 mt-0.5">Pirâmide & xUnit com Moq</p>
              </div>

              <div className="bg-[#4E311A] p-3 rounded-xl border border-[#694222]">
                <span className="text-[10px] font-bold text-[#DE9E1E] block">TÓPICO 6</span>
                <h4 className="text-xs font-bold text-[#FAF6EF]">6. Gestão de Configuração</h4>
                <p className="text-[10px] text-stone-300 mt-0.5">GitFlow, ICs e CI/CD</p>
              </div>

              <div className="bg-[#4E311A] p-3 rounded-xl border border-[#694222]">
                <span className="text-[10px] font-bold text-[#DE9E1E] block">TÓPICO 7</span>
                <h4 className="text-xs font-bold text-[#FAF6EF]">7. Glossário e Siglas</h4>
                <p className="text-[10px] text-stone-300 mt-0.5">Dicionário Técnico</p>
              </div>

              <div className="bg-[#4E311A] p-3 rounded-xl border border-[#694222]">
                <span className="text-[10px] font-bold text-[#DE9E1E] block">TÓPICO 8</span>
                <h4 className="text-xs font-bold text-[#FAF6EF]">8. Controle de Versões</h4>
                <p className="text-[10px] text-stone-300 mt-0.5">Histórico de Entregas</p>
              </div>
            </div>
          </div>
        ) : (
          /* PAINEL DO MODO LIVRE: CARDS DE CLIENTE E PADEIRO */
          <>
            {/* Grade Dupla de Seleção: Visão do Cliente vs Visão do Padeiro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
              
              {/* Card 1: Visão do Cliente */}
              <div 
                id="card-visao-cliente"
                onClick={() => onSelectRole('cliente')}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E9DFCE] hover:border-[#DE9E1E] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-full bg-[#4A2F17] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <ShoppingBag className="w-6 h-6 text-[#E5A823]" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F5ECDC] text-[#7A561D]">
                      Para Alunos & Clientes
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#3E2512] mb-2 font-['Space_Grotesk']">
                    Visão do Cliente
                  </h2>
                  <p className="text-xs sm:text-sm text-[#75604C] mb-6 leading-relaxed">
                    Descubra padarias próximas conectadas ao Unespão, monte seus lanches adicionando ou retirando ingredientes e confira avaliações reais.
                  </p>

                  <div className="space-y-3.5 border-t border-[#F2EADB] pt-5">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#4A2F17] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#E5A823]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#3E2512]">Padarias Próximas</h4>
                        <p className="text-[11px] sm:text-xs text-[#75604C]">Veja distância, tempo de espera e taxas no campus e Bauru.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#4A2F17] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sliders className="w-3.5 h-3.5 text-[#E5A823]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#3E2512]">Personalização Estilo iFood</h4>
                        <p className="text-[11px] sm:text-xs text-[#75604C]">Remova itens inclusos e adicione proteínas, queijos e molhos.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#4A2F17] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Star className="w-3.5 h-3.5 text-[#E5A823]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#3E2512]">Reviews & Avaliações Online</h4>
                        <p className="text-[11px] sm:text-xs text-[#75604C]">Leia opiniões da comunidade e publique sua nota e review.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F2EADB]">
                  <button 
                    id="btn-entrar-cliente"
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#E5A823] hover:bg-[#D99A16] text-[#3B220B] font-bold text-sm sm:text-base shadow-xs transition-colors"
                  >
                    <span>Acessar como Cliente</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card 2: Visão do Padeiro */}
              <div 
                id="card-visao-padeiro"
                onClick={() => onSelectRole('padeiro')}
                className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#E9DFCE] hover:border-[#4A2F17] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-full bg-[#4A2F17] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      <ChefHat className="w-6 h-6 text-[#E5A823]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F5ECDC] text-[#7A561D]">
                        Para a Cozinha & Forno
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#3E2512] mb-2 font-['Space_Grotesk']">
                    Visão do Padeiro
                  </h2>
                  <p className="text-xs sm:text-sm text-[#75604C] mb-6 leading-relaxed">
                    Painel direto e objetivo para o padeiro. Visualize em tempo real os pedidos que estão chegando, veja exatamente cada personalização e despache.
                  </p>

                  <div className="space-y-3.5 border-t border-[#F2EADB] pt-5">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#4A2F17] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bell className="w-3.5 h-3.5 text-[#E5A823]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#3E2512]">Pedidos Chegando em Tempo Real</h4>
                        <p className="text-[11px] sm:text-xs text-[#75604C]">Fila limpa com senhas, horários e notificações instantâneas.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#4A2F17] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Flame className="w-3.5 h-3.5 text-[#E5A823]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#3E2512]">Destaque de Itens & Exceções</h4>
                        <p className="text-[11px] sm:text-xs text-[#75604C]">Visualização nítida de ingredientes adicionados e itens retirados.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#4A2F17] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A823]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#3E2512]">Operação Rápida em 1 Toque</h4>
                        <p className="text-[11px] sm:text-xs text-[#75604C]">Avance o status do pedido para 'Na Chapa' e 'Pronto no Balcão'.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F2EADB]">
                  <button 
                    id="btn-entrar-padeiro"
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#4A2F17] hover:bg-[#3B220B] text-white font-bold text-sm sm:text-base shadow-xs transition-colors"
                  >
                    <span>Acessar Painel do Padeiro</span>
                    <ArrowRight className="w-4 h-4 text-[#E5A823]" />
                  </button>
                </div>
              </div>

            </div>
          </>
        )}

        {/* Rodapé Limpo do Card */}
        <div className="pt-5 border-t border-[#EADBCA] flex items-center justify-center text-center text-xs text-[#75604C]">
          <p>
            <span className="font-bold text-[#3E2512]">Sistema Unespão: </span>
            <span>Conectando a tradição da padaria à praticidade da tecnologia sob demanda.</span>
          </p>
        </div>

        {/* Botão Docs C4 posicionado debaixo do texto Sistema Unespão */}
        {onOpenDocs && (
          <div className="mt-4 flex items-center justify-center">
            <button
              id="btn-home-docs-c4"
              type="button"
              onClick={onOpenDocs}
              title="Documentação de Engenharia de Software II & Diagramas C4"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E0D3C1] text-[#75604C] hover:text-[#3E2512] hover:border-[#DE9E1E] text-xs sm:text-sm font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#DE9E1E]" />
              <span>Docs C4</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
