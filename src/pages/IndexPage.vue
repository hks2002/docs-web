<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2025-04-05 23:26:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2026-01-07 18:33:09
* @FilePath              : docs-web/src/pages/IndexPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->


<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-4">
        <DocsTable0 />
      </div>

      <div class="col-4">
        <DocsTable1 />
      </div>

      <div class="col-4">
        <DocsTable2 />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import DocsTable0 from 'src/components/DocsTable0.vue'
import DocsTable1 from 'src/components/DocsTable1.vue'
import DocsTable2 from 'src/components/DocsTable2.vue'
</script>
