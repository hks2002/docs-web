/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-04-20 14:57:29                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-07-16 20:32:34                               *
 * @FilePath              : docs-web/src/boot/router.js                       *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import routes from 'src/router/routes.js'
import { useSessionStore } from 'src/stores/SessionStore.js'

/**
 * This file is moved from `src/router/index.js`
 * It export Router, so that non Vue template files could use Router.
 *
 * import { useRouter } from 'vue-router'
 * const $router = useRouter()
 *         ||
 *         \/
 * import { Router } from 'src/boot/router'
 */

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.VUE_ROUTER_BASE),
})

Router.beforeEach(async (to, from, next) => {
  if (to.path === from.path) {
    next()
    return false
  }

  let { userInfo } = useSessionStore()

  // always allow goto Login/WaitInput/Exception page
  if (to.path === '/Login' || to.path === '/WaitInput' || to.path.startsWith('/Exception')) {
    next()
  }
  // no userInfo, goto login page
  else if (!userInfo) {
    next({ path: '/Login' })
  } else {
    // default, alway pass it
    next()
  }
})

export { Router }
