const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
  entry: ["./app/root.scss", "./app/root.jsx"],
  resolve: {
    alias: {
      "components": path.resolve(__dirname, "app/components"),
      "images": path.resolve(__dirname, "app/images"),
      "utils": path.resolve(__dirname, "app/utils")
    },
    extensions: [".js", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "jkw.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, loader: "babel-loader"},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])},
      {test: /\.(jpg|gif|png)$/, loader: "file-loader", options: {name:"./images/[name].[hash].[ext]"}}
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html"
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: ["app/css"]
        }
      }
    }),
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: true
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
