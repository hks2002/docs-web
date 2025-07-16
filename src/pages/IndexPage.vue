<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 23:26:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-07-16 00:11:34
* @FilePath              : docs-web/src/pages/IndexPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-6">
        <DocsTable0 />
      </div>

      <div class="col-3">
        <DocsTable1 />
      </div>

      <div class="col-3">
        <DocsTable2 />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { Cookies } from 'quasar'
import { onMounted, onUnmounted } from 'vue'

import DocsTable0 from 'src/components/DocsTable0.vue'
import DocsTable1 from 'src/components/DocsTable1.vue'
import DocsTable2 from 'src/components/DocsTable2.vue'

import { Router } from 'src/boot/router'
import { useSessionStore } from 'src/stores/SessionStore'

let timer = null

const checkSession = () => {
  const { userInfo } = storeToRefs(useSessionStore())
  if (userInfo.value.length === 0) {
    Cookies.remove('vertx-web.session')
    Router.push({ name: 'LoginPage' })
    return
  }

  axios
    .get('/docs-api/check-session')
    .then((response) => {
      if (response.data.success) {
        console.info(response.data.msg)
      }
    })
    .catch(() => {})
}

onMounted(() => {
  checkSession() // run once at start

  timer = setInterval(checkSession, 1000 * 60 * 30) // must greater than backend session timeout
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
