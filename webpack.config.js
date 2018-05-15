const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: __dirname,
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
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: "babel-loader",
        options: {
          "presets": ['env']
        }
      },
      {
        test: /\.html/,
        loader: "html-loader"
      },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            indent: 'postcss',
            plugins: (loader) => [
              require('postcss-import')({root: loader.resourcePath}),
              require('autoprefixer')({
                broswers: ['last 5 versions']
              })
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs',
      title: 'loader is awesome'
    })
  ]
};