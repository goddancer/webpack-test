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