const common = require("./webpack.common")
const merge = require("webpack-merge")
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.GRAPHQL_URL": JSON.stringify("http://localhost:3001/graphql")
    })
  ]
})