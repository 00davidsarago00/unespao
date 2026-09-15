export type UserRole = 'cliente' | 'atendente';

export type ClientChannel = 'totem_qrcode' | 'totem_anonimo' | 'app_mobile';

export type BaseCategory = 'Pão Artesanal' | 'Base Leve' | 'Massa Especial';

export type IngredientCategory = 
  | 'Recheio / Proteína' 
  | 'Queijo' 
  | 'Salada / Vegetal' 
  | 'Molho Artesanal' 
  | 'Crocante & Toque Final';

export interface ReviewOnline {
  id: string;
  autorNome: string;
  autorCargoOuCurso: string;
  nota: number; // 1 a 5
  data: string;
  comentario: string;
  lancheFavorito?: string;
}

export interface ProdutoBase {
  id: string;
  nome: string;
  categoria: BaseCategory;
  descricao: string;
  precoBase: number;
  estoque: number;
  unidade: string;
  icone: string;
  calorias: number;
  ingredientesInclusos?: string[]; // Itens que já vêm e podem ser removidos (estilo iFood)
}

export interface Ingrediente {
  id: string;
  nome: string;
  categoria: IngredientCategory;
  descricao: string;
  precoUnitario: number;
  estoque: number;
  unidade: string;
  icone: string;
  isVegetariano?: boolean;
}

export interface ItemPersonalizado {
  id: string;
  produtoBase: ProdutoBase;
  ingredientes: Ingrediente[]; // Adicionados
  ingredientesRemovidos?: string[]; // Removidos (ex: sem manteiga, sem cebola)
  observacoes?: string;
  quantidade: number;
  precoTotal: number;
}

export type OrderStatus =
  | 'aberto'
  | 'confirmado'
  | 'pagamento_recusado'
  | 'cancelado';

export type PaymentMethod = 'pix' | 'cartao_credito' | 'cartao_debito' | 'balcao';

export interface AvaliacaoPrato {
  id: string;
  pedidoId: string;
  clienteNome: string;
  nota: number; // 1 a 5
  comentario: string;
  dataHora: string;
}

export interface Pedido {
  id: string;
  codigo: string; // Ex: UNESPAO-104
  canal: ClientChannel;
  clienteNome: string;
  clienteEmail?: string;
  itens: ItemPersonalizado[];
  valorTotal: number;
  status: OrderStatus;
  metodoPagamento?: PaymentMethod;
  criadoEm: string;
  tempoEstimadoMin: number;
  avaliacao?: AvaliacaoPrato;
}

export interface SugestaoPersonalizada {
  id: string;
  titulo: string;
  motivo: string;
  produtoBaseId: string;
  ingredientesIds: string[];
  precoEstimado: number;
  popularidade: number;
}

export interface DocChapter {
  id: string;
  numero: string;
  titulo: string;
  arquivo: string;
  descricao: string;
  conteudo: string;
}

export interface ArchitectureDiagram {
  id: string;
  titulo: string;
  nivel: string;
  arquivo: string;
  descricao: string;
  conceitosSolid: string[];
}
