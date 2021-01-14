const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports = {
  mode: 'development', // 1
  devtool: "inline-source-map",
  resolve: {
    extensions: ['.js', 'jsx']
  },
  entry: './src/index.js', // 2 진입점
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: { browsers: ['last 2 chrome versions']},
            debug: true,
          }],
          '@babel/preset-react'
        ],
        plugins: [
          'react-refresh/babel'
        ]
      },
      exclude: path.join(__dirname, 'node_modules'),
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  plugins: [
    new RefreshWebpackPlugin()
  ],
  output: { // 3
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/'
  },

  devServer: {
    publicPath: '/dist/',
    hot: true
  }
};