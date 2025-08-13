<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-04 23:32:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-08-13 10:05:50
* @FilePath              : docs-web/src/components/SelectLanguage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-select
    dense
    borderless
    emit-value
    map-options
    options-dense
    color="primary"
    v-model="locale"
    :options="langOptions"
    option-label="label"
    option-value="value"
  >
    <template #selected-item="{ opt }">
      <q-item dense class="q-pa-none q-pl-md">
        <q-item-section avatar>
          <q-img no-spinner :src="'imgs/' + opt.value + '.png'" />
        </q-item-section>
        <q-item-section class="q-pa-none">
          <q-item-label class="text-white">{{ opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template #option="scope">
      <q-item v-bind="scope.itemProps" dense class="q-pa-none q-pl-md">
        <q-item-section avatar>
          <q-img no-spinner :src="'/docs-web/imgs/' + scope.opt.value + '.png'" />
        </q-item-section>
        <q-item-section class="q-pa-none">
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import languages from 'quasar/lang/index.json'

import { useLocalStore } from 'src/stores/LocalStore'

// languages vars
const appLangs = []
const i18nFiles = require.context('src/i18n', false, /.json$/)
i18nFiles.keys().forEach((key) => {
  // remove "./" and ".js"
  const lang = key.slice(2, -5)
  appLangs.push(lang)
  console.debug('\u001b[35m' + '[language] ', 'adding', lang)
})
const appLanguages = languages.filter((lang) => appLangs.includes(lang.isoName))
const langOptions = appLanguages.map((lang) => ({
  label: lang.nativeName,
  value: lang.isoName,
}))

const { locale } = storeToRefs(useLocalStore())
</script>
