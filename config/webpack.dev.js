const path = require('path')
const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const webpack = require('webpack')

const config = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: path.resolve(__dirname, '../src'),
      options: {
        presets: [
          '@babel/react'
        ],
        plugins: [
          [
            '@babel/plugin-proposal-class-properties',
            {
              lose: false
            }
          ],
          ['react-hot-loader/babel']
        ]
      },
      exclude: path.resolve(__dirname, '../node_modules')
    }]
  },
  devServer: {
    host: '0.0.0.0',
    open: true,
    historyApiFallback: {
      index: '/index.html'
    },
    publicPath: '/',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://47.94.210.243:6666/',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
})

module.exports = config
