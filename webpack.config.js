const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + "/dist",
    filename: "js/[name].bundle.js",
    // publicPath: "http://goddancer.com/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          "presets": ['env']
        }
      },
      {
        test: /\.html/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
      title: 'webpack is awesome',
      /*chunks: ['main', 'a'],
      date: new Date(),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      }*/
    })
  ]
};