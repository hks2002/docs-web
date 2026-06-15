<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-04 23:32:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-05-27 18:38:34
* @FilePath              : docs-web/src/components/SelectLanguage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-select
    v-model="locale"
    dense
    borderless
    emit-value
    map-options
    options-dense
    color="primary"
    option-label="label"
    option-value="value"
    :options="langOptions"
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
          <q-img no-spinner :src="'imgs/' + scope.opt.value + '.png'" />
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
import { watch } from 'vue'

import { langOptions, loadLanguage } from '@/composables/useI18n.js'
import { useLocaleStore } from '@/stores/LocaleStore'

const { locale } = storeToRefs(useLocaleStore())
watch(locale, (langIso) => {
  loadLanguage(langIso)
})
</script>
