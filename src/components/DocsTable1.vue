<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 00:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-06-17 00:55:34
* @FilePath              : docs-web/src/components/DocsTable1.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-table
    dense
    :title="$t('S.DOCS_IN{LOCATION}', { LOCATION: 'TLS(NEW)' })"
    row-key="name"
    table-header-style="background-color: rgb(101, 36, 161); color: white"
    :rows="docs"
    :columns="[
      { name: 'name', label: $t('F.FILE_NAME'), align: 'left', field: 'file_name' },
      {
        name: 'lastModified',
        label: $t('F.LAST_MODIFIED_DATE'),
        field: 'doc_modified_at',
        format: (val) => {
          return new Date(val).toLocaleString()
        },
      },
    ]"
    :loading="showLoading"
    :rows-per-page-options="[0]"
  >
    <template v-slot:loading>
      <q-inner-loading :showing="showLoading">
        <q-spinner-ios size="50px" color="primary" />
      </q-inner-loading>
    </template>
  </q-table>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { axios } from 'src/boot/axios'
import { onMounted, ref, watch } from 'vue'

import { useSessionStore } from 'src/stores/SessionStore'

const showLoading = ref(false)
const docs = ref([])

const { searchPN } = storeToRefs(useSessionStore())

const doSearch = (val) => {
  if (val && val.length >= 3) {
    showLoading.value = true
    axios
      .get('/docs-api/searchDocsFromTLSNEW' + '?PN=' + val)
      .then((res) => {
        docs.value = res.data
      })
      .catch(() => {})
      .finally(() => {
        showLoading.value = false
      })
  }
}

watch(searchPN, (newVal) => {
  doSearch(newVal)
})

onMounted(() => {
  doSearch(searchPN.value)
})
</script>
