<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 22:51:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-07-16 20:34:45
* @FilePath              : docs-web/src/layouts/PageHeader.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-header elevated style="height: 40px">
    <q-toolbar style="min-height: 40px">
      <NaviHome />
      <PathBreadcrumbs />

      <q-toolbar-title>
        <span style="font-size: 22px; padding-left: 10px"></span>
      </q-toolbar-title>

      <FileUpload />
      <BusinessPartnerInfo />
      <SelectLanguage />
      <UserInfo />
      <LogOut />

      <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer"></q-btn> -->
    </q-toolbar>
  </q-header>
</template>

<script setup>
import BusinessPartnerInfo from 'src/components/BusinessPartnerInfo.vue'
import FileUpload from 'src/components/FileUpload.vue'
import LogOut from 'src/components/LogOut.vue'
import NaviHome from 'src/components/NaviHome.vue'
import PathBreadcrumbs from 'src/components/PathBreadcrumbs.vue'
import SelectLanguage from 'src/components/SelectLanguage.vue'
import UserInfo from 'src/components/UserInfo.vue'
</script>
