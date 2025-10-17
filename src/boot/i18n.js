/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-04-04 00:07:12                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-10-17 16:39:51                               *
 * @FilePath              : docs-web/src/boot/i18n.js                         *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/
import { storeToRefs } from 'pinia'
import { Quasar } from 'quasar'
import enUSQuasarLangPack from 'quasar/lang/en-US.js'
import zhCNQuasarLangPack from 'quasar/lang/zh-CN.js'
import { watch } from 'vue'
import { createI18n } from 'vue-i18n'

import { defineBoot } from '#q-app/wrappers'

import enUSMessages from 'src/i18n/en-US.json'
import zhCNMessages from 'src/i18n/zh-CN.json'
import { useLocalStore } from 'src/stores/LocalStore'

const quasarLangPacks = {
  'zh-CN': zhCNQuasarLangPack,
  'en-US': enUSQuasarLangPack,
}
const appMessages = {
  'zh-CN': zhCNMessages,
  'en-US': enUSMessages,
}

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
    const langPack = quasarLangPacks[langIso]
    if (langPack) {
      Quasar.lang.set(langPack)
    }

    // Set app i18n lang
    const messages = appMessages[langIso]
    if (messages) {
      i18n.global.locale.value = langIso
      i18n.global.setLocaleMessage(langIso, messages)
    }
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
