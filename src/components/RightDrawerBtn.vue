<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-21 00:58:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-05-26 10:02:50
* @FilePath              : docs-web/src/components/RightDrawerBtn.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-btn v-if="ADMIN" flat round dense icon="settings" @click="drawerRight = !drawerRight">
    <q-tooltip>{{ $t('S.SETTINGS') }}</q-tooltip>
  </q-btn>
</template>
<script setup>
import { storeToRefs } from 'pinia'

import { useLocalStore } from 'src/stores/LocalStore'
import { useSessionStore } from 'src/stores/SessionStore'

const { drawerRight } = storeToRefs(useLocalStore())

const { ADMIN } = storeToRefs(useSessionStore())
</script>
