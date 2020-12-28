const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-nestjs-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

module.exports = {
    entry: ['webpack/hot/poll?100', './server/main.ts'],
    watch: process.env.NODE_ENV === 'development' ? true : false,
    target: 'node',
    externals: [
        nodeExternals({
            allowlist: ['webpack/hot/poll?100'],
        })
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'nest.tsconfig.json'
                        }
                    }
                ],
                exclude: /node_modules/
            },
        ],
    },
    mode: 'development',
    node: {
        __dirname: false,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv(),
        ...(process.env.NODE_ENV === 'development' ? [new StartServerPlugin({ name: 'server.js' })] : []),
    ],
    output: {
        path: path.join(__dirname, 'dist-server'),
        filename: 'server.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [
            new TsconfigPathsPlugin({ configFile: 'nest.tsconfig.json' })
        ]
    }
};