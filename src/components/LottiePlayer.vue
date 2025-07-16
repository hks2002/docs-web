<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-10-09 17:38:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-07-16 20:33:38
* @FilePath              : docs-web/src/components/LottiePlayer.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <div ref="lottiePlayer"></div>
</template>
<script setup>
//import lottie from 'lottie-web'
import lottie from 'lottie-web/build/player/lottie.min.js'
import { onMounted, ref } from 'vue'

const props = defineProps({
  animationLink: {
    type: String,
    required: true,
  },
  animationData: {
    type: Object,
    default: null,
    required: false,
  },
  loop: {
    type: [Boolean, Number],
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  background: {
    type: String,
    default: 'transparent',
  },
})

let lottiePlayer = ref(null)
onMounted(() => {
  if (lottiePlayer.value) {
    lottie.loadAnimation({
      container: lottiePlayer.value,
      renderer: 'svg',
      loop: props.loop,
      autoplay: props.autoplay,
      animationData: props.animationData,
      path: props.animationLink,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        progressiveLoad: true,
        background: props.background,
      },
    })
  }
})
</script>
