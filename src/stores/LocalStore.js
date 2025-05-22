/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : Invalid Date                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-04-20 00:20:49                               *
 * @FilePath              : docs-web/src/stores/LocalStore.js                 *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLocalStore = defineStore('LocalStore', {
  state: () => ({
    locale: 'en-US',
  }),
  persist: {
    enabled: true,
    storage: localStorage,
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocalStore, import.meta.hot))
}
