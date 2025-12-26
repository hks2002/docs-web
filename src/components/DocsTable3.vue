<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 00:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-12-27 02:24:17
* @FilePath              : docs-web/src/components/DocsTable3.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->


<template>
  <q-table
    dense
    :title="$t('S.YOUR_ACCESS_HISTORY')"
    row-key="name"
    table-header-style="background-color: rgb(101, 36, 161); color: white"
    :rows="docs"
    :columns="[
      { name: 'name', label: $t('F.FILE_NAME'), align: 'left', field: 'file_name' },
      {
        name: 'accessTime',
        label: $t('F.LAST_ACCESS_TIME'),
        field: 'access_time',
        format: (val) => {
          return date.formatDate(val, 'YYYY-MM-DD HH:mm:ss')
        },
      },
    ]"
    :loading="showLoading"
    :rows-per-page-options="[0]"
    @row-click="
      (evt, row, index) => {
        goTo(row.location)
      }
    "
  >
    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <q-icon :name="getDocIcon(props.row.file_name)" size="xs"></q-icon>
        {{ props.row.file_name }}
      </q-td>
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
import { date } from 'quasar'
import { onMounted, ref } from 'vue'

import { getDocIcon } from 'src/assets/file'

const showLoading = ref(false)
const docs = ref([])

const doList = () => {
  showLoading.value = true
  axios
    .get('/docs-api/userAccessLog' + '?offset=0&limit=100')
    .then((res) => {
      docs.value = res.data
    })
    .catch(() => {})
    .finally(() => {
      showLoading.value = false
    })
}

const goTo = (url) => {
  window.open(url)
}

onMounted(() => {
  doList()
})
</script>
