import * as Path from 'path'
import * as Webpack from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'

import HtmlWebpackPlugin from 'html-webpack-plugin'

const src = Path.resolve(__dirname, 'app')

const devServer: WebpackDevServer.Configuration = {
  hot: true,
  host: '0.0.0.0',
  historyApiFallback: {
    disableDotRule: true
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8123',
      pathRewrite: {
        '^/api': ''
      }
    },
    '/ws': {
      ws: true,
      target: 'http://localhost:8123',
      pathRewrite: {
        '^/ws': ''
      }
    }
  }
}

const config: Webpack.Configuration = {
  devServer,
  context: src,
  mode: 'development',
  entry: './index.tsx',
  devtool: 'source-map',
  output: {
    publicPath: '/'
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
                localIdentName: '[local]--[contenthash:base64:5]',
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
    new HtmlWebpackPlugin({
      template: 'index.html' ,
      favicon: 'assets/images/favicon.svg'
    })
  ]
}

export default config
