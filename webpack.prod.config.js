const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        index: path.resolve(__dirname, './src/index.jsx'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name].js',
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            react: 'anujs/dist/ReactIE.js',
            'react-dom': 'anujs/dist/ReactIE.js',
            'prop-types': 'anujs/lib/ReactPropTypes',
            devtools: 'anujs/lib/devtools',
            'create-react-class': 'anujs/lib/createClass',
        },
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ie8: true,
                },
                sourceMap: true,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'env',
                                {
                                    targets: {
                                        browsers: ['last 2 versions', 'ie >= 7'],
                                    },
                                    modules: 'commonjs',
                                    useBuiltIns: true,
                                    debug: false,
                                },
                            ],
                            'react',
                            'stage-2',
                        ],
                        plugins: ['transform-runtime'],
                    },
                },
                include: [path.resolve(__dirname, 'src')],
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, 'src')],
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100,
                            name: 'asset/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.ejs'),
            inject: 'body',
            hase: false,
            minify: {
                // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: false, // 删除空白符与换行符
            },
            chunks: ['index'],
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            PropTypes: 'prop-types'
        })
    ],
};
