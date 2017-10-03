const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: [
          'json-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['.js', '.jsx'],
  },
};
