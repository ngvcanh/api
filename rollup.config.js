import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const rollup = {
  input: 'src/index.ts',
  output: [
    {
      file: "./dist/index.js",
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
  ],
};

export default rollup;