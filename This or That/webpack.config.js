var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const path = require('path');

module.exports = {
  entry: { 
    main: './public/js/app.js'
},
target: 'node',
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   // filename: 'main.js'
  //   filename: '[name].js'
  // },

  devServer: {
    historyApiFallback: true,
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  watch: true,
  devtool: false,
  // ...
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      // files: ['./dist/*.html'],
      // server: { baseDir: ['dist', 'public'] },
      server: { baseDir: ['dist', 'public'] }
    })
  ]
}