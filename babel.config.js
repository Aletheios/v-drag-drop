module.exports = { // eslint-disable-line
    presets: [
        ['@babel/preset-env', {
            targets: '> 0.25%, not dead',
            modules: 'umd'
        }]
    ],
    plugins: ['add-module-exports']
};