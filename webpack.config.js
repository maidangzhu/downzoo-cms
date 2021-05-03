const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.jsx', // 入口文件
  output: { // 输出文件
    path: path.resolve(__dirname, 'dist'), // 打包的文件最后放到什么位置
    publicPath: '/dist/',
    filename: 'js/app.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.less', '.scss'], // 这些扩展名可以省略
    alias: { // 设置路径别名
      '@': path.join(__dirname, './src'),
      page: path.resolve(__dirname, 'src/page'),
      component: path.resolve(__dirname, 'src/component'),
      util: path.resolve(__dirname, 'src/util'),
      service: path.resolve(__dirname, 'src/service')
    }
  },
  module: {
    rules: [
      // 解析jsx的配置
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/, // 排除node_modules，提高编译效率
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      // css的配置
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // sass的配置
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      // 图片的配置
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            },
          },
        ],
      },
      // 字体图标的配置
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            },
          },
        ],
      },
    ]
  },
  plugins: [
    // 处理html文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // favicon: './favicon.ico'
    }),
    // 独立css文件
    new ExtractTextPlugin("css/[name].css"),
    // 提出公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    })
  ],
  devServer: {
    port: 8086,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/manage': { // 伪装成用target这个地址发送的请求
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      },
      '/user/logout.do': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      }
    }
  },
};
