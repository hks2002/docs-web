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
    :rows="groupedDocs"
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
  >
    <template v-slot:top>
      <div class="text-h6">{{ $t('S.YOUR_ACCESS_HISTORY') }}</div>
      <q-icon name="refresh" size="md" @click="doList" color="primary" class="cursor-pointer" />
      <div class="text-h6 q-ml-md">{{ $t('S.LIST_LAST', { COUNT: listCount }) }}</div>
    </template>
    <template v-slot:body="props">
      <q-tr v-if="props.row.isGroup" :props="props" class="bg-grey-3">
        <q-td colspan="2" class="text-bold text-primary">
          <q-icon name="folder" size="sm" class="q-mr-sm" />
          {{ props.row.groupName }} ({{ props.row.count }})
        </q-td>
      </q-tr>
      <q-tr v-else :props="props" class="cursor-pointer" @click="goTo(props.row.url)">
        <q-td>
          {{ date.formatDate(props.row.access_time, 'YYYY-MM-DD HH:mm:ss') }}
        </q-td>
        <q-td>
          <q-icon :name="getDocIcon(props.row.file_name)" size="xs" class="q-mr-xs"></q-icon>
          {{ props.row.file_name }}
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
import { date } from 'quasar'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { getDocIcon, isSupported3DFormat } from 'src/utils/file'
import { getTimePeriod } from 'src/utils/timePeriods'

const { t } = useI18n()
const showLoading = ref(false)
const docs = ref([])
const pagination = ref({
  page: 1,
  rowsPerPage: 50,
})
const listCount = ref(500)

const periodOrder = [
  t('S.TODAY'),
  t('S.YESTERDAY'),
  t('S.DAY_BEFORE_YESTERDAY'),
  t('S.THIS_WEEK'),
  t('S.LAST_WEEK'),
  t('S.LAST_2_WEEKS'),
  t('S.LAST_MONTH'),
  t('S.OLDER'),
]

const groupedDocs = computed(() => {
  const grouped = new Map()
  docs.value.forEach((doc) => {
    const period = getTimePeriod(doc.access_time)
    if (!grouped.has(period)) {
      grouped.set(period, [])
    }
    grouped.get(period).push(doc)
  })

  const result = []
  periodOrder.forEach((periodName) => {
    const items = grouped.get(periodName)
    if (items?.length) {
      result.push({ isGroup: true, groupName: periodName, count: items.length, name: periodName })
      result.push(...items)
    }
  })

  return result
})

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
  if (isSupported3DFormat(url)) {
    window.open('/docs-web/o3dv/3DViewer.html#model=' + url)
  } else {
    window.open(url)
  }
}

onMounted(() => {
  doList()
})
</script>
