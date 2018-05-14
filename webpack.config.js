const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/script/main.js',
    a: './src/script/a.js',
    b: './src/script/b.js',
    c: './src/script/c.js'
  },
  output: {
    path: __dirname + "/dist",
    filename: "js/[name].js",
    publicPath: "http://goddancer.com/"
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: false,
      title: 'webpack is awesome',
      chunks: ['main', 'a'],
      date: new Date(),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      }
    }),
    new htmlWebpackPlugin({
      filename: 'a.html',
      template: 'index.html',
      title: 'this is a.html',
      chunks: ['a']
    }),
    new htmlWebpackPlugin({
      filename: 'b.html',
      template: 'index.html',
      title: 'this is b.html',
      chunks: ['b']
    }),
    new htmlWebpackPlugin({
      filename: 'c.html',
      template: 'index.html',
      title: 'this is c.html',
      excludeChunks: ['main', 'a', 'b']
    }),
    new htmlWebpackPlugin({
      filename: 'inline.html',
      template: 'inline.html',
      inject: false,
      title: 'use htmlWebpackPlugin inline',
      // chunks: ['main', 'a'],
      // date: new Date(),
      /*minify: {
        removeComments: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      }*/
    }),
  ]
};