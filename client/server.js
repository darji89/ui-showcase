const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  //quiet: true,
  //noInfo: true,
}).listen(8000, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:8000/');
});

//chmod -R 777 *