const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader",
            options: {
              minimize: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
        })
      },
      {
        test:  /\.(eot|woff|ttf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'  
          }
        }
      },
      {
        test:  /\.(jpg|png)$/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'img/'  
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};