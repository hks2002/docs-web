<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 00:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-08-13 10:04:40
* @FilePath              : docs-web/src/components/DocsTable0.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-table
    dense
    selection="single"
    :title="$t('S.DOCS_IN{LOCATION}', { LOCATION: 'DOCS' })"
    row-key="name"
    table-header-style="background-color: rgb(101, 36, 161); color: white"
    :rows="docs"
    :columns="[
      { name: 'name', label: $t('F.FILE_NAME'), align: 'left', field: 'name' },
      {
        name: 'size',
        align: 'right',
        label: $t('F.SIZE'),
        field: 'size',
        format: (val) => renderFileSize(val),
      },
      {
        name: 'lastModified',
        label: $t('F.LAST_MODIFIED_DATE'),
        field: 'lastModified',
        format: (val) => {
          return new Date(val).toLocaleString()
        },
      },
    ]"
    :loading="showLoading"
    :rows-per-page-options="[0]"
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
          clearable
          outlined
          debounce="2000"
          input-style="font-weight:bolder;text-transform:uppercase"
          :placeholder="$t('S.DOC_SEARCH')"
          :model-value="searchPN"
          @update:model-value="doSearch"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </template>
    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <q-icon
          :name="
            props.row.isDirectory ? 'img:/docs-web/imgs/folder.svg' : getDocIcon(props.row.name)
          "
          size="xs"
        ></q-icon>
        {{ props.row.name }}
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
import { onMounted, ref, watch } from 'vue'

import { getDocIcon, isFolder, renderFileSize } from 'src/assets/file'
import { useSessionStore } from 'src/stores/SessionStore'

const showLoading = ref(false)
const docs = ref([])

const { searchPN, currentPath } = storeToRefs(useSessionStore())

const doSearch = (val) => {
  if (val && val.length >= 3) {
    searchPN.value = val
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
