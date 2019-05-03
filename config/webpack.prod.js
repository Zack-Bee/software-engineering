const path = require('path')
const common = require('./webpack.common.js')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = merge(common, {
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist')
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      include: path.resolve(__dirname, '../src'),
      options: {
        presets: [
          ['@babel/react'],
          ['@babel/preset-env', {
            'targets': [
              'safari >= 9',
              'ie >= 11'
            ]
          }]
        ],
        plugins: [
          ['@babel/plugin-proposal-class-properties', {
            lose: false
          }],
          ['react-hot-loader/babel']
        ]
      },
      exclude: path.resolve('node_modules')
    }]
  },
  plugins: [
    new CleanWebpackPlugin('./dist', {
      root: path.resolve(__dirname, '../')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        libs: {
          name: 'chunk-libs',
          test: /node_modules/,
          priority: 10,
          chunks: 'initial'
        },
        materialUI: {
          name: 'chunk-materialUI',
          test: /node_modules[/\\]@material-ui/,
          priority: 20
        }
      }
    }
  }
})

module.exports = config
