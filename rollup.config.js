import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
const postcss = require('rollup-plugin-postcss');
const less = require('less');

export default {
  input: 'src/index.tsx',
  external: ['react'],
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    plugins: [getBabelOutputPlugin({ presets: ['@babel/preset-env'] })],
  },
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      minimize: true,
      modules: true,
      extract: false,
    }),
    typescript({ jsx: 'preserve', tsconfig: './tsconfig.json', declaration: true, declarationDir: './' }),
    babel({
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
    }),
  ],
};
