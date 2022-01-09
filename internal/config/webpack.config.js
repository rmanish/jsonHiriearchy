const path = require('path');

module.exports = {
  target: 'node',
  mode: 'development',
  devtool: 'source-map',
  externals: ['pg-hstore'],
  entry: {
    app: './internal/app.js'
  },
  output: {
    path: path.resolve(__dirname, '..', '..', 'build'),
    filename: '[name]_bundle.js',
    sourceMapFilename: '[name]_bundle.js.map',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-modules-commonjs']
        }
      }
    }]
  },
  resolve: {
    alias: {
      '@helpers': path.resolve(__dirname, '..', '..', 'internal/helpers'),
      '@appconstants': path.resolve(__dirname, '..', '..', 'internal/constant'),
      '@models': path.resolve(__dirname, '..', '..', 'models'),
      '@schema': path.resolve(__dirname, '..', '..', 'schema'),
      '@app': path.resolve(__dirname, '..', '..', 'internal/app.js'),
      "@appConfig": path.resolve(__dirname, '..', '..', 'serviceSetup'),
    }
  }
};
