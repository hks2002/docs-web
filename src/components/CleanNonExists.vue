<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 00:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-05-26 10:20:14
* @FilePath              : docs-web/src/components/CleanNonExists.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-btn
    no-caps
    outline
    color="primary"
    icon="cleaning_services"
    :label="$t('S.CLEAN_NON_EXISTS_DOC')"
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
    .post(`/docs-api/clean/non-exists`)
    .catch(() => {})
    .finally(() => {
      showLoading.value = false
    })
}
</script>
