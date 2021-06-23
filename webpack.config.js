const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },

    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080,
        open: true
    },

    module: {
        rules: [ // rules — это массив правил, добавим в него объект правил для бабеля
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: 'babel-loader',
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            },
            // добавили правило для обработки файлов
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            //  правило для обработки СSS-файлов
            {
                test: /\.css$/,
                // при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader и css-loader
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    // добавляем объект options
                    options: { importLoaders: 1 }
                },
                // добавляем postcss-loader
                'postcss-loader']
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ]
}