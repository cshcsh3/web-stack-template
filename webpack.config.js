const HtmlWebPackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");

const isDevServer = process.env.WEBPACK_DEV_SERVER;

module.exports = {
  context: __dirname,
  entry: ["./src/index.tsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: `assets/[name]${isDevServer ? '' : '.[contenthash]'}.js`,
    sourceMapFilename: '[file].map'
  },
  devServer: {
    hot: true,
    port: 8080,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader"
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [path.resolve(__dirname, "css")],
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|j?g|svg|gif|mp4)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `assets/images/${
                isDevServer ? "[path][name]" : "[contenthash]"
              }.[ext]`,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
    }),
    new ESLintPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      }
    })
  ],
};