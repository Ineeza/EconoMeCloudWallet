import ReactGA from 'react-ga'

export const GA_TRACKING_ID = (() => {
  switch (process.env.ECW_ENV) {
    case 'dev':
      return 'UA-137832229-1'
    case 'prd':
      return 'UA-XXXXXXXX-X'
    default:
      return ''
  }
})()

export const initGA = () => {
  if (GA_TRACKING_ID != '') {
    ReactGA.initialize(GA_TRACKING_ID)
  }
}

export const logPageView = () => {
  if (GA_TRACKING_ID != '') {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }
}

export const logEvent = (category = '', action = '') => {
  if (GA_TRACKING_ID != '') {
    if (category && action) {
      ReactGA.event({ category, action })
    }
  }
}

export const logException = (description = '', fatal = false) => {
  if (GA_TRACKING_ID != '') {
    if (description) {
      ReactGA.exception({ description, fatal })
    }
  }
}
