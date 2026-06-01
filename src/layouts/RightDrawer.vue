<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 22:51:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-05-26 10:21:13
* @FilePath              : docs-web/src/layouts/RightDrawer.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-drawer
    side="right"
    v-if="drawerRight"
    v-model="drawerRight"
    bordered
    :width="1000"
    :breakpoint="800"
    class="bg-grey-3"
  >
    <q-scroll-area class="fit">
      <q-card class="q-gutter-sm">
        <CleanNonExists />
        <CleanDuplicate />
      </q-card>
      <UserFuncMatrix />
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import CleanDuplicate from 'src/components/CleanDuplicate.vue'
import CleanNonExists from 'src/components/CleanNonExists.vue'
import UserFuncMatrix from 'src/components/UserFuncMatrix.vue'

import { useLocalStore } from 'src/stores/LocalStore'

const { drawerRight } = storeToRefs(useLocalStore())
</script>
