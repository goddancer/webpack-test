## webpack4.X打包配置
### 1、配置webpack4.X环境
[参考帖子](https://blog.csdn.net/u012443286/article/details/79504289)
```
npm install webpack -g // 需要全局安装webpack
npm install webpack-cli -g // 需要全局安装webpack脚手架
webpack --mode development // 设置为开发模式/运行开发模式
webpack --mode production // 设置为生产模式/运行生产模式

// 可以在package.json的scripts中添加命令设置，用npm命令执行每次webpack打包命令
"dev": "webpack --mode development" // 生成开发板打包文件
"build": "webpack --mode production" // 生成生产版(压缩版)打包文件
```