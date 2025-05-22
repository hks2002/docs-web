/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : Invalid Date                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-05-23 19:14:29                               *
 * @FilePath              : docs-web/src/stores/SessionStore.js               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSessionStore = defineStore('SessionStore', {
  state: () => ({
    userInfo: '',
    homePath: '/docs-api/docs',
    currentPath: '/docs-api/docs',
    searchPN: '',
    BPCode: '',
    BPName: '',
  }),
  persist: {
    enabled: true,
    storage: sessionStorage,
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSessionStore, import.meta.hot))
}
