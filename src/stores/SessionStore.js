/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : NaN-NaN-NaN NaN:NaN:NaN                            *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-05-25 13:34:00                                *
 * @FilePath              : docs-web/src/stores/SessionStore.js                *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                    *
 ******************************************************************************/
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSessionStore = defineStore('SessionStore', {
  state: () => ({
    userInfo: '',
    userName: '',
    homePath: '/docs-api/docs',
    currentPath: '/docs-api/docs',
    searchPN: '',
    BPCode: '',
    BPName: '',
    DOCS_WRITE: false,
    DOCS_READ: false,
    ADMIN: false,
  }),
  persist: {
    enabled: true,
    storage: sessionStorage,
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSessionStore, import.meta.hot))
}
