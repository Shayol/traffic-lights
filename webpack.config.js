const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const loadersConfig = require("./loaders");

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000
  },
  devtool: "source-map",
  module: loadersConfig,
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Title',
      template: "./src/html/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ]
};