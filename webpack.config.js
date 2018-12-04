module.exports = {
  entry: `${__dirname}/src/load-clips.js`,
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
