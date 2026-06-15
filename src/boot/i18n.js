/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-04-04 00:07:12                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-13 22:49:40                                *
 * @FilePath              : docs-web/src/boot/i18n.js                          *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                    *
 ******************************************************************************/
import { defineBoot } from '#q-app'

import { i18n, loadLanguage } from '@/composables/useI18n'
import { useLocaleStore } from '@/stores/LocaleStore'

const langIso = useLocaleStore().locale || 'en-US'
loadLanguage(langIso)

// boot process start here
export default defineBoot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
})
