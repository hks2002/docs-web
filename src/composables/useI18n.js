/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2026-06-13 17:10:03                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-13 23:01:02                                *
 * @FilePath              : docs-web/src/composables/useI18n.js                *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                    *
 ******************************************************************************/
import { Quasar } from 'quasar'
import { createI18n } from 'vue-i18n'

const langOptions = [
  {
    label: 'English (US)',
    value: 'en-US',
  },
  {
    label: '中文（简体）',
    value: 'zh-CN',
  },
]

const quasarLangPacks = {
  'en-US': import('quasar/lang/en-US.js'),
  'zh-CN': import('quasar/lang/zh-CN.js'),
}
const appMessages = {
  'en-US': import('@/i18n/en-US.json'),
  'zh-CN': import('@/i18n/zh-CN.json'),
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

const loadLanguage = async (langIso) => {
  console.debug('\u001b[35m' + '[i18n] ', langIso)

  try {
    // Load Quasar lang pack dynamically
    const quasarLangPack = await quasarLangPacks[langIso]
    Quasar.lang.set(quasarLangPack.default || quasarLangPack)

    // Load app i18n messages dynamically
    const messages = await appMessages[langIso]
    i18n.global.setLocaleMessage(langIso, messages.default || messages)
    i18n.global.locale.value = langIso
  } catch (error) {
    console.error(`Failed to load language ${langIso}:`, error)
  }
}

/**
 * export i18n, so that non Vue files can use it
 * using it inside or outside of a Vue file:
 *
 * import { t } from '@/composables/useI18n'
 */
export const { d, n, t, tc, te, tm } = i18n.global
export { appMessages, i18n, langOptions, loadLanguage, quasarLangPacks }
