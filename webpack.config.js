const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const postCssImport = require('postcss-import');
// const postCssFlexbugsFixes = require('postcss-flexbugs-fixes');
// const postCssPresetEnv = require('postcss-preset-env');
// const CssNano = require('cssnano');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const isProduction = argv.mode === 'production';

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
      extensions: ['.ts', '.tsx', '.js', 'jsx'],
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
            // {
            //   loader: 'css-loader',
            //   options: {
            //     importLoaders: 1,
            //     localsConvention: 'camelCase',
            //     sourceMap: isDevelopment,
            //     modules: {
            //       mode: 'local',
            //       localIdentName: isDevelopment
            //         ? '[name]__[local]__[hash:base64]'
            //         : '[hash:base64]',
            //     },
            //   },
            // },
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     ident: 'postcss',
            //     plugins: () => [
            //       postCssImport(),
            //       postCssFlexbugsFixes,
            //       postCssPresetEnv({
            //         autoprefixer: {
            //           flexbox: 'no-2009',
            //         },
            //         stage: 3,
            //         features: {
            //           'custom-properties': true,
            //         },
            //       }),
            //       CssNano(),
            //     ],
            //   },
            // },
          ].filter(Boolean),
        },
      ],
    },
    plugins: [
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
