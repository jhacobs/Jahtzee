const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
  return {
    entry: './src/app/index.ts',
    output: {
      filename: "bundle.js",
      path: __dirname + '/dist'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    mode: env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: '/node_modules/',
          use: 'ts-loader'
        },
        {
          test: /\.(sass|scss)$/,
          include: __dirname + '/src',
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.html$/,
          include: __dirname + '/src',
          use: 'html-loader'
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: __dirname + '/src/index.html'
      }),
      new CleanWebpackPlugin()
    ],
    devServer: {
      contentBase: __dirname + '/dist',
      compress: true,
      port: 3000
    }
  }
}