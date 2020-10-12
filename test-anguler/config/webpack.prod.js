const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); 
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
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

  devtool: 'source-map',

  output: {

    path: helpers.root('dist'),

    filename: '[name].[chunkhash].bundle.js',

    sourceMapFilename: '[name].[chunkhash].bundle.map',

    chunkFilename: '[id].[chunkhash].chunk.js'

  },

  
  plugins: [

    new WebpackMd5Hash(),

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
    }),  

    new UglifyJsPlugin({
        compress:{
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    })

  ],

   node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

});
