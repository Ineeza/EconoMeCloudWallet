import cookie from 'js-cookie'

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 36500,
      path: '/'
    })
  }
}

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    })
  }
}

export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req)
}

const getCookieFromBrowser = key => {
  return cookie.get(key)
}

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`))
  if (!rawCookie) {
    return undefined
  }
}

// Get wallet's cookies by prefix 'WALLET-'
export const getWalletsFromCookie = () => {
  console.log('==== Get wallets !! ====')

  const data = cookie.get()
  const dataKeys = Object.keys(data)
  const groupedData = dataKeys.reduce((result, currKey) => {
    // Pull out the group name from the key
    const group = currKey.split('-')[0]
    // Check if the group exists, if not, create it
    const hasGroup = result[group] !== undefined
    if (!hasGroup) { result[group] = {} }
    // Add the current entry to the result
    result[group][currKey] = data[currKey]
    return result
  }, {})

  return groupedData['WALLET']
}
