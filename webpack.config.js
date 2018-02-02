/* global __dirname, require, module */

const LIB_NAME = 'vDragDrop';

const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env;

const plugins = [];
let outputFile;
if (env === 'build') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
    outputFile = LIB_NAME + '.min.js';
}
else {
    outputFile = LIB_NAME + '.js';
}

const config = {
    entry: [path.resolve(__dirname, 'src/index.js')],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: outputFile,
        library: LIB_NAME,
        libraryTarget: 'umd',
        umdNamedDefine: true
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
        extensions: ['.json', '.js'],
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    plugins
};

module.exports = config;