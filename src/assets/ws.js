/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2026-01-21 15:14:21                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-01-21 16:02:43                                *
 * @FilePath              : docs-web/src/assets/ws.js                          *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                    *
 ******************************************************************************/
import { Notify } from 'quasar'

import { t } from 'src/boot/i18n'

class WebSocketManager {
  constructor(userName, userInfo) {
    this.userName = userName
    this.userInfo = userInfo
    this.ws = null
    this.isConnected = false
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 10
    this.reconnectDelay = 3000 // 3 seconds between reconnect attempts
    this.heartbeatInterval = null
    this.heartbeatDelay = 30000 // 30 seconds heartbeat
    this.createConnection()
  }

  createConnection() {
    const port = process.env.NODE_ENV === 'production' ? 443 : 8090
    const wsUrl = `${location.protocol.replace(/^http/, 'ws')}//${location.hostname}:${port}/docs-ws`

    try {
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => this.onOpen()
      this.ws.onclose = (event) => this.onClose(event)
      this.ws.onmessage = (event) => this.onMessage(event)
      this.ws.onerror = (error) => this.onError(error)
    } catch (error) {
      console.error('WebSocket connection error:', error)
      this.scheduleReconnect()
    }
  }

  onOpen() {
    console.log('WebSocket connection established')
    this.isConnected = true
    this.reconnectAttempts = 0

    // Send user info when connected
    this.ws.send(JSON.stringify({ userName: this.userName, userInfo: this.userInfo }))

    // Start heartbeat
    this.startHeartbeat()
  }

  onClose(event) {
    console.log('WebSocket connection closed:', event.code, event.reason)
    this.isConnected = false

    // Stop heartbeat
    this.stopHeartbeat()

    // Schedule reconnect unless explicitly closed by user
    if (!event.wasClean) {
      this.scheduleReconnect()
    }
  }

  onError(error) {
    console.error('WebSocket error:', error)
  }

  onMessage(event) {
    console.debug('Server:', event.data)

    try {
      const data = JSON.parse(event.data)

      // Handle heartbeat response
      if (data.msg === 'HEARTBEAT_RESPONSE') {
        return
      }

      // Handle other messages
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

  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ msg: 'HEARTBEAT' }))
      }
    }, this.heartbeatDelay)
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  /**
   * Reconnect with random jitter to avoid reconnect storm
   * @returns {void}
   */
  scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnect attempts reached. Giving up.')
      return
    }

    this.reconnectAttempts++

    const baseDelay = this.reconnectDelay // 3000
    const jitter = Math.floor(Math.random() * baseDelay)
    const delay = baseDelay + jitter

    console.log(
      `Attempting to reconnect in ${delay}ms (${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
    )

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null
      this.createConnection()
    }, delay)
  }

  // Public method to close connection gracefully
  close() {
    this.stopHeartbeat()
    if (this.ws) {
      this.ws.close(1000, 'User initiated close')
      this.ws = null
    }
  }

  // Public method to send messages
  send(data) {
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
      return true
    }
    console.error('Cannot send message: WebSocket not connected')
    return false
  }
}

/**
 * Create a WebSocket connection with reconnect and heartbeat functionality
 *
 * @param {String} userName
 * @param {String} userInfo
 * @returns {WebSocketManager} WebSocket manager instance
 */
const createWS = (userName, userInfo) => {
  return new WebSocketManager(userName, userInfo)
}

export { createWS }
