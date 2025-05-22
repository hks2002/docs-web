<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-21 00:58:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-04-21 01:34:09
* @FilePath              : docs-web/src/components/LogOut.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-btn dense flat size="sm" icon="logout" @click="doLogout">
    <q-tooltip>{{ $t('S.EXIT') }}</q-tooltip>
  </q-btn>
</template>
<script setup>
import { axios } from 'src/boot/axios'
import { useRouter } from 'vue-router'

const $router = useRouter()

const doLogout = () => {
  axios
    .post('/docs-api/logout')
    .then(() => {
      $router.push({ name: 'LoginPage' })
    })
    .catch((error) => {
      console.error('Logout error:', error)
    })
}
</script>
