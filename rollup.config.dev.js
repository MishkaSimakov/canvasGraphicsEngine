import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {

    //  Our games entry point (edit as required)
    input: [
        './src/index.ts'
    ],

    //  Where the build file is to be generated.
    //  Most games being built for distribution can use iife as the module type.
    //  You can also use 'umd' if you need to ingest your game into another system.
    //  The 'intro' property can be removed if using Phaser 3.21 or above. Keep it for earlier versions.
    output: {
        file: './dist/index.js',
        name: 'graphicsEngine',
        format: 'iife',
        sourcemap: true,
    },

    plugins: [
        //  Parse our .ts source files
        resolve({
            extensions: [ '.ts', '.tsx' ],
            browser: true
        }),

        //  See https://www.npmjs.com/package/rollup-plugin-typescript2 for config options
        typescript({
            include: [
                './**/*.ts+(|x)',
            ]
        }),
    ]
};
