<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 14:55:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-07-16 00:14:37
* @FilePath              : docs-web/src/components/UserInfo.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <span class="q-mx-none"> <q-icon name="person" size="32px" />{{ userInfo }} </span>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useSessionStore } from 'src/stores/SessionStore'

const { userInfo } = storeToRefs(useSessionStore())
</script>
