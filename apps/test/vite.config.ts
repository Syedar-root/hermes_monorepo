import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prettier from 'vite-plugin-prettier';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prettier({
      printWidth: 60,
      semi: true,
      singleQuote: true,
      trailingComma: 'all',
      arrowParens: 'always',
      tabWidth: 2,
      jsxSingleQuote: false,
      bracketSpacing: false,
      objectWrap: 'preserve',
      bracketSameLine: false,
      rangeStart: 0,
      rangeEnd: 0,
      parser: 'acorn',
      filepath: '',
      requirePragma: false,
      insertPragma: false,
      checkIgnorePragma: false,
      proseWrap: 'always',
      plugins: [],
      htmlWhitespaceSensitivity: 'css',
      endOfLine: 'auto',
      quoteProps: 'preserve',
      vueIndentScriptAndStyle: false,
      embeddedLanguageFormatting: 'auto',
      singleAttributePerLine: false,
      experimentalOperatorPosition: 'start',
      experimentalTernaries: false,
    }),
  ],
});
