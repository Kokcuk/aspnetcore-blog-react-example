var webpack = require('webpack');

module.exports = {
    entry: './App/index.js',
    output: {
        path: './wwwroot/js',
        filename: 'index.js'
    },
    devtool: 'source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
          {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loaders: ['react-hot', 'babel']
          }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
