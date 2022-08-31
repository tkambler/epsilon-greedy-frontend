const pkg = require('./package.json');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: [path.resolve(__dirname, 'src/index')],
  output: {
    filename: 'client.bundle.js',
    path: __dirname + '/dist/js',
    publicPath: '/js/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      app: path.resolve(__dirname, 'src'),
      '@tkambler/ag-grid-personal': path.resolve(
        __dirname,
        'vendor',
        'ag-grid-personal'
      ),
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: (file) => {
          return (
            path.extname(file) === '.scss' && file.indexOf('.module') === -1
          );
        },
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: (file) => {
          return file.indexOf('.css') >= 0 && file.indexOf('.module') === -1;
        },
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.module\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        use: 'url-loader',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
  devServer: {
    static: [path.join(__dirname, 'public'), path.join(__dirname, 'dist')],
    historyApiFallback: true,
    compress: true,
    port: 9010,
  },
};

for (const alias in pkg._moduleAliases) {
  const aliasPath = path.resolve(__dirname, pkg._moduleAliases[alias]);
  config.resolve.alias[alias] = aliasPath;
}

module.exports = config;
