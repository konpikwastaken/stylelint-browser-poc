module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                targets: {
                    ie: '11'
                }
            }
        ]
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: false,
                helpers: true,
                regenerator: true,
                useESModules: false
            }
        ]
    ]
};
