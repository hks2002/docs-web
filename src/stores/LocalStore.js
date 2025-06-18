/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : Invalid Date                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-06-19 01:58:43                               *
 * @FilePath              : docs-web/src/stores/LocalStore.js                 *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLocalStore = defineStore('LocalStore', {
  state: () => ({
    locale: 'en-US',
    waterMarkerNotified: false,
  }),
  persist: {
    enabled: true,
    storage: localStorage,
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocalStore, import.meta.hot))
}
