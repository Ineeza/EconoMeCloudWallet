// next.config.js
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const withFonts = require('next-fonts')
const webpack = require('webpack')

console.log('==== Next config ====')
console.log('ECW_ENV: ' + process.env.ECW_ENV)
console.log('ECW_LOG_LEVEL: ' + process.env.ECW_LOG_LEVEL)
console.log('ECW_LOG_QUERY: ' + process.env.ECW_LOG_QUERY)

module.exports =
    withCSS(withImages(withFonts({

      webpack: (config, { dev }) => {
        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.ECW_ENV': JSON.stringify(process.env.ECW_ENV),
            'process.env.ECW_LOG_LEVEL': JSON.stringify(process.env.ECW_LOG_LEVEL),
            'process.env.ECW_LOG_QUERY': JSON.stringify(process.env.ECW_LOG_QUERY),
          })
        )
        return config
      }
    })))
