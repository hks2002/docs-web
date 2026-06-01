import { Quasar } from 'quasar'
import { i18n } from 'src/boot/i18n.js'

const quasarLangPacks = {
  'en-US': import('quasar/lang/en-US.js'),
  'zh-CN': import('quasar/lang/zh-CN.js'),
}
const appMessages = {
  'en-US': import('src/i18n/en-US.json'),
  'zh-CN': import('src/i18n/zh-CN.json'),
}
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

const loadLanguage = async (langIso) => {
  console.debug('\u001b[35m' + '[i18n] ', langIso)

  try {
    // Load Quasar lang pack dynamically
    const langPack = await quasarLangPacks[langIso]
    Quasar.lang.set(langPack.default || langPack)

    // Load app i18n messages dynamically
    const messages = await appMessages[langIso]
    i18n.global.locale.value = langIso
    i18n.global.setLocaleMessage(langIso, messages.default || messages)
  } catch (error) {
    console.error(`Failed to load language ${langIso}:`, error)
  }
}
export { appMessages, langOptions, loadLanguage, quasarLangPacks }
