/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-04-19 19:56:19                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-07-16 00:50:59                               *
 * @FilePath              : docs-web/src/router/index.js                      *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { defineRouter } from '#q-app/wrappers'
import { Router } from 'src/boot/router.js'

/**
 * This file is moved to `src/boot/router.js`
 * It export Router, so that non Vue template files could use Router.
 *
 * import { useRouter } from 'vue-router'
 * const $router = useRouter()
 *         ||
 *         \/
 * import { Router } from 'src/boot/router'
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  return Router
})
