<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 00:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-01-09 20:24:18
* @FilePath              : docs-web/src/components/DocsTable1.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-table
    dense
    row-key="name"
    table-header-style="background-color: rgb(101, 36, 161); color: white"
    :rows="docs"
    :loading="showLoading"
    :rows-per-page-options="[0]"
    :title="$t('S.DOCS_IN{LOCATION}', { LOCATION: 'TLS(NEW)' })"
    :columns="[
      { name: 'name', label: $t('F.FILE_NAME'), align: 'left' },
      { name: 'size', label: $t('F.SIZE'), align: 'right' },
      {
        name: 'lastModified',
        label: $t('F.LAST_MODIFIED_DATE'),
        align: 'right',
      },
    ]"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td>
          <q-icon size="xs" :name="getDocIcon(props.row.name)"></q-icon>
          {{ props.row.name }}
        </q-td>
        <q-td class="text-right">
          {{ humanStorageSize(props.row.size) }}
        </q-td>
        <q-td class="text-right">
          {{ date.formatDate(props.row.lastModified, 'YYYY-MM-DD HH:mm:ss') }}
        </q-td>
      </q-tr>
      <q-tr v-show="props.row.fileId > 1 && props.row.format === 'pdf'" :props="props">
        <q-td colspan="3" class="text-center">
          <q-img
            v-show="!props.row.zoom"
            style="max-width: 400px; height: 200px"
            :src="`/audros/custom/thumbnails/dmsDS/${props.row.fileId - 1}.CAD.jpg`"
            @click="props.row.zoom = !props.row.zoom"
          />
          <q-img
            v-show="props.row.zoom"
            class="zoom-layer"
            :src="`/audros/custom/thumbnails/dmsDS/${props.row.fileId - 1}.CAD.jpg`"
            @click="props.row.zoom = !props.row.zoom"
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
import { date, format } from 'quasar'
import { onMounted, ref, watch } from 'vue'

import { useSessionStore } from '@/stores/SessionStore'
import { getDocIcon } from '@/utils/file'

const $session = useSessionStore()

const showLoading = ref(false)
const docs = ref([])

const { humanStorageSize } = format
const { searchPN } = storeToRefs($session)

const doSearch = (val) => {
  if (val && val.length >= 3) {
    showLoading.value = true
    axios
      .get('/docs-api/searchDocsFromTLSNEW' + '?PN=' + val)
      .then((res) => {
        docs.value = res.data
        // 每个文档加一个zoom属性
        docs.value.forEach((doc) => {
          doc.zoom = false
        })
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
