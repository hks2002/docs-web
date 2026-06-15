<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 00:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-06-13 22:58:20
* @FilePath              : docs-web/src/components/DocsTable0.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-table
    dense
    row-key="name"
    selection="single"
    table-header-style="background-color: rgb(101, 36, 161); color: white"
    :rows="docs"
    :loading="showLoading"
    :rows-per-page-options="[0]"
    :title="$t('S.DOCS_IN{LOCATION}', { LOCATION: 'DOCS' })"
    :columns="[
      { name: 'name', label: $t('F.FILE_NAME'), align: 'left', field: 'name' },
      {
        name: 'size',
        align: 'right',
        label: $t('F.SIZE'),
        field: 'size',
      },
      {
        name: 'lastModified',
        label: $t('F.LAST_MODIFIED_DATE'),
        field: 'lastModified',
        format: (val) => {
          return date.formatDate(val, 'YYYY-MM-DD HH:mm:ss')
        },
      },
    ]"
    @row-click="
      (evt, row, index) => {
        goTo(row.url)
      }
    "
  >
    <template v-slot:top-right>
      <div class="row q-gutter-x-sm">
        <q-input
          dense
          outlined
          clearable
          debounce="2000"
          input-style="font-weight:bolder;text-transform:uppercase"
          :model-value="searchPN"
          :placeholder="$t('S.DOC_SEARCH')"
          @update:model-value="doSearch"
        >
          <template v-slot:append>
            <q-icon name="refresh" class="cursor-pointer" @click="doSearch(searchPN)">
              <q-tooltip>{{ $t('S.REFRESH') }}</q-tooltip>
            </q-icon>
          </template>
        </q-input>
      </div>
    </template>
    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <q-icon
          size="xs"
          :name="
            props.row.isDirectory ? 'img:/docs-web/imgs/folder.svg' : getDocIcon(props.row.name)
          "
        ></q-icon>
        {{ props.row.name }}
      </q-td>
    </template>
    <template v-slot:body-cell-size="props">
      <q-td :props="props">
        {{ humanStorageSize(props.row.size) }}
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
import { storeToRefs } from 'pinia'
import { date, format } from 'quasar'
import { onMounted, ref, watch } from 'vue'

import { useSessionStore } from '@/stores/SessionStore'
import { getDocIcon, isFolder, isSupported3DFormat } from '@/utils/file'

const $session = useSessionStore()

const showLoading = ref(false)
const docs = ref([])

const { humanStorageSize } = format
const { searchPN, currentPath } = storeToRefs($session)

const doSearch = (val) => {
  searchPN.value = val

  if (val && val.length >= 3) {
    showLoading.value = true
    axios
      .get('/docs-api/searchDocs' + '?PN=' + val)
      .then((res) => {
        docs.value = res.data
      })
      .catch(() => {})
      .finally(() => {
        showLoading.value = false
      })
  } else {
    doList()
  }
}

const doList = () => {
  showLoading.value = true
  axios
    .get(currentPath.value)
    .then((res) => {
      docs.value = res.data
    })
    .catch(() => {})
    .finally(() => {
      showLoading.value = false
    })
}

const goTo = (url) => {
  if (isFolder(url)) {
    currentPath.value = url
    doList()
  } else if (isSupported3DFormat(url)) {
    window.open('/docs-web/o3dv/3DViewer.html#model=' + url)
  } else {
    window.open(url)
  }
}

watch(currentPath, doList)

onMounted(() => {
  if (searchPN.value && searchPN.value.length >= 3) {
    doSearch(searchPN.value)
  } else {
    doList()
  }
})
</script>
