<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 17:19:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-07-16 00:14:31
* @FilePath              : docs-web/src/components/PathBreadcrumbs.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <span class="q-gutter-sm">
    <q-breadcrumbs separator="/" class="text-orange" active-color="accent">
      <q-breadcrumbs-el
        :label="folder.name"
        icon="widgets"
        @click="changeCurrentPath(folder.path)"
        :key="folder.path"
        v-for="folder in folders"
      >
      </q-breadcrumbs-el>
    </q-breadcrumbs>
  </span>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { getFolders } from 'src/assets/file'
import { useSessionStore } from 'src/stores/SessionStore'

const { currentPath } = storeToRefs(useSessionStore())
const folders = computed(() => {
  return getFolders(currentPath.value)
})

const changeCurrentPath = (path) => {
  currentPath.value = path
}
</script>
