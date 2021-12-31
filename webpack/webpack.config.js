import path from 'path';
const source = path.resolve(__dirname, 'src');

export default {
  context: __dirname,
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: source,
        use: {
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        include: source,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            query: {
              importLoader: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
              modules: true,
            },
          },
        ],
      },
    ],
  },
};