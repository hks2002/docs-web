/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-04-19 19:56:19                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-13 23:08:54                                *
 * @FilePath              : docs-web/src/router/index.js                       *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                    *
 ******************************************************************************/
import { defineRouter } from '#q-app'

import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import routes from '@/router/routes.js'
import { useSessionStore } from '@/stores/SessionStore.js'

/**
 * This file is moved from `src/router/index.js`
 * It export Router, so that non Vue template files could use Router.
 *
 * import { useRouter } from 'vue-router'
 * const $router = useRouter()
 *         ||
 *         \/
 * import { Router } from '@/router'
 */

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const createHistory = import.meta.env.SERVER
  ? createMemoryHistory
  : import.meta.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(import.meta.env.VUE_ROUTER_BASE),
})

Router.beforeEach(async (to /*from*/) => {
  let { userInfo } = useSessionStore()

  // always allow goto Login/WaitInput/Exception/3DViewer page
  if (to.path === '/Login' || to.path === '/WaitInput' || to.path.startsWith('/Exception')) {
    return undefined
  }
  // no userInfo, goto login page
  else if (!userInfo) {
    return { path: '/Login' }
  } else {
    // default, alway pass it
    return undefined
  }
})

export { Router }
export default defineRouter(function (/* { store, ssrContext } */) {
  return Router
})
