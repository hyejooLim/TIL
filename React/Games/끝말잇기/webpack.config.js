const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'wordRelay-setting',
  mode: 'development', // 실서비스: production
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // 입력
  entry: {
    app: ['./client'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'], // preset: 플러그인들의 모임
          plugins: ['react-refresh/babel'], // hot reloading
        },
      },
    ],
  },
  plugins: [new RefreshWebpackPlugin()],
  // 출력
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'App.js',
    publicPath: '/dist/',
  },
  devServer: {
    publicPath: '/dist/', // 수정사항 반영 
    hot: true
  },
};
