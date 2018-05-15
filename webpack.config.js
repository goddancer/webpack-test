const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/app.js',
  output: {
    path: __dirname + "/dist",
    filename: "js/[name].bundle.js",
    // publicPath: "dist/"
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
        test: /\.html$/,
        loader: "html-withimg-loader"
      },
      {
        test: /\.css$/,
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
      },
      {
        test: /\.less$/,
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
        }, 'less-loader']
      },
      {
        test: /\.scss$/,
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
        }, 'sass-loader']
      },
      /*{
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        loader: 'url-loader',
        query: {
          limit: 200000,
          name: 'assets/[name]-[hash:5].[ext]'
        }
      },*/
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loaders: [
          'url-loader?limit=20000&name=assets/[name]-[hash:5].[ext]',
          'image-webpack-loader'
        ]
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