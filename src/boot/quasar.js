/*****************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                    *
 * @CreatedDate           : 2025-04-04 00:23:17                              *
 * @LastEditors           : Robert Huang<56649783@qq.com>                    *
 * @LastEditDate          : 2025-04-06 00:18:30                              *
 * @FilePath              : docs-web/src/boot/quasar.js                      *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                  *
 ****************************************************************************/

import { Loading, Notify, QSpinnerBars } from 'quasar'

Loading.setDefaults({ spinner: QSpinnerBars, spinnerSize: 40 })

Notify.setDefaults({ position: 'top', textColor: 'white', html: true })
Notify.registerType('success', {
  icon: 'done',
  color: 'green',
})
Notify.registerType('fail', {
  icon: 'close',
  color: 'yellow',
})
Notify.registerType('error', {
  icon: 'close',
  color: 'red',
})
Notify.registerType('warn', {
  icon: 'warning',
  color: 'error',
})
Notify.registerType('info', {
  icon: 'error_outline',
  color: 'info',
})
Notify.registerType('ongoing', {
  icon: 'schedule',
  color: 'grey-8',
})
