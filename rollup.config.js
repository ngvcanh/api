import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const rollup = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    },
  ],
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    })
  ],
};

export default rollup;