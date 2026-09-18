/* ============================================================================
 * ELIZA_PTBR_RULES — base de regras em português para a demo da ELIZA.
 *
 * ESTE ARQUIVO É UMA RECONSTRUÇÃO. O `eliza-rules.js` original do grupo não
 * veio junto com o index.html; esta versão foi escrita a partir da interface
 * que o index.html consome, para que a demo volte a rodar. Se o arquivo
 * original aparecer, basta substituir este — nada mais precisa mudar.
 *
 * Estrutura esperada pelo index.html:
 *   initialMessages  string[]   saudações de abertura, em rodízio
 *   pre              [RegExp,string][]  normalização antes do casamento
 *   synonymSets      { NOME: string[] }
 *   reflections      { PALAVRA: TROCA }  inversão de pessoa do DOCTOR
 *   memoryTemplates  string[]   usam $1, sem reflexão
 *   fallbacks        string[]   quando nenhuma regra casa
 *   rules            Rule[]
 *
 * Rule    = { id, priority, keywords[], patterns[] }
 * Pattern = { parts[], responses[], memorySlot?, memoryPrefix? }
 * Part    = { type:"word", value } | { type:"any" } | { type:"one" }
 *         | { type:"synonym", name }
 *
 * ATENÇÃO AO ÍNDICE DAS CAPTURAS: o motor empilha uma captura por parte,
 * inclusive para as partes literais. Em [any, EU, ESTOU, any] as capturas
 * são $1=texto antes, $2="EU", $3="ESTOU", $4=texto depois. Por isso os
 * templates abaixo usam o índice da ÚLTIMA parte, não $1.
 *
 * A prioridade decide qual regra tenta primeiro: maior vence.
 * ========================================================================= */
(function (global) {
  "use strict";

  var ANY = { type: "any" };
  var ONE = { type: "one" };
  function w(value) { return { type: "word", value: value }; }
  function syn(name) { return { type: "synonym", name: name }; }

  global.ELIZA_PTBR_RULES = {

    initialMessages: [
      "Olá. Conte-me o que está incomodando você.",
      "Boa tarde. Como você está se sentindo hoje?",
      "Pois não. Do que você gostaria de falar?"
    ],

    /* Roda sobre o texto original, antes de virar maiúsculas: os padrões
     * precisam ser case-insensitive. */
    pre: [
      [/\bvc\b/gi, "você"],
      [/\bvcs\b/gi, "vocês"],
      [/\bq\b/gi, "que"],
      [/\bpq\b/gi, "por que"],
      [/\btb\b/gi, "também"],
      [/\bt[oôóÔÓ]\b/gi, "estou"],
      [/\bt[aâáÂÁ]\b/gi, "está"],
      [/\bnao\b/gi, "não"],
      [/\beh\b/gi, "é"]
    ],

    synonymSets: {
      FAMILIA: ["MÃE", "MAMÃE", "PAI", "PAPAI", "IRMÃO", "IRMÃ", "FILHO",
                "FILHA", "MARIDO", "ESPOSA", "FAMÍLIA", "AVÓ", "AVÔ"],
      SENTIMENTO: ["TRISTE", "FELIZ", "PREOCUPADO", "PREOCUPADA", "CANSADO",
                   "CANSADA", "ANSIOSO", "ANSIOSA", "IRRITADO", "IRRITADA",
                   "PERDIDO", "PERDIDA", "SOZINHO", "SOZINHA"],
      MAQUINA: ["COMPUTADOR", "COMPUTADORES", "MÁQUINA", "MÁQUINAS", "ROBÔ",
                "ROBÔS", "PROGRAMA", "SISTEMA", "IA", "ALGORITMO"]
    },

    /* A inversão de pessoa. O index.html reordena "VOCÊ FEZ" para "FEZ VOCÊ"
     * depois desta troca, então ME -> VOCÊ é seguro aqui. */
    reflections: {
      "EU": "VOCÊ", "MIM": "VOCÊ", "ME": "VOCÊ", "COMIGO": "COM VOCÊ",
      "MEU": "SEU", "MINHA": "SUA", "MEUS": "SEUS", "MINHAS": "SUAS",
      "VOCÊ": "EU", "TE": "ME", "TI": "MIM", "CONTIGO": "COMIGO",
      "TEU": "MEU", "TUA": "MINHA", "TEUS": "MEUS", "TUAS": "MINHAS",
      "SEU": "MEU", "SUA": "MINHA", "SEUS": "MEUS", "SUAS": "MINHAS",
      "SOU": "É", "ESTOU": "ESTÁ", "TENHO": "TEM", "FUI": "FOI",
      "É": "SOU", "ESTÁ": "ESTOU", "TEM": "TENHO", "FOI": "FUI",
      "ESTAVA": "ESTAVA", "ERA": "ERA"
    },

    memoryTemplates: [
      "VAMOS VOLTAR UM POUCO. ANTES VOCÊ FALOU DE $1.",
      "ISSO TEM ALGUMA RELAÇÃO COM $1?",
      "E QUANTO A $1, QUE VOCÊ MENCIONOU ANTES?"
    ],

    fallbacks: [
      "POR FAVOR, CONTINUE.",
      "O QUE ISSO SUGERE PARA VOCÊ?",
      "VOCÊ PODE ELABORAR UM POUCO MAIS?",
      "ENTENDO. E O QUE MAIS?",
      "ISSO É INTERESSANTE. POR QUÊ?",
      "COMO VOCÊ SE SENTE A RESPEITO DISSO?"
    ],

    rules: [

      /* ---- MEMORY: o id "my" é lido pelo motor para alimentar a pilha ---- */
      {
        id: "my",
        priority: 10,
        keywords: ["meu", "minha", "meus", "minhas"],
        patterns: [
          {
            parts: [ANY, w("MEU"), ONE, ANY],
            memorySlot: 3,
            memoryPrefix: "SEU",
            responses: [
              "POR QUE SEU $3 É IMPORTANTE PARA VOCÊ?",
              "CONTE-ME MAIS SOBRE SEU $3.",
              "O QUE SEU $3 REPRESENTA NESSA HISTÓRIA?"
            ]
          },
          {
            parts: [ANY, w("MINHA"), ONE, ANY],
            memorySlot: 3,
            memoryPrefix: "SUA",
            responses: [
              "POR QUE SUA $3 É IMPORTANTE PARA VOCÊ?",
              "CONTE-ME MAIS SOBRE SUA $3.",
              "O QUE SUA $3 MUDA PARA VOCÊ?"
            ]
          }
        ]
      },

      /* ---- estado: o caso do slide ---- */
      {
        id: "eu-estou",
        priority: 9,
        keywords: ["eu estou", "eu sou", "estou", "sou"],
        patterns: [
          {
            parts: [ANY, w("EU"), w("ESTOU"), ANY],
            responses: [
              "POR QUE VOCÊ ESTÁ $4?",
              "HÁ QUANTO TEMPO VOCÊ ESTÁ $4?",
              "COMO É PARA VOCÊ ESTAR $4?"
            ]
          },
          {
            parts: [ANY, w("EU"), w("SOU"), ANY],
            responses: [
              "POR QUE VOCÊ DIZ QUE É $4?",
              "VOCÊ SEMPRE FOI $4?",
              "O QUE MUDARIA SE VOCÊ NÃO FOSSE $4?"
            ]
          },
          {
            parts: [ANY, w("ESTOU"), ANY],
            responses: [
              "POR QUE VOCÊ ESTÁ $3?",
              "HÁ QUANTO TEMPO ISSO ACONTECE?"
            ]
          }
        ]
      },

      /* ---- desejo ---- */
      {
        id: "eu-quero",
        priority: 8,
        keywords: ["eu quero", "quero", "eu preciso", "preciso", "gostaria"],
        patterns: [
          {
            parts: [ANY, w("EU"), w("QUERO"), ANY],
            responses: [
              "O QUE SIGNIFICARIA PARA VOCÊ CONSEGUIR $4?",
              "POR QUE VOCÊ QUER $4?",
              "O QUE IMPEDE VOCÊ DE $4?"
            ]
          },
          {
            parts: [ANY, w("PRECISO"), ANY],
            responses: [
              "O QUE ACONTECERIA SE VOCÊ NÃO $3?",
              "POR QUE VOCÊ PRECISA $3?"
            ]
          }
        ]
      },

      /* ---- crença ---- */
      {
        id: "eu-acho",
        priority: 7,
        keywords: ["eu acho", "acho que", "eu penso", "acredito"],
        patterns: [
          {
            parts: [ANY, w("ACHO"), w("QUE"), ANY],
            responses: [
              "VOCÊ REALMENTE ACHA QUE $4?",
              "O QUE FAZ VOCÊ ACHAR QUE $4?",
              "E SE NÃO $4?"
            ]
          }
        ]
      },

      /* ---- a máquina, que fecha o gancho com o seminário ---- */
      {
        id: "maquina",
        priority: 7,
        keywords: ["computador", "computadores", "máquina", "máquinas",
                   "robô", "robôs", "programa", "programas", "sistema",
                   "sistemas", "ia", "algoritmo", "algoritmos"],
        patterns: [
          {
            parts: [ANY, syn("MAQUINA"), ANY],
            responses: [
              "VOCÊ ACHA QUE MÁQUINAS PODEM AJUDAR NISSO?",
              "POR QUE VOCÊ MENCIONA MÁQUINAS AGORA?",
              "O QUE MÁQUINAS TÊM A VER COM O QUE VOCÊ SENTE?"
            ]
          }
        ]
      },

      /* ---- família ---- */
      {
        id: "familia",
        priority: 7,
        keywords: ["mãe", "pai", "irmão", "irmã", "família", "filho", "filha",
                   "marido", "esposa"],
        patterns: [
          {
            parts: [ANY, syn("FAMILIA"), ANY],
            responses: [
              "CONTE-ME MAIS SOBRE SUA FAMÍLIA.",
              "COMO VOCÊ SE DÁ COM SUA FAMÍLIA?",
              "QUEM MAIS NA SUA FAMÍLIA PENSA ASSIM?"
            ]
          }
        ]
      },

      /* ---- sentimento nomeado ---- */
      {
        id: "sentimento",
        priority: 6,
        keywords: ["triste", "feliz", "preocupado", "cansado", "ansioso",
                   "irritado", "perdido", "sozinho"],
        patterns: [
          {
            parts: [ANY, syn("SENTIMENTO"), ANY],
            responses: [
              "O QUE FAZ VOCÊ SE SENTIR ASSIM?",
              "ISSO ACONTECE COM FREQUÊNCIA?",
              "HÁ QUANTO TEMPO VOCÊ SE SENTE ASSIM?"
            ]
          }
        ]
      },

      /* ---- você (vira a pergunta de volta) ---- */
      {
        id: "voce",
        priority: 6,
        keywords: ["você é", "você está", "você acha"],
        patterns: [
          {
            parts: [ANY, w("VOCÊ"), w("É"), ANY],
            responses: [
              "POR QUE VOCÊ ACHA QUE EU SOU $4?",
              "ISSO IMPORTA PARA VOCÊ, QUE EU SEJA $4?"
            ]
          },
          {
            parts: [ANY, w("VOCÊ"), w("ESTÁ"), ANY],
            responses: [
              "NÃO VAMOS FALAR DE MIM. POR QUE VOCÊ DIZ ISSO?",
              "POR QUE ISSO IMPORTA AGORA?"
            ]
          },
          {
            parts: [ANY, w("VOCÊ"), w("ACHA"), w("QUE"), ANY],
            responses: [
              "NÃO IMPORTA O QUE EU ACHO. VOCÊ ACHA QUE $5?",
              "POR QUE ISSO É IMPORTANTE PARA VOCÊ, SE $5?"
            ]
          }
        ]
      },

      /* ---- causalidade ---- */
      {
        id: "porque",
        priority: 5,
        keywords: ["por que", "porque", "porquê"],
        patterns: [
          {
            parts: [ANY],
            responses: [
              "VOCÊ ACHA QUE SABE A RESPOSTA?",
              "POR QUE ISSO INTERESSA A VOCÊ AGORA?",
              "O QUE VOCÊ IMAGINA COMO EXPLICAÇÃO?"
            ]
          }
        ]
      },

      /* ---- generalização ---- */
      {
        id: "sempre",
        priority: 5,
        keywords: ["sempre", "nunca", "todo mundo", "ninguém"],
        patterns: [
          {
            parts: [ANY],
            responses: [
              "PODE ME DAR UM EXEMPLO CONCRETO?",
              "SEMPRE MESMO? CONSEGUE PENSAR EM UMA EXCEÇÃO?",
              "EM QUE SITUAÇÃO ISSO FICOU MAIS CLARO?"
            ]
          }
        ]
      },

      /* ---- negação e afirmação ---- */
      {
        id: "nao",
        priority: 4,
        keywords: ["não"],
        patterns: [
          {
            parts: [ANY],
            responses: [
              "POR QUE NÃO?",
              "VOCÊ ESTÁ SENDO UM POUCO NEGATIVO.",
              "O QUE TORNARIA ISSO POSSÍVEL?"
            ]
          }
        ]
      },
      {
        id: "sim",
        priority: 3,
        keywords: ["sim", "claro", "exato"],
        patterns: [
          {
            parts: [ANY],
            responses: [
              "TEM CERTEZA?",
              "ENTENDO. CONTINUE.",
              "O QUE ISSO CONFIRMA PARA VOCÊ?"
            ]
          }
        ]
      },

      /* ---- cortesia ---- */
      {
        id: "desculpa",
        priority: 3,
        keywords: ["desculpa", "desculpe", "perdão", "perdoe"],
        patterns: [
          {
            parts: [ANY],
            responses: [
              "NÃO PRECISA SE DESCULPAR.",
              "POR QUE VOCÊ ACHA QUE PRECISA SE DESCULPAR?"
            ]
          }
        ]
      },
      {
        id: "ola",
        priority: 2,
        keywords: ["olá", "oi", "bom dia", "boa tarde", "boa noite"],
        patterns: [
          {
            parts: [ANY],
            responses: [
              "OLÁ. O QUE TROUXE VOCÊ AQUI HOJE?",
              "OLÁ. POR ONDE VOCÊ GOSTARIA DE COMEÇAR?"
            ]
          }
        ]
      }
    ]
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
