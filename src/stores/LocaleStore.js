/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : NaN-NaN-NaN NaN:NaN:NaN                            *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-13 23:27:54                                *
 * @FilePath              : docs-web/src/stores/LocaleStore.js                 *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                    *
 ******************************************************************************/
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLocaleStore = defineStore('LocaleStore', {
  state: () => ({
    locale: 'en-US',
    drawerRight: false,
    drawerLeft: false,
    waterMarkerNotified: false,
  }),
  persist: {
    enabled: true,
    storage: localStorage,
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLocaleStore, import.meta.hot))
}
