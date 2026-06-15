<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 22:51:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-06-13 23:02:46
* @FilePath              : docs-web/src/layouts/RightDrawer.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-drawer
    v-if="drawerRight"
    v-model="drawerRight"
    bordered
    side="right"
    class="bg-grey-3"
    :width="1000"
    :breakpoint="800"
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

import CleanDuplicate from '@/components/CleanDuplicate.vue'
import CleanNonExists from '@/components/CleanNonExists.vue'
import UserFuncMatrix from '@/components/UserFuncMatrix.vue'
import { useLocaleStore } from '@/stores/LocaleStore'

const { drawerRight } = storeToRefs(useLocaleStore())
</script>
