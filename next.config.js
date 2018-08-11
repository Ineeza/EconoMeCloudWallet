// next.config.js
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const withFonts = require('next-fonts')

//console.log(withCSS(withImages(withFonts()).webpack.webpack))

module.exports = withCSS(withImages(withFonts({
  postcssLoaderOptions: {
    parser: true,
    config: {
      ctx: {
        theme: JSON.stringify(process.env.REACT_APP_THEME)
      }
    }
  }
})))
