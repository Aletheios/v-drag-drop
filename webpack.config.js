/* global __dirname, require, module */

const LIB_NAME = 'vDragDrop';

const path = require('path');
const env = require('yargs').argv.env;
const TerserPlugin = require('terser-webpack-plugin');

const outputFile = LIB_NAME + (env === 'build' ? '.min.js' : '.js');

const optimization = { };
if (env === 'build') {
    optimization.optimization = {
        minimizer: [new TerserPlugin()]
    };
}

const config = {
    mode: env === 'build' ? 'production' : 'development',
    entry: [path.resolve(__dirname, 'src/index.js')],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: outputFile,
        library: LIB_NAME,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    stats: {
        warnings: false,
        modules: false,
        hash: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.js'],
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    ...optimization
};

module.exports = config;