<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 00:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-07-15 23:30:54
* @FilePath              : docs-web/src/components/DocsTable2.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-table
    dense
    :title="$t('S.DOCS_IN{LOCATION}', { LOCATION: 'TLS(OLD)' })"
    row-key="name"
    table-header-style="background-color: rgb(101, 36, 161); color: white"
    :rows="docs"
    :columns="[{ name: 'name', label: $t('F.FILE_NAME'), align: 'left', field: 'file' }]"
    :loading="showLoading"
    :rows-per-page-options="[0]"
    @row-click="
      (evt, row, index) => {
        goTo(row.path)
      }
    "
  >
    <template v-slot:loading>
      <q-inner-loading :showing="showLoading">
        <q-spinner-ios size="50px" color="primary" />
      </q-inner-loading>
    </template>
  </q-table>
</template>

<script setup>
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

import { useSessionStore } from 'src/stores/SessionStore'

const showLoading = ref(false)
//var columns = []
const docs = ref([])

const { searchPN } = storeToRefs(useSessionStore())

const doSearch = (val) => {
  if (val && val.length >= 3) {
    showLoading.value = true
    axios
      .get('/docs-api/searchDocsFromTLSOLD' + '?PN=' + val)
      .then((res) => {
        docs.value = res.data
      })
      .catch(() => {})
      .finally(() => {
        showLoading.value = false
      })
  }
}

const goTo = (/*url*/) => {}

watch(searchPN, (newVal) => {
  doSearch(newVal)
})

onMounted(() => {
  doSearch(searchPN.value)
})
</script>
