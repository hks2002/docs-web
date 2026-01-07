<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 14:55:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-01-07 18:28:34
* @FilePath              : docs-web/src/components/UserInfo.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->


<template>
  <span class="q-mx-none"> <q-icon name="person" size="32px" />{{ userInfo }} </span>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { createWS } from 'src/assets/ws'
import { Router } from 'src/boot/router.js'
import { useSessionStore } from 'src/stores/SessionStore'

const { userInfo, userName } = storeToRefs(useSessionStore())
if (userInfo.value.length === 0) {
  Router.push({ name: 'LoginPage' })
}

createWS(userName.value, userInfo.value)
</script>
