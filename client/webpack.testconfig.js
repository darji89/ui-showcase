module.exports = {
    entry: 'mocha!./tests/index.js',
    output: {
        filename: 'test.build.js',
        path: 'tests/',
        publicPath: 'http://thishost:9900/tests'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=es2015']
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
                loader: 'css?localIdentName=[path]!postcss-loader!sass?indentedSyntax=true'
            },
              {
                test: /\.mp3$/,
                loader: 'file-loader'
              },
            {
                test: /\.png$/,
                loader: 'file?name=[name].[ext]'
            }, {
                test: /\.jpg$/,
                loader: 'file?name=[name].[ext]'
            },
              {
                test: /\.wav$/,
                loader: 'file-loader'
              }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 9900
    }
};
