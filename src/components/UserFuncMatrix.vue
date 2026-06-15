<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-06 00:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-05-26 16:12:33
* @FilePath              : docs-web/src/components/UserFuncMatrix.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-table
    v-model:pagination="pagination"
    dense
    row-key="id"
    table-header-style="background-color: rgb(101, 36, 161); color: white"
    :rows="userFuncs"
    :loading="showLoading"
    :rows-per-page-options="[10, 20, 50, 100, 200, 500, 1000]"
    :columns="[
      { name: 'id', label: $t('F.ID'), align: 'left', field: 'id' },
      { name: 'loginName', label: $t('F.LOGIN_NAME'), align: 'left', field: 'login_name' },
      { name: 'firstName', label: $t('F.FIRST_NAME'), align: 'left', field: 'first_name' },
      { name: 'lastName', label: $t('F.LAST_NAME'), align: 'left', field: 'last_name' },
      { name: 'email', label: $t('F.EMAIL'), align: 'left', field: 'email' },
      { name: 'admin', label: $t('F.ADMIN'), align: 'left', field: 'admin_enable' },
      { name: 'read', label: $t('F.READ'), align: 'left', field: 'read_enable' },
      { name: 'write', label: $t('F.WRITE'), align: 'left', field: 'write_enable' },
    ]"
  >
    <template v-slot:loading>
      <q-inner-loading :showing="showLoading">
        <q-spinner-ios size="50px" color="primary" />
      </q-inner-loading>
    </template>
    <template v-slot:body-cell-admin="{ row }">
      <td>
        <q-checkbox
          v-model="row.admin_enable"
          color="primary"
          :true-value="1"
          :false-value="0"
          @update:model-value="updateAdmin(row)"
        />
      </td>
    </template>
    <template v-slot:body-cell-read="{ row }">
      <td>
        <q-checkbox
          v-model="row.read_enable"
          color="primary"
          :true-value="1"
          :false-value="0"
          @update:model-value="updateRead(row)"
        />
      </td>
    </template>
    <template v-slot:body-cell-write="{ row }">
      <td>
        <q-checkbox
          v-model="row.write_enable"
          color="primary"
          :true-value="1"
          :false-value="0"
          @update:model-value="updateWrite(row)"
        />
      </td>
    </template>
    <template v-slot:pagination="scope">
      <div>Page {{ scope.pagination.page }} of {{ scope.pagesNumber }}</div>
      <q-btn
        v-if="scope.pagesNumber > 2"
        flat
        round
        dense
        color="grey-8"
        icon="first_page"
        :disable="scope.isFirstPage"
        @click="scope.firstPage"
      />
      <q-btn
        flat
        round
        dense
        color="grey-8"
        icon="chevron_left"
        :disable="scope.isFirstPage"
        @click="scope.prevPage"
      />

      <q-btn
        flat
        round
        dense
        color="grey-8"
        icon="chevron_right"
        :disable="scope.isLastPage"
        @click="scope.nextPage"
      />

      <q-btn
        v-if="scope.pagesNumber > 2"
        flat
        round
        dense
        color="grey-8"
        icon="last_page"
        :disable="scope.isLastPage"
        @click="scope.lastPage"
      />
    </template>
  </q-table>
</template>

<script setup>
import axios from 'axios'
import { Notify } from 'quasar'
import { onMounted, ref } from 'vue'

const showLoading = ref(false)
const userFuncs = ref([])
const pagination = ref({
  page: 1,
  rowsPerPage: 20,
})
const listCount = ref(200)

const doList = () => {
  showLoading.value = true
  axios
    .get(
      `/docs-api/userFuncMatrix?offset=${(pagination.value.page - 1) * pagination.value.rowsPerPage}&limit=${listCount.value}`,
    )
    .then((res) => {
      userFuncs.value = res.data
    })
    .catch(() => {})
    .finally(() => {
      showLoading.value = false
    })
}

const updateAdmin = (row) => {
  if (row.admin_id === null) {
    axios
      .post('/docs-api/userFuncAdd', {
        user_id: row.id,
        func_id: 1,
        enable: 1,
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
      .catch(() => {
        row.admin_enable = false
      })
      .finally(() => {
        showLoading.value = false
      })
  } else {
    axios
      .post('/docs-api/userFuncModify', {
        id: row.admin_id,
        user_id: row.id,
        func_id: 1,
        enable: row.admin_enable,
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
      .catch(() => {
        row.admin_enable = !row.admin_enable
      })
      .finally(() => {
        showLoading.value = false
      })
  }
}
const updateRead = (row) => {
  if (row.read_id === null) {
    axios
      .post('/docs-api/userFuncAdd', {
        user_id: row.id,
        func_id: 2,
        enable: 1,
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
      .catch(() => {
        row.read_enable = false
      })
      .finally(() => {
        showLoading.value = false
      })
  } else {
    axios
      .post('/docs-api/userFuncModify', {
        id: row.read_id,
        user_id: row.id,
        func_id: 2,
        enable: row.read_enable,
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
      .catch(() => {
        row.read_enable = !row.read_enable
      })
      .finally(() => {
        showLoading.value = false
      })
  }
}
const updateWrite = (row) => {
  if (row.write_id === null) {
    axios
      .post('/docs-api/userFuncAdd', {
        user_id: row.id,
        func_id: 3,
        enable: 1,
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
      .catch(() => {
        row.write_enable = false
      })
      .finally(() => {
        showLoading.value = false
      })
  } else {
    axios
      .post('/docs-api/userFuncModify', {
        id: row.write_id,
        user_id: row.id,
        func_id: 3,
        enable: row.write_enable,
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
      .catch(() => {
        row.write_enable = !row.write_enable
      })
      .finally(() => {
        showLoading.value = false
      })
  }
}

onMounted(() => {
  doList()
})
</script>
