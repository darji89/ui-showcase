const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const csswring = require('csswring');

const webpackConfig = {
  entry: [
    './app.js'
  ],

  output: {
    filename: 'app.js',
    path: __dirname + '/build/',
    publicPath: './'
  },

  plugins: [
    new ExtractTextPlugin('app.css'),
    new ForceCaseSensitivityPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        DEVTYPE: JSON.stringify('PRODUCTION')
      }
    }),
    new CopyWebpackPlugin([
	 {from: 'assets', to: 'assets'}
    ])
  ],

  resolve: {
    modulesDirectories: ['.', 'assets', 'components', 'containers', 'i18n', 'node_modules', 'store', 'wheel']
  },

  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.scss$/,
        loader: 'css?localIdentName=[path]!postcss-loader!sass'
      },
      {
        test: /\.sass$/,
        //loader: ExtractTextPlugin.extract('css?localIdentName=[path][name]!postcss-loader!sass?indentedSyntax=true')
        loader: 'css?localIdentName=[path][name]!postcss-loader!sass?indentedSyntax=true'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff2',
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      }, {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-otf',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      //{
      //  test: /\.(otf|eot|ttf|woff)/,
      //  loader: 'url-loader?limit=8192'
      //},
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        loader: 'file?name=assets/svg/[name].[ext]'
      },
      //{
      //  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      //  loader: 'url?limit=10000&mimetype=image/svg+xml',
      //},
      {
        test: /\.png$/,
        loader: 'file?name=assets/png/[name].[ext]'
      }, {
        test: /\.jpg$/,
        loader: 'file?name=assets/jpg/[name].[ext]'
      },
      {
        test: /\.wav$/,
        loader: 'file-loader'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer({browsers: ['ios 7', 'android 4']}), csswring];
  },
};

if (process.env.NODE_ENV !== 'production') {
  webpackConfig.plugins.push(
    new webpack.NoErrorsPlugin()
  )
}
else {
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true, // eslint-disable-line camelcase
        warnings: false,
      }
    })
  )
}

module.exports = webpackConfig;
