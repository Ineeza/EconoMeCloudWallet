// next.config.js
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const withFonts = require('next-fonts')
const webpack = require('webpack')

module.exports =
    withCSS(withImages(withFonts({

        webpack: (config, { dev }) => {
            config.plugins.push(
                new webpack.DefinePlugin({
                    'process.env.ECW_ENV': JSON.stringify(process.env.ECW_ENV),
                })
            )
            return config
        }
    })))

