## webpack4.X打包配置
### 1、配置webpack4.X环境
[参考帖子](https://blog.csdn.net/u012443286/article/details/79504289)
#### webpack全局环境安装
```
npm install webpack -g // 需要全局安装webpack
npm install webpack-cli -g // 需要全局安装webpack脚手架
```
#### css解析器及执行器
```
npm install css-loader --save // require css需要解析器css-loader
npm install style-loader --save // 将css-loader解析的css新建style标签插入页面
```
此时可以采用如下方式置顶单文件的解析与执行
```
eg: require('style-loader!css-loader!./reset.css');
```
也可以采用如下全局命令设置开发版css文件绑定规则，自动解析与执行（必须双引号）
```
webpack --mode-development --module-bind "css=style-loader!css-loader" --watch

--watch // 自动监听
--progress // 展示百分比打包进程
--colors // 字体以彩色显示
--display-modules // 展示打包模块及loaders
--display-reasons // 展示打包模块的原因说明
```
#### 打包命令
```
webpack --mode development // 设置为开发模式/运行开发模式
webpack --mode production // 设置为生产模式/运行生产模式

// 可以在package.json的scripts中添加命令设置，用npm命令执行每次webpack打包命令
"dev": "webpack --mode development" // 生成开发板打包文件
"build": "webpack --mode production" // 生成生产版(压缩版)打包文件
```
### 2、webpack配置文件
[参考文档](https://webpack.docschina.org/concepts/)

当目录中存在webpack.config.js的时候，webpack会默认使用，或者用户自己通过--config指定想要使用的配置。
#### 最简单的webpack.config.js
```
module.exports = {
  mode: 'development', // 设置输出模式为开发版
  entry: './src/script/main.js', // 设置入口
  output: {
    path: __dirname + "/dist/js", // 出口要用绝对路径指定__dirname
    filename: "bundle.js"
  }
};
```
通过执行命令即可开始打包
```
webpack // 默认，以webpack.config.js配置为准
webpack --watch // 自动监听执行
webpack --config webpack.config.new.js // 改变配置文件
webpack --mode=development // 设置输出模式为开发版本
webpack --mode=production // 设置输出模式为生产版本
```
配置packge.json
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "webpack": "webpack --mode=development --config webpack.config.js --progress --display-modules --colors --display-reasons"
  },
```
此时可以通过npm命令执行打包
```
npm run webpack
```
#### webpack入口可以是一个数组或一个对象
```
module.exports = {
  entry: ['./src/script/main.js', './src/script/a.js'] // 两个入口会合并打包到同一个bundle.js
};

module.exports = {
  entry: {
      main: './src/script/main.js',
      a: './src/script/a.js'
    },
  output: {
      path: __dirname + "/dist/js",
      filename: "[name].js" // 多个入口文件时，需要配置输出文件名称格式，此时默认输出多个打包文件
    }
};
```
#### html-webpack-plugin插件
通过html-webpack-plugin插件可以实现将改变了名字hash的js动态插入到html文件中。返回新的html入口文件。
安装方式：
```
npm install html-webpack-plugin --save-dev
```
使用：[参考文档](https://webpack.docschina.org/concepts/plugins/)
```
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
    filename: "js/[name]-[hash].js", // 解决html生成在js目录下的问题
    publicPath: "http://goddancer.com/" // 将文件引用路径替换为域名（发布版本）
  },
  plugins: [
      new htmlWebpackPlugin({
        filename: 'index-[hash].html', // 自定义html名
        template: 'index.html', // 接受参数，以自定义html为模板
        inject: 'head', // 指定script放在页面什么位置，默认挨着body标签,false不插入
        chunks: ['main', 'a'], // 指定插入页面的chunks，entry的key
        excludeChunks: ['b', 'c'], // 指定排除插入页面的chunks
        title: 'webpack is awesome', // 模板传参，html接收：<%= htmlWebpackPlugin.options.title %>
        date: new Date(), // 可以接收任意指定参数：<%= htmlWebpackPlugin.options.date %>
        minify: { // 压缩属性
          removeComments: true, // 删除页面注释
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true, // 两者结合使用，压缩html代码间隙
        }
      }),
      new htmlWebpackPlugin({ // 多页面打包
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
      })
  ]
};
```
#### 采用inline方式插入公用js，减少页面请求
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><%= htmlWebpackPlugin.options.title %></title>
  <script type="text/javascript">
    <%= compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source() %>
  </script>
</head>
<body>
<% for(var k in htmlWebpackPlugin.files.chunks){ %>
<% if(k !== 'main'){ %>
<script type="text/javascript" src="<%= htmlWebpackPlugin.files.chunks[k].entry %>"></script>
<% }%>
<% }%>
</body>
</html>

new htmlWebpackPlugin({
  filename: 'inline.html',
  template: 'inline.html',
  inject: false,
  title: 'use htmlWebpackPlugin inline'
}),
```
### 3、loaders
[参考文档](http://babeljs.io/docs/setup/#installation)
```
module: {
    rules: [
      {
        test: /\.js$/, // 正则匹配文件
        exclude: /node_modules/, // 排除目录
        loader: "babel-loader", // 指定loader
        options: {
          "presets": ['env'] // 像loader传参，解析es2015、16、17及最新语法
        }
      },
      {
        test: /\.html/,
        loader: "html-loader" // 指定html-loader
      }
    ]
  },
```
options可以在.babelrc文件中设置
```
{
  "presets": ["env"]
}
```
或者在package.json中设置
```
"babel": {
  "presets": ["env"]
},
```
排除目录与解析目录
```
exclude: path.resolve(__dirname, 'node_modules'), // 排除。通过node内部集成path函数，解析相对路径生成绝对路径
include: path.resolve(__dirname, 'src'), // 指定
```
#### postcss-loader&postcss-import
[参考文档](https://www.npmjs.com/package/postcss-loader)
```
npm install postcss-loader --save-dev // 后处理css-loader，安装以后可以安装css的预处理插件
npm install autoprefixer --save-dev // 自动书写浏览器前缀
```

```
rules: [
  {
    test: /\.css/,
    loaders: ['style-loader', 'css-loader', { // 解析执行顺序postcss-loader->css-loader->style-loader
      loader: 'postcss-loader',
      options: {
        indent: 'postcss',
        plugins: (loader) => [
          require('postcss-import')({root: loader.resourcePath}), // 需要安装postcss-import&postcss-loader
          require('autoprefixer')({
            broswers: ['last 5 versions']
          })
        ]
      }
    }]
  }
]

npm install postcss-import postcss-loader --save-dev // postcss-import用来处理通过@import引入进来的样式
```
---
### bug&solution
#### 1、htmlWebpackPlugin与html-loader冲突
```
plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs', // 将入口文件改为ejs文件
      title: 'loader is awesome'
    })
  ]
```