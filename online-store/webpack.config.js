const path = require ('path');
const HTMLWebpackPlugin = require ('html-webpack-plugin');
const {CleanWebpackPlugin} = require ('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const bootstrap = require ('bootstrap');

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    port: 4200,
    open: true,
    compress: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
    },
      {
        test: /\.ts$/i,
        use: ['ts-loader'],
        exclude: /node_modules/,
    },
  //   {
  //       test: /\.(png|jpe?g|gif)$/i,
  //       loader: 'file-loader',
  //       options: {
  //         outputPath: 'assets/img',
  //         name: '[name].[ext]',
  //       },
    
  // },
  {
    test: /\.(ttf|woff2?|eot)$/,
    use: ['file-loader'],
},

    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
},
  mode: 'development',
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        // { from: path.resolve(__dirname, 'src/assets/'), to: path.resolve(__dirname, 'dist/assets/') },
        { from: 'src/assets', to: 'assets' },
        { from: path.resolve(__dirname, 'src/assets/favicon.ico'), to: path.resolve(__dirname, 'dist/') }
      ],
    }),
    new ESLintPlugin(
      {
        extensions: ['ts'],
      }),
  ]
};
