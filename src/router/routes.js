/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-04-06 21:20:18                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-04-20 03:33:25                               *
 * @FilePath              : docs-web/src/router/routes.js                     *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'IndexPage', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/',
    name: 'DefaultLayout',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { path: 'Login', name: 'LoginPage', component: () => import('pages/LoginPage.vue') },
      {
        path: 'Exception/:ErrorCode',
        name: 'Exception',
        component: () => import('pages/ExceptionPage.vue'),
        props: (route) => {
          if (
            route.params.ErrorCode !== '403' &&
            route.params.ErrorCode !== '404' &&
            route.params.ErrorCode !== '500'
          ) {
            return { ErrorCode: '500' }
          } else {
            return { ErrorCode: route.params.ErrorCode }
          }
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/DefaultLayout.vue'),
    redirect: '/Exception/404',
  },
]

export default routes
