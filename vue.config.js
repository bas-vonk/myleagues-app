module.exports = {
  devServer: {
    host: "0.0.0.0",
    hot: true,
    disableHostCheck: true,
    https: false,
  },
  configureWebpack: {
    output: {
      filename: "js/[name]-[hash].js",
    },
  },
};
