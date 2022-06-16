import * as Path from 'path'
import * as Webpack from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

const src = Path.resolve(__dirname, 'app')

const devServer: WebpackDevServer.Configuration = {
  hot: 'only',
  host: '0.0.0.0',
  historyApiFallback: {
    disableDotRule: true,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8123',
      pathRewrite: {
        '^/api': '',
      },
    },
    '/api/ws': {
      ws: true,
      target: 'http://localhost:8123',
      pathRewrite: {
        '^/api/ws': '',
      },
    },
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (env: unknown, argv: { mode: string | undefined }): Webpack.Configuration  => {
  const isDevelopment = argv.mode === 'development'

  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: 'index.html',
    favicon: 'assets/images/favicon.svg',
  })

  const plugins = !isDevelopment ? [htmlWebpackPlugin] : [
    htmlWebpackPlugin,
    new  ReactRefreshWebpackPlugin(),
  ]

  return {
    plugins,
    devServer,
    context: src,
    entry: './index.tsx',
    devtool: 'source-map',
    output: {
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          loader: 'babel-loader',
          include: [src],
          exclude: /node_modules/,
          options: {
            plugins: !isDevelopment ? [] : ['react-refresh/babel'],
          },
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
                  exportLocalsConvention: 'camelCaseOnly',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.ttf$/,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      alias: { '@app': src },
      extensions: ['.js', '.ts', '.tsx'],
    },
  }
}
