<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 01:49:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-07-16 14:32:55
* @FilePath              : docs-web/src/pages/ExceptionPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page><LottieExceptionVue :ErrorCode="ErrorCode" /></q-page>
</template>

<script setup>
import LottieExceptionVue from 'src/components/LottieException.vue'

/* eslint-disable */
const props = defineProps(['ErrorCode'])
</script>
