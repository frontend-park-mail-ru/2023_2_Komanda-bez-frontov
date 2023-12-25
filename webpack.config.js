import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';


const __dirname = path.resolve();

export default {
  entry: './public/index.js',
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader'},
      {
        test: /.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
        options: {
          partialDirs: [
            path.resolve(__dirname, './public/components/FormsItem'),
            path.resolve(__dirname, './public/components/Navbar'),
            path.resolve(__dirname, './public/components/ProfileMenu'),
            path.resolve(__dirname, './public/components/pages/CheckForm'),
            path.resolve(__dirname, './public/components/pages/MyForms'),
            path.resolve(__dirname, './public/components/pages/Index'),
            path.resolve(__dirname, './public/components/pages/Login'),
            path.resolve(__dirname, './public/components/pages/Profile'),
            path.resolve(__dirname, './public/components/pages/Signup'),
          ],
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({template: './public/index.html'}),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              ['svgo', { name: 'preset-default' }],
            ],
          },
        },
      }),
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  mode: 'development',
};
