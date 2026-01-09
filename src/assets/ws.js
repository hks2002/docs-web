/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2026-01-06 17:44:10                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2026-01-09 18:51:34                               *
 * @FilePath              : docs-web/src/assets/ws.js                         *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/
import { Notify } from 'quasar'

import { t } from 'src/boot/i18n'

/**
 * Create a WebSocket connection, passing the userInfo for server
 *
 * @param {String} userName
 * @param {String} userInfo
 * @returns
 */
const createWS = (userName, userInfo) => {
  const port = process.env.NODE_ENV === 'production' ? 443 : 8090
  const ws = new WebSocket(
    `${location.protocol.replace(/^http/, 'ws')}/${location.hostname}:${port}/docs-ws`,
  )

  ws.onopen = () => ws.send(JSON.stringify({ userName: userName, userInfo: userInfo }))
  ws.onclose = () => console.log('Connection closed')
  ws.onmessage = (ev) => {
    console.debug('Server:', ev.data)

    try {
      const data = JSON.parse(ev.data)

      switch (data['msg']) {
        case 'DMS_DOWNLOAD_START':
          Notify.create({
            type: 'ongoing',
            message: t('S.DOWNLOAD_STARTED', { DOC: data['name'] }),
          })
          break
        case 'DMS_DOWNLOAD_REDOWNLOAD':
          Notify.create({
            type: 'warn',
            message: t('S.DOWNLOAD_STARTED', { DOC: data['name'] }),
          })
          break
        case 'DMS_DOWNLOAD_SKIP':
          Notify.create({
            type: 'info',
            message: t('S.DOWNLOAD_SKIPPED', { DOC: data['name'] }),
          })
          break
        case 'DMS_DOWNLOAD_SUCCESS':
          Notify.create({
            type: 'success',
            message: t('S.DOWNLOAD_FINISHED', { DOC: data['name'] }),
          })
          break
        case 'DMS_DOWNLOAD_FAILURE':
          Notify.create({
            type: 'error',
            message: t('S.DOWNLOAD_ERROR', { DOC: data['name'] }),
          })
          break
      }
    } catch (e) {
      console.error('WebSocket message handling error:', e)
    }
  }
  return ws
}

export { createWS }
