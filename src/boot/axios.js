/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-04-04 00:30:45                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2026-01-07 11:04:15                               *
 * @FilePath              : docs-web/src/boot/axios.js                        *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

/**
 * Run Default setting, interceptor, and error handling for axios
 * Normal use axios as usual:
 * import axios from 'axios'
 */
import axios from 'axios'
import { Notify, SessionStorage } from 'quasar'

import { t } from 'src/boot/i18n'
import { Router } from 'src/boot/router'

// This is the default configuration called in axios.js
axios.defaults.withCredentials = true // Allow send cookies
axios.defaults.timeout = 60000

let controller = new AbortController()

// This is the default configuration called in axios.js
axios.interceptors.request.use((config) => {
  config.signal = controller.signal // using AbortController signal

  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  if (!config.headers['Accept']) {
    config.headers['Accept'] = 'application/json, text/html, */*'
  }

  const auth = SessionStorage.getItem('Authorization')
  if (auth) {
    config.headers['Authorization'] = auth
  }

  //console.debug('\u001b[31m' + '[Axios] ', 'Request config:', config)
  return Promise.resolve(config)
})

// This is the default configuration called in axios.js
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // console.error('\u001b[31m' + '[Axios] ', 'Response error:', error)

    switch (error.response.status) {
      case 401:
        controller.abort()
        controller = new AbortController() // reset controller
        Router.push({ path: '/Login' })
        break
      case 403:
        Notify.create({
          type: 'warn',
          message: error.response.data.msg || t('S.NOT_AUTHORIZED'),
        })
        break
      case 404:
        Notify.create({
          type: 'error',
          message: t('S.NOT_FOUND'),
        })
        break
      case 500:
        Notify.create({
          type: 'error',
          message: t('S.SERVER_ERROR'),
        })
        break
      default:
        Notify.create({
          type: 'error',
          message: t('S.CONTACT_ADMIN'),
        })
    }

    return Promise.reject(error.response)
    /** ❗❗❗ Don't forget using catch() on each axios request to deal with error */
  },
)
