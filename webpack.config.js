const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + "/dist",
    filename: "js/[name].bundle.js",
    // publicPath: "http://goddancer.com/"
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