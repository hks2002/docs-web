<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 00:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-01-07 23:11:14
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
      { name: 'name', label: $t('F.FILE_NAME'), align: 'left' },
      { name: 'size', label: $t('F.SIZE'), align: 'right' },
      {
        name: 'lastModified',
        label: $t('F.LAST_MODIFIED_DATE'),
        align: 'right',
      },
    ]"
    :loading="showLoading"
    :rows-per-page-options="[0]"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td>
          <q-icon :name="getDocIcon(props.row.name)" size="xs"></q-icon>
          {{ props.row.name }}
        </q-td>
        <q-td class="text-right">
          {{ renderFileSize(props.row.size) }}
        </q-td>
        <q-td class="text-right">
          {{ date.formatDate(props.row.lastModified, 'YYYY-MM-DD HH:mm:ss') }}
        </q-td>
      </q-tr>
      <q-tr v-show="props.row.fileId > 1 && props.row.format === 'pdf'" :props="props">
        <q-td class="text-center" colspan="3">
          <q-img
            :src="`/audros/custom/thumbnails/dmsDS/${props.row.fileId - 1}.CAD.jpg`"
            style="max-width: 400px; height: 200px"
          />
        </q-td>
      </q-tr>
    </template>
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
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'

import { getDocIcon, renderFileSize } from 'src/assets/file'
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
