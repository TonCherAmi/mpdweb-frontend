import * as Path from 'path'
import * as Webpack from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'

const src = Path.resolve(__dirname, 'app')

const config: Webpack.Configuration = {
  context: src,
  entry: './index.tsx',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    proxy: {
      '/': {
        target: 'http://localhost:8123'
      },
      '/connect': {
        ws: true,
        target: 'http://localhost:8123',
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'babel-loader',
        include: [src],
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: 'camelCaseOnly'
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: { '@app': src },
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' })
  ]
}

export default config
