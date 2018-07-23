const path = require('path')
const nodeExternals = require('webpack-node-externals')
const isCoverage = process.env.NODE_ENV === 'coverage';

const rootDir = path.join(__dirname, '..')

module.exports = {
  mode: 'production',
  target: 'node',
  devtool: 'inline-cheap-module-source-map',

  module: {
    rules: [].concat(
      isCoverage ? {
        test: /\.(js|ts)/,
        include: `${rootDir}/src`,
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true
        }
      } : [],
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          `${rootDir}/src`,
          `${rootDir}/test`,
        ],
        options: {
          cacheDirectory: true
        }
      }
    )
  },

  resolve: {
    alias: {
      app: `${rootDir}/src`,
      test: `${rootDir}/test`,
      dist: `${rootDir}/dist`
    },
    extensions: ['.js']
  },
  externals: [nodeExternals()]
}
