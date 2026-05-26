<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 00:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-05-25 14:25:08
* @FilePath              : docs-web/src/components/AccessLog.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-table
    dense
    row-key="name"
    table-header-style="background-color: rgb(101, 36, 161); color: white"
    :rows="docs"
    :columns="[
      {
        name: 'accessTime',
        label: $t('F.LAST_ACCESS_TIME'),
        field: 'access_time',
        align: 'left',
        format: (val) => {
          return date.formatDate(val, 'YYYY-MM-DD HH:mm:ss')
        },
      },
      { name: 'name', label: $t('F.FILE_NAME'), align: 'left', field: 'file_name' },
    ]"
    :loading="showLoading"
    :rows-per-page-options="[10, 50, 100, 200, 500, 1000]"
    v-model:pagination="pagination"
    @row-click="
      (evt, row, index) => {
        goTo(row.url)
      }
    "
  >
    <template v-slot:top>
      <div class="text-h6">{{ $t('S.YOUR_ACCESS_HISTORY') }}</div>
      <q-icon name="refresh" size="md" @click="doList" color="primary" class="cursor-pointer" />
      <q-space />
      <div class="text-h6">{{ $t('S.LIST_LAST', { COUNT: listCount }) }}</div>
    </template>
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
const pagination = ref({
  page: 1,
  rowsPerPage: 50,
})
const listCount = ref(500)

const doList = () => {
  showLoading.value = true
  axios
    .get(`/docs-api/userAccessLog?offset=0&limit=${listCount.value}`)
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
