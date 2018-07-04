const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './index.js',
  output: {
        path: path.resolve('../dist'),
        filename: 'build.js',
        library: 'vue_laravel_echo',
        libraryTarget: 'commonjs2'
      },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: [nodeExternals()]
};

// npx webpack