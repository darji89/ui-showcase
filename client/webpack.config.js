const webpack = require('webpack');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const csswring = require('csswring');
const path = require('path');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

console.log('webpack ENV production:', PRODUCTION);
console.log('webpack ENV development:', DEVELOPMENT);

const entry = PRODUCTION
  ?	['./app.js']
  :	[
      'react-hot-loader/patch', // activate HMR for React
      'webpack-dev-server/client?http://0.0.0.0:8000', // bundle the client for webpack-dev-server// and connect to the provided endpoint
      'webpack/hot/only-dev-server', // bundle the client for hot reloading // only- means to only hot reload for successful updates
      './app.js',
    ];

const plugins = PRODUCTION
  ? []
  : [
      new webpack.HotModuleReplacementPlugin(), // enable HMR globally
      new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    ];

plugins.push(
  new ExtractTextPlugin('app.css'),
  new ForceCaseSensitivityPlugin(),
  new CopyWebpackPlugin([
    {from: 'assets', to: 'assets'}
  ])
);

plugins.push(
  new webpack.DefinePlugin({
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION),
    'process.env': {
      'NODE_ENV': process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : null,
      'DEVTYPE': process.env.DEVTYPE ? JSON.stringify(process.env.DEVTYPE) : null
    }
  })
);


const webpackConfig = {
  devtool: DEVELOPMENT ? 'module-eval-source-map' : '',
  entry: entry,
  plugins: plugins,
  resolve: {
    alias: {
      containers: path.resolve('./containers')
    },
    modules: [path.resolve('./'), path.resolve(__dirname, '/'),
      '.', 'assets', 'components', 'containers', 'i18n', 'store', 'wheel', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$|\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: [path]
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                  autoprefixer({browsers: ['ios 7', 'android 4']}),
                  csswring
                ]

            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              localIdentName: '[path][name]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                  autoprefixer({browsers: ['ios >=7', 'android >=4']}),
                  csswring
                ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax : true
            }
          }
        ]
      },
      {
        test: /\.(otf|eot|ttf|woff)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit : 8192
            }
          }
        ]
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: PRODUCTION
      //         ? {name : 'assets/svg/[name].[ext]'}
      //         : {}
      //     }
      //   ]
      // },
      // {
      //   test: /\.png$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: PRODUCTION
      //         ? {name : 'assets/png/[name].[ext]'}
      //         : {name : '[name].[ext]'}
      //     }
      //   ]
      // },
      // {
      //   test: /\.jpg$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: PRODUCTION
      //         ? {name : 'assets/jpg/[name].[ext]'}
      //         : {name : '[name].[ext]'}
      //     }
      //   ]
      // },
      {
        test: /\.svg$/,
        use: PRODUCTION
          ? [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000000
                }
              }
            ]

          : [
              {
                loader: 'file-loader',
                options: PRODUCTION
                  ? {name : 'assets/svg/[name].[ext]'}
                  : {}
              }
            ]
      },
      {
        test: /\.png$/,
        use: PRODUCTION
          ? [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000000
                }
              }
            ]
          : [
              {
                loader: 'file-loader',
                options: PRODUCTION
                  ? {name : 'assets/png/[name].[ext]'}
                  : {name : '[name].[ext]'}
              }
            ]
      },
      {
        test: /\.jpg$/,
        use: PRODUCTION
          ? [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000000
                }
              }
            ]
          : [
              {
                loader: 'file-loader',
                options: PRODUCTION
                  ? {name : 'assets/jpg/[name].[ext]'}
                  : {name : '[name].[ext]'}
              }
            ]
      },
    ]
  },
  output: {
    filename: 'app.js',
    path: __dirname + '/build/',
    publicPath: PRODUCTION ? './' : '/build/'
  },

  // postcss: function () {
  //   return [autoprefixer({browsers: ['ios 7', 'android 4']}), csswring];
  // }
};

if (process.env.NODE_ENV !== 'production') {
  webpackConfig.plugins.push(
    new webpack.NoEmitOnErrorsPlugin()
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
