<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 14:55:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-04-25 10:41:29
* @FilePath              : docs-web/src/components/BusinessPartnerInfo.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <span v-if="!BPCode || BPCode.length != 5" style="color: white" class="q-px-sm">
    {{ $t('S.DO_NOT_FORGET_BP_NAME') }}
  </span>
  <span class="q-px-sm">
    <q-input
      dense
      clearable
      debounce="1000"
      color="white"
      input-class="text-orange"
      :placeholder="$t('S.BP_CODE')"
      v-model="BPCode"
      @update:model-value="searchBP"
    >
    </q-input>
  </span>
  <span class="q-px-sm">
    <q-icon name="people" color="primary" size="32px"></q-icon>{{ BPName }}
  </span>
</template>

<script setup>
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useSessionStore } from 'src/stores/SessionStore.js'

const { BPCode, BPName } = storeToRefs(useSessionStore())

const searchBP = () => {
  if (BPCode.value && BPCode.value.length === 5) {
    axios
      .get('/docs-api/searchBP' + '?BP_CODE=' + BPCode.value)
      .then((response) => {
        if (response.data.success) {
          BPName.value = response.data.msg.BPName
        }
      })
      .catch(() => {})
  } else {
    BPCode.value = ''
    BPName.value = ''
  }
}

onMounted(() => {
  searchBP()
})
</script>
