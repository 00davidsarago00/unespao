/// <reference types="vite/client" />

declare module '*?raw' {
  const content: string;
  export default content;
}

declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.tex' {
  const content: string;
  export default content;
}

declare module '*.bib' {
  const content: string;
  export default content;
}
