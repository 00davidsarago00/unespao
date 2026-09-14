import React from 'react';

// Tokenizador leve por regex — sem dependência externa (nenhuma lib de syntax
// highlighting está instalada no projeto). Cobre apenas o vocabulário necessário
// para os trechos reais de C# e TypeScript citados em docs/03 e docs/05.

const KEYWORDS_CSHARP = [
  'public', 'private', 'protected', 'internal', 'readonly', 'class', 'interface',
  'void', 'return', 'new', 'this', 'using', 'namespace', 'static', 'async', 'await',
  'var', 'true', 'false', 'null', 'if', 'else', 'throw', 'get', 'set',
];

const KEYWORDS_TS = [
  'import', 'export', 'const', 'let', 'var', 'function', 'async', 'await', 'return',
  'from', 'interface', 'type', 'new', 'this', 'true', 'false', 'null', 'undefined',
  'if', 'else', 'for', 'of', 'in',
];

type Token = { text: string; className: string };

function tokenizeLine(line: string, keywords: string[]): Token[] {
  const pattern = new RegExp(
    [
      `(//.*$)`,                          // comentário de linha
      `("(?:[^"\\\\]|\\\\.)*")`,           // string entre aspas duplas
      `(\\b\\d+(?:\\.\\d+)?m?\\b)`,        // número (com sufixo decimal C# 'm')
      `(\\b[A-Z][A-Za-z0-9_]*\\b)`,        // Identificador com maiúscula inicial (tipo/classe)
      `(\\b(?:${keywords.join('|')})\\b)`, // palavra-chave
    ].join('|'),
    'g'
  );

  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), className: '' });
    }
    const [full, comment, str, num, typeIdent, keyword] = match;
    if (comment) tokens.push({ text: comment, className: 'text-emerald-600/80 italic' });
    else if (str) tokens.push({ text: str, className: 'text-amber-700' });
    else if (num) tokens.push({ text: num, className: 'text-sky-700' });
    else if (typeIdent) tokens.push({ text: typeIdent, className: 'text-[#8B4A9C] font-semibold' });
    else if (keyword) tokens.push({ text: keyword, className: 'text-[#B5541B] font-semibold' });
    lastIndex = match.index + full.length;
  }
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), className: '' });
  }
  return tokens;
}

interface CodeHighlighterProps {
  codigo: string;
  linguagem: 'csharp' | 'typescript';
  linhasDestaque?: [number, number];
}

export const CodeHighlighter: React.FC<CodeHighlighterProps> = ({ codigo, linguagem, linhasDestaque }) => {
  const keywords = linguagem === 'csharp' ? KEYWORDS_CSHARP : KEYWORDS_TS;
  const linhas = codigo.replace(/^\n/, '').replace(/\n$/, '').split('\n');

  return (
    <pre className="font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto">
      {linhas.map((linha, idx) => {
        const numero = idx + 1;
        const emDestaque = linhasDestaque && numero >= linhasDestaque[0] && numero <= linhasDestaque[1];
        return (
          <div
            key={idx}
            className={`flex gap-3 px-3 ${emDestaque ? 'bg-[#DE9E1E]/15 border-l-2 border-[#DE9E1E]' : 'border-l-2 border-transparent'}`}
          >
            <span className="select-none text-stone-400 w-6 text-right shrink-0">{numero}</span>
            <code className="whitespace-pre">
              {tokenizeLine(linha, keywords).map((tok, tIdx) => (
                <span key={tIdx} className={tok.className}>{tok.text}</span>
              ))}
            </code>
          </div>
        );
      })}
    </pre>
  );
};
