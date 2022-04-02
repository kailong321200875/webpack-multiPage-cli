// 引入合并对象插件
const { merge } = require('webpack-merge')

// 引入 path 模块
const path = require('path')

// 引入打包html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 引入静态资源复制插件
const CopyWebpackPlugin = require('copy-webpack-plugin')

// 引入基础配置文件
const baseWebpackConfig = require('./webpack.base.config')

const devWebpackConfig = merge(baseWebpackConfig, {
  // 模式，必填项
  mode: 'development',

  // 打包入口地址
  entry: {
    // 由于可能是多页，所以采用对象的形式
    index: ['./src/views/index/index.js']
  },

  output: {
    // 输出文件目录
    path: path.resolve(__dirname, '../dist'),
    // 输出文件名
    filename: 'js/[name].js',
  },

  // 开发服务配置
  devServer: {
    // 服务器 host，默认为 localhost
    host: '0.0.0.0',
    // 服务器端口号，默认 8080
    port: 7001,
    // 静态资源属性
    static: {
      // 挂载到服务器中间件的可访问虚拟地址
      // 例如设置为 /static，在访问服务器静态文件时，就需要使用 /static 前缀
      // 相当于webpack-dev-server@3.X的 contentBasePublicPath 属性
      publicPath: './',
      // 告诉服务器从哪里提供内容
      directory: path.join(__dirname, '../public')
    },
    // 需要监听的文件，由于是多页应用，无法实现热更新，所以都只能刷新页面
    watchFiles: ['src/**/*']
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/views/index/index.html'
    }),

    // 把public的一些静态文件复制到指定位置，排除 html 文件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/*.html']
          }
        }
      ]
    })
  ]
})

module.exports = devWebpackConfig