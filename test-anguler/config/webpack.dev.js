const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js'); 

const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const CLOUDNAME = process.env.CLOUDNAME = 'CLOUD NAME';
const CLOUDPRESET = process.env.CLOUDPRESET = 'CLOUD PRESET';

const METADATA = webpackMerge(commonConfig.metadata, {
  host: HOST,
  port: PORT,
  CLOUDNAME: CLOUDNAME,
  CLOUDPRESET: CLOUDPRESET,
  ENV: ENV
});


module.exports = webpackMerge(commonConfig, {

  devtool: 'cheap-module-eval-source-map',

  output: {

    path: helpers.root('dist'),

    filename: '[name].bundle.js',

    sourceMapFilename: '[name].map',

    chunkFilename: '[id].chunk.js'

  },

  plugins: [
   
    new DefinePlugin({
      'CLOUDNAME': JSON.stringify(METADATA.CLOUDNAME),
      'CLOUDPRESET': JSON.stringify(METADATA.CLOUDPRESET),
      'ENV': JSON.stringify(METADATA.ENV),
      'process.env': {
        'CLOUDNAME': JSON.stringify(METADATA.CLOUDNAME),
        'CLOUDPRESET': JSON.stringify(METADATA.CLOUDPRESET),
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV)
      }
    })
  ],

  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },

  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

});
