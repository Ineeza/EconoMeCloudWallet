// next.config.js
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withFonts = require('next-fonts')
const webpack = require('webpack')
const logger = require('./backend/middleware/logger')

logger.debug('==== Next config ====')
logger.debug('ECW_ENV: ' + process.env.ECW_ENV)
logger.debug('ECW_LOG_LEVEL: ' + process.env.ECW_LOG_LEVEL)
logger.debug('ECW_LOG_QUERY: ' + process.env.ECW_LOG_QUERY)

module.exports =
    withCSS(withSass(withImages(withFonts({
      webpack: (config, { dev }) => {
        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.ECW_ENV': JSON.stringify(process.env.ECW_ENV),
            'process.env.ECW_LOG_LEVEL': JSON.stringify(process.env.ECW_LOG_LEVEL),
            'process.env.ECW_LOG_QUERY': JSON.stringify(process.env.ECW_LOG_QUERY)
          })
        )
        config.node = { fs: 'empty' }
        return config
      }
    }))))
