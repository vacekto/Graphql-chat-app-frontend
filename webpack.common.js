const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.svg$/, use: 'svg-url-loader' }
    ]
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html"
    })
  ]
}