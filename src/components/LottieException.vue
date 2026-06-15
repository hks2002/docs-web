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
    class="flex fixed-center"
    :width="400"
    :height="400"
    :animationLink="'json/' + ErrorCode + '.json'"
  />
</template>

<script setup>
import LottiePlayerVue from '@/components/LottiePlayer.vue'

/* eslint-disable */
const props = defineProps(['ErrorCode'])
</script>
