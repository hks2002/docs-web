<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 14:55:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-06-10 14:46:28
* @FilePath              : docs-web/src/components/UserInfo.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <span class="q-mx-none"> <q-icon size="32px" name="person" />{{ userInfo }} </span>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { Router } from '@/router'
import { useSessionStore } from '@/stores/SessionStore'
import { createWS } from '@/ws/ws'

const { userInfo, userName } = storeToRefs(useSessionStore())
if (userInfo.value.length === 0) {
  Router.push({ name: 'LoginPage' })
}

createWS(userName.value, userInfo.value)
</script>
