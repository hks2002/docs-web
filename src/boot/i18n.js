/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-04-04 00:07:12                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-05-27 19:08:07                                *
 * @FilePath              : docs-web/src/boot/i18n.js                          *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                    *
 ******************************************************************************/
import { defineBoot } from '#q-app/wrappers'
import { createI18n } from 'vue-i18n'

import { storeToRefs } from 'pinia'
import { useLocalStore } from 'src/stores/LocalStore'

import { loadLanguage } from 'src/utils/i18n.js'

const i18n = createI18n({
  legacy: false,
  missingWarn: true,
  fallbackWarn: false,
  fallbackLocale: 'en-US',
  messages: {
    'en-US': {
      Home: 'Home',
    },
  },
})

/**
 * export i18n, so that non Vue files can use it
 * using it inside or outside of a Vue file:
 *
 * import { t } from '@/boot/i18n'
 */
const { d, n, t, tc, te, tm } = i18n.global
export { d, i18n, n, t, tc, te, tm }

const { locale } = storeToRefs(useLocalStore())
const langIso = locale.value || 'en-US'
loadLanguage(langIso)

// boot process start here
export default defineBoot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
})
