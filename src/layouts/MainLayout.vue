<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-04-20 14:47:02
* @FilePath              : docs-web/src/layouts/MainLayout.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-layout view="hHh Lpr lFf">
    <PageHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

    <PageFooter />
  </q-layout>
</template>

<script setup>
import PageFooter from 'src/layouts/PageFooter.vue'
import PageHeader from 'src/layouts/PageHeader.vue'
</script>
