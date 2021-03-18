const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
   context: __dirname,
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      publicPath: '/',
   },
   devServer: {
      historyApiFallback: true
   },
   module: {
       rules: [
            {
               test: /\.jsx?$/,
               use: [
                  {
                     loader: 'babel-loader'
                  }
               ],
               exclude: [ /node_modules/ ]
            },
            {
               test: /\.(css|scss)$/,
               use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader'
               ],
               exclude: /node_modules/,
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader'
            }
        ]
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'src/index.html' ),
         filename: 'index.html'
      })
   ]
};