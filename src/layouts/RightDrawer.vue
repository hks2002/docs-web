<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 22:51:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-01-07 18:25:09
* @FilePath              : docs-web/src/layouts/RightDrawer.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->


<template>
  <q-drawer
    side="right"
    v-model="drawerRight"
    bordered
    :width="500"
    :breakpoint="800"
    class="bg-grey-3"
  >
    <q-scroll-area class="fit">
      <AccessLog />
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import AccessLog from 'src/components/AccessLog.vue'

import { useLocalStore } from 'src/stores/LocalStore'

const { drawerRight } = storeToRefs(useLocalStore())
</script>
