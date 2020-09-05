/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const isProduction = argv.mode === 'production';

  const envFile = dotenv.config().parsed;
  const envs = {
    'process.env': Object.keys(envFile).reduce((accum, item) => {
      // eslint-disable-next-line no-param-reassign
      accum[item] = JSON.stringify(envFile[item]);
      return accum;
    }, {}),
  };

  return {
    devtool: isDevelopment ? 'cheap-module-eval-source-map' : 'source-map',
    entry: './src/index',
    output: {
      filename: isProduction ? 'js/index.[contenthash:8].js' : 'index.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    optimization: {
      minimize: isProduction,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'astroturf/loader', 'eslint-loader'],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            isDevelopment && 'style-loader',
            isProduction && MiniCssExtractPlugin.loader,
            {
              loader: 'astroturf/css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: isDevelopment
                    ? '[name]__[local]__[hash:base64]'
                    : '[hash:base64]',
                },
              },
            },
          ].filter(Boolean),
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(envs),
      isProduction && new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].chunk.css',
        }),
      new ForkTsCheckerWebpackPlugin({
        eslint: true,
      }),
    ].filter(Boolean),
    devServer: {
      publicPath: '/',
      historyApiFallback: true,
      clientLogLevel: 'silent',
    },
  };
};
