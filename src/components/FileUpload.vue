<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 11:51:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-05-12 17:58:22
* @FilePath              : docs-web/src/components/FileUpload.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-file
    v-model="filesToBeUpload"
    :label="$t('S.UPLOAD_FILES')"
    dense
    borderless
    clearable
    multiple
    color="white"
    label-color="orange"
    input-class="text-white"
    @update:model-value="doUploadFiles"
  >
    <template v-slot:prepend>
      <q-icon name="cloud_upload" color="orange" />
    </template>
  </q-file>
</template>

<script setup>
import { Notify } from 'quasar'
import { axios } from 'src/boot/axios'
import { ref } from 'vue'

const filesToBeUpload = ref(null)
const doUploadFiles = (files) => {
  if (!files) return

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    console.debug(`FileName: ${file.name}, Size: ${file.size} bytes, Type: ${file.type}`)
    doUploadFile(file)
  }
  filesToBeUpload.value = null
}

const doUploadFile = (file) => {
  const formData = new FormData()
  formData.append('file', file) // 'file' 是服务器端用来接收文件的字段名，可以根据实际情况调整

  axios
    .post('/docs-api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Last-Modified': file.lastModified,
      },
    })
    .then((response) => {
      response.data.success
        ? Notify.create({
            type: 'positive',
            position: 'top',
            message: response.data.msg || 'Success',
          })
        : Notify.create({
            type: 'negative',
            position: 'top',
            message: response.data.msg || 'Failed',
          })
    })
    .catch(() => {})
}
</script>
