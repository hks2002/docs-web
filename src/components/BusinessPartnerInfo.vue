<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 14:55:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-07-16 00:18:52
* @FilePath              : docs-web/src/components/BusinessPartnerInfo.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <span v-if="!BPCode || BPCode.length != 5" class="q-px-sm" style="color: white">
    {{ $t('S.DO_NOT_FORGET_BP_NAME') }}
  </span>
  <span class="q-px-sm">
    <q-input
      v-model="BPCode"
      dense
      clearable
      color="white"
      debounce="2000"
      input-class="text-orange"
      :placeholder="$t('S.BP_CODE')"
      @update:model-value="searchBP"
    >
    </q-input>
  </span>
  <span class="q-px-sm">
    <q-icon size="32px" name="people" color="primary"></q-icon>{{ BPName }}
  </span>
</template>

<script setup>
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useLocaleStore } from '@/stores/LocaleStore'
import { useSessionStore } from '@/stores/SessionStore'

const { BPCode, BPName } = storeToRefs(useSessionStore())
const { waterMarkerNotified } = storeToRefs(useLocaleStore())

const $q = useQuasar()
const { t } = useI18n()

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

const firstTimeNotice = () => {
  if (!waterMarkerNotified.value) {
    $q.dialog({
      title: t('S.CONFIRM'),
      message: t('S.DO_YOU_KNOWN') + '\n' + t('S.DO_NOT_FORGET_BP_NAME'),
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        waterMarkerNotified.value = true
      })
      .onCancel(() => {
        // console.log('>>>> Cancel')
      })
      .onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
  }
}

onMounted(() => {
  firstTimeNotice()
  searchBP()
})
</script>
