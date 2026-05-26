<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 00:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-05-26 10:20:05
* @FilePath              : docs-web/src/components/CleanDuplicate.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-btn
    color="primary"
    icon="compress"
    no-caps
    outline
    :label="$t('S.CLEAN_DUPLICATE_DOC')"
    @click="doIt"
  />
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const showLoading = ref(false)

const doIt = () => {
  showLoading.value = true
  axios
    .post(`/docs-api/clean/duplicate`)
    .catch(() => {})
    .finally(() => {
      showLoading.value = false
    })
}
</script>
