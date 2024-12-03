// contents of webpack.config.js
const path = require('path');
const pkg = require('./package.json');

module.exports = {
  entry: `./src/${pkg.entry}.tsx`,
  externals: {
    // Only the below modules should be listed, these are the dependencies shared with
    // the Builder.io webapp
    react: 'react',
    'react-dom': 'react-dom',
    '@builder.io/sdk': '@builder.io/sdk',
    '@builder.io/react': '@builder.io/react',
    '@emotion/core': '@emotion/core',
    '@emotion/styled': '@emotion/styled',
    mobx: 'mobx',
    'mobx-state-tree': 'mobx-state-tree',
    'mobx-react': 'mobx-react',
    '@builder.io/app-context': '@builder.io/app-context',
    '@material-ui/core': '@material-ui/core',
    '@material-ui/icons': '@material-ui/icons',
    '@emotion/styled': '@emotion/styled',
    ses: 'ses',
  },
  output: {
    filename: pkg.output,
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  devServer: {
    port: 1268,
    static: {
      directory: path.join(__dirname, './dist'),
    },
    headers: {
      'Access-Control-Allow-Private-Network': 'true',
      'Access-Control-Allow-Origin': '*',
    },
  },
};
