<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-05-29 19:44:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-07-16 14:31:18
* @FilePath              : docs-web/src/components/ExceptionLottie.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <LottiePlayerVue
    :animationLink="'json/' + ErrorCode + '.json'"
    :height="400"
    :width="400"
    class="flex fixed-center"
  />
</template>

<script setup>
import LottiePlayerVue from 'src/components/LottiePlayer.vue'

/* eslint-disable */
const props = defineProps(['ErrorCode'])
</script>
