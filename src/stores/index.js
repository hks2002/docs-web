/*******************************************************************************
 * @Author                : <>                                                 *
 * @CreatedDate           : 2025-07-16 20:51:17                                *
 * @LastEditors           : <>                                                 *
 * @LastEditDate          : 2026-06-13 17:08:02                                *
 * @FilePath              : docs-web/src/stores/index.js                       *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                    *
 ******************************************************************************/
import { defineStore } from '#q-app'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineStore((/* { ssrContext } */) => {
  const pinia = createPinia()

  pinia.use(piniaPluginPersistedstate)

  return pinia
})
