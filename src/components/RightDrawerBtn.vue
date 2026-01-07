<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-21 00:58:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-01-07 16:45:18
* @FilePath              : docs-web/src/components/AccessLogBtn.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->


<template>
  <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu">
    <q-tooltip>{{ $t('S.DOC_ACCESS_LOG') }}</q-tooltip>
  </q-btn>
</template>
<script setup>
import { storeToRefs } from 'pinia'

import { useLocalStore } from 'src/stores/LocalStore'

const { drawerRight } = storeToRefs(useLocalStore())
</script>
