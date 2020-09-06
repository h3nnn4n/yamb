const path = require('path');
const webpack = require('webpack');


module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.glsl', 'vs', 'fs']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(vert|frag)$/,
        loader: 'shader-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {},
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ],
  },
  watchOptions: {
    ignored: /node_modules/
  }
}
