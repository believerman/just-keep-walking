const path = require("path");
const webpack = require("webpack");
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
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
    filename: "jkw.[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {test: /manifest.json$/, loader: "file-loader?name=manifest.json!web-app-manifest-loader"},
      {test: /\.(js|jsx)$/, loader: "babel-loader"},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])},
      {test: /\.(jpg|gif|png)$/, loader: "file-loader", options: {name:"./images/[name].[ext]"}}
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
      filename: "style.[hash].css",
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {from: "app/images", to: "images"}
    ], {
      ignore: ["*.db"]
    }),
    new OfflinePlugin()
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
