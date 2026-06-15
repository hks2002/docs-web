<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 23:26:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-06-13 23:02:59
* @FilePath              : docs-web/src/pages/IndexPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-3">
        <DocsTable0 />
      </div>

      <div class="col-3">
        <DocsTable1 />
      </div>

      <div class="col-3">
        <DocsTable2 />
      </div>

      <div class="col-3">
        <AccessLog />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import AccessLog from '@/components/AccessLog.vue'
import DocsTable0 from '@/components/DocsTable0.vue'
import DocsTable1 from '@/components/DocsTable1.vue'
import DocsTable2 from '@/components/DocsTable2.vue'
</script>
