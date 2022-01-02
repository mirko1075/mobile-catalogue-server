module.exports = {
  entry: [
    './src/app.js',
  ],
  output: {
    path: '/',
    filename: 'main-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'}
      },
      { test: /\.css$/, use: {loader: 'style-loader!css-loader' }},
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: {loader: 'file-loader' }},
      {
        test: /\.(woff|woff2)$/,
        use: {loader: 'url-loader',
        options: {
          prefix: 'font/',
          limit: '5000',
        }}
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
        }}
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {loader: 'url-loader',
        options: {
          limit: '10000',
          mimetype: 'image/svg+xml',
        }}
      },
    ],
  },
};