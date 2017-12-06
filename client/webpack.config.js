const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// http://www.cnblogs.com/auok/p/6420843.html

module.exports = {
    // map
    devtool: 'source-map',
    // 根目录
    context: path.resolve(__dirname, './'),
    // 需要打包的文件入口
    entry: {
        index: ['babel-polyfill', './index/index.js'],
        vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router-dom', 'axios']
    },
    // 入口文件路径
    resolve: {
        alias: {
            'Public': path.resolve(__dirname, './index/public/js')
        }
    },
    // 输出
    output: {
        // path: path.resolve(__dirname, '../server/public/js'),
        // filename: 'index.bundle.js',
        // chunkFilename: '[name].[chunkhash:4].bundle.js',
        // publicPath: '/js/'
        path: path.resolve(__dirname, './build/js'),
        filename: 'index.bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: './build/js/'
    },
    // 模块处理
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|sass)$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]_[hash:base64:4]_[local]'},
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')({
                                            browsers: ['ios >= 7.0']
                                        })
                                    ];
                                }
                            }
                        },
                        {loader: 'sass-loader'},
                    ]
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]',
                options:{
                    name:'[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader')
            },
        ]
    },
    // 插件
    plugins: [
        // 定义变量，一般用于开发环境log或者全局变量
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify(process.env.NODE_ENV)}}),
        // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 多个 html共用一个js文件(chunk)
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
        // 将样式文件(css,sass,less)合并成一个css文件
        new ExtractTextPlugin({filename: '../css/index.bundle.css', allChunks: true}),
    ]
}