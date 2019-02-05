var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'sourcemaps',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    target: 'web',
    resolve: {
        modules: ['node_modules', 'src'],
        alias: {
            'resolve-from': '',
            // cosmiconfig: '',
            doiuse: '',
            globby: '',
            globjoin: '',
            multimatch: '',
            // path: '',
            fs: path.join(__dirname, 'src', 'fs.js'),
            // replace this?
            'global-modules': '',
            // import lazy can be replaced by using dynamic import/requires with webpack
            'import-lazy': path.join(__dirname, 'src', 'il.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: require('./babel.config')
                }
            }
        ]
    },
    devServer: {
        contentBase: './dist'
    },
    node: {
        console: false,
        global: true,
        process: true,
        Buffer: true,
        __filename: 'mock',
        __dirname: 'mock',
        setImmediate: true,
        path: true
        // fs: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index-template.html')
        })
    ]
};
