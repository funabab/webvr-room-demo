const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const mode = process.env.NODE_ENV || 'development'

module.exports = {
  mode,
  entry: {
    main: './src/main.ts',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      scriptLoading: 'blocking',
      inject: 'head',
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.dirname(require.resolve('aframe-inspector')),
        publicPath: '/inspector',
      },
      {
        directory: path.join(__dirname, 'assets'),
      },
    ],
    open: false,
    port: 3000,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
      }),
      '...',
    ],
  },
  performance: {
    hints: false,
  },
}
