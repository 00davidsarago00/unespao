import { DocChapter } from '../types';

import doc01 from '../../docs/01-introducao-objetivos.md?raw';
import doc02 from '../../docs/02-arquitetura-sistema.md?raw';
import doc03 from '../../docs/03-projeto-componentes.md?raw';
import doc04 from '../../docs/04-interface-usuario.md?raw';
import doc05 from '../../docs/05-testes.md?raw';
import doc06 from '../../docs/06-gestao-configuracao.md?raw';
import doc99 from '../../docs/99-controle-versoes.md?raw';

export { default as rawTexTemplate } from '../../template-modelo-projeto-final-2026.tex?raw';
export { default as rawBibFile } from '../../refs.bib?raw';
export { default as rawClaudeGuide } from '../../CLAUDE.md?raw';

export const DOC_CHAPTERS: DocChapter[] = [
  {
    id: 'cap-01',
    numero: '01',
    titulo: 'Introdução e Objetivos',
    arquivo: 'docs/01-introducao-objetivos.md',
    descricao: 'Contexto do Sistema Unespão, escopo de produto, requisitos funcionais inferidos e objetivos de qualidade (ISO/IEC 25010).',
    conteudo: doc01
  },
  {
    id: 'cap-02',
    numero: '02',
    titulo: 'Arquitetura do Sistema',
    arquivo: 'docs/02-arquitetura-sistema.md',
    descricao: 'Clean Architecture em camadas concêntricas, Modelo C4 Níveis 1 e 2, contêineres e decisões arquiteturais consolidadas.',
    conteudo: doc02
  },
  {
    id: 'cap-03',
    numero: '03',
    titulo: 'Projeto de Componentes',
    arquivo: 'docs/03-projeto-componentes.md',
    descricao: 'C4 Nível 3, aplicação aprofundada dos 5 princípios SOLID, diagramas de sequência, padrões Repository, Adapter e Injeção de Dependência.',
    conteudo: doc03
  },
  {
    id: 'cap-04',
    numero: '04',
    titulo: 'Projeto de Interface do Usuário',
    arquivo: 'docs/04-interface-usuario.md',
    descricao: 'Canais Totem e Mobile, autenticação sem digitação de credenciais via QR Code ou Modo Anônimo, atualização incremental de preço e painel de estoque.',
    conteudo: doc04
  },
  {
    id: 'cap-05',
    numero: '05',
    titulo: 'Especificação e Estratégia de Testes',
    arquivo: 'docs/05-testes.md',
    descricao: 'Pirâmide de testes com xUnit e Moq em C# no .NET 8, isolamento de repositórios e simulação do gateway de pagamento.',
    conteudo: doc05
  },
  {
    id: 'cap-06',
    numero: '06',
    titulo: 'Gestão de Configuração e Manutenção',
    arquivo: 'docs/06-gestao-configuracao.md',
    descricao: 'Itens de configuração no GitHub, fluxo de branches e Pull Requests, rastreabilidade e pipeline sugerido de CI/CD.',
    conteudo: doc06
  },
  {
    id: 'cap-99',
    numero: '99',
    titulo: 'Controle de Versões do Documento',
    arquivo: 'docs/99-controle-versoes.md',
    descricao: 'Histórico de revisões e controle de versão dos artefatos da disciplina até a entrega final.',
    conteudo: doc99
  }
];
