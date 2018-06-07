const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const loaders = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        },
        {
            test: /\.html$/,
            exclude: /index\.html$/, //without this HtmlWebPackPlugin will not work with template file correctly
            use: [
                {
                    loader: "html-loader",
                    options: { minimize: true }
                }
            ]
        },
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                { loader: 'css-loader', options: { importLoaders: 1 } },
                {
                    loader: 'postcss-loader', options: {
                        sourceMap: true,
                        ident: 'postcss',
                        plugins: () => [
                            postcssPresetEnv(/* options */)
                        ]
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },
        {
            test: /\.(eot|woff|ttf)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }
        },
        {
            test: /\.(jpg|png)$/,
            use: {
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: 'img/'
                }
            }
        }
    ]
}

module.exports = loaders;