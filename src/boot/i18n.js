/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-04-04 00:07:12                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-04-21 10:45:44                               *
 * @FilePath              : docs-web/src/boot/i18n.js                         *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { defineBoot } from '#q-app/wrappers'
import { storeToRefs } from 'pinia'
import { Quasar } from 'quasar'
import { watch } from 'vue'
import { createI18n } from 'vue-i18n'

import { useLocalStore } from 'src/stores/LocalStore'

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
export { d, n, t, tc, te, tm }

// boot process start here
export default defineBoot(({ app }) => {
  const loadLanguage = (langIso) => {
    console.debug('\u001b[35m' + '[i18n] ', langIso)
    // Set Quasar lang pack
    import(`quasar/lang/${langIso}.js`).then((langPack) => {
      Quasar.lang.set(langPack.default)
    })

    // Set app i18n lang
    import(`src/i18n/${langIso}.json`).then((messages) => {
      // set locale and locale message
      i18n.global.locale.value = langIso
      i18n.global.setLocaleMessage(langIso, messages.default)
    })
  }

  const { locale } = storeToRefs(useLocalStore())
  watch(locale, (langIso) => {
    loadLanguage(langIso)
  })

  const langIso = locale.value || 'en-US'

  loadLanguage(langIso)
  // Set i18n instance on app
  app.use(i18n)
})
