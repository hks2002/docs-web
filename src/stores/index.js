/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-07-16 20:51:17                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-07-16 20:51:27                               *
 * @FilePath              : docs-web/src/stores/index.js                      *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { defineStore } from '#q-app/wrappers'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default defineStore((/* { ssrContext } */) => {
  const pinia = createPinia()

  // You can add Pinia plugins here
  pinia.use(piniaPluginPersistedstate)

  return pinia
})
