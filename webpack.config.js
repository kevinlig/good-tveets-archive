const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        app: './web/src/main.js'
    },
    output: {
        path: path.resolve(__dirname),
        publicPath: '',
        filename: './web/dist/js/app.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve(__dirname, './web/src/js'),
            path.resolve(__dirname, './node_modules'),
            path.resolve(__dirname, './web/src/scss')
        ],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: path.resolve(__dirname, './cache'),
                    compact: true
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: ['./web/src/scss']
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'web/dist/css/style.css',
            allChunks: true
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname),
        host: '0.0.0.0', // this allows VMs to access the server
        port: 3005,
        disableHostCheck: true
    }
};