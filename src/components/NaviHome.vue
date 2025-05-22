<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 22:41:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-04-21 13:22:47
* @FilePath              : docs-web/src/components/NaviHome.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-btn dense flat round size="sm" class="q-mr-xs" @click="goHome">
    <q-avatar dense>
      <q-img src="imgs/logo.png" style="background-color: white"></q-img>
    </q-avatar>
  </q-btn>
</template>
<script setup>
import { useSessionStore } from 'src/stores/SessionStore.js'

const goHome = async () => {
  useSessionStore().currentPath = useSessionStore().homePath
}
</script>
