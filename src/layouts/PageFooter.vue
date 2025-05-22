<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-04-04 23:04:05
* @FilePath              : docs-web/src/layouts/PageFooter.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-footer :style="'height:' + height + 'px'">
    <q-bar class="fit flex-center footer">
      <div>
        <span class="q-pa-ms">{{ $t('S.DEVELOPED_BY') }} | {{ $t('S.POWERED_BY') }}</span>
      </div>
    </q-bar>
  </q-footer>
</template>

<script setup>
/* eslint-disable */
const props = defineProps({
  height: {
    type: Number,
    required: false,
    default: 18
  }
})
</script>
<style lang="scss" scoped>
.footer {
  background-color: grey;
}
.footer div {
  color: white;
  font-size: 10px;
}
</style>
