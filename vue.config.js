// vue.config.js
// const path = require("path");
// const webpack = require("webpack");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  publicPath: "/boss-web/",
  outputDir: "dist",
  assetsDir: "static",
  filenameHashing: true,

  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,

  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],

  // 生产环境 sourceMap
  productionSourceMap: false,

  configureWebpack: {
    resolve: {
      alias: {
        // "@": path.resolve(__dirname, "./src"),
        // "@boss": path.resolve(__dirname, "./src/pages/boss-web"),
        // "@core": path.resolve(__dirname, "./src/pages/core-web"),
        // "@worker": path.resolve(__dirname, "./src/pages/worker-web"),
        // vue$: "vue/dist/vue.esm.js"
      }
    },
    plugins: [
    //   new webpack.ProvidePlugin({
    //     axios: "axios"
    //   }),
    //   new CopyWebpackPlugin([
    //     {
    //       from: path.resolve(__dirname, "./data"),
    //       to: path.resolve(__dirname, "./dist/data/")
    //     },
    //     {
    //       from: path.resolve(__dirname, "./static"),
    //       to: path.resolve(__dirname, "./dist/static")
    //     }
    //   ])
    ]
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 8081,
    https: false,
    hotOnly: false,
    disableHostCheck: true
  },
};
