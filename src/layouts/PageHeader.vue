<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 22:51:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-06-13 23:02:39
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
      <RightDrawerBtn />
      <LogOut />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import BusinessPartnerInfo from '@/components/BusinessPartnerInfo.vue'
import FileUpload from '@/components/FileUpload.vue'
import LogOut from '@/components/LogOut.vue'
import NaviHome from '@/components/NaviHome.vue'
import PathBreadcrumbs from '@/components/PathBreadcrumbs.vue'
import RightDrawerBtn from '@/components/RightDrawerBtn.vue'
import SelectLanguage from '@/components/SelectLanguage.vue'
import UserInfo from '@/components/UserInfo.vue'
</script>
