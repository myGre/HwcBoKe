import router from './router/index';
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { localGet, handleRouter } from './utils';

import { userInfoStore } from './store/modules/userStore';
import { routerStore } from './store/modules/routerStore/index.js';

const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, from, next) => {

  const store = userInfoStore();
  const state = routerStore();

  console.log(to.path);
  NProgress.start()

  const token = localGet('token')

  // 如果有token
  if (token) {
    if (to.path === '/login') {
      next({ path: '/home' });
      NProgress.done()

    } else {
      try {
        // 派发pinia，获取用户信息
        let user = await store.setUser()
        let routes = handleRouter(router.options.routes, user.roleId)

        // 存储路由导航
        state.setRoutes(routes);
        // 当前要去的路由导航
        state.setCurrentRoute(to.path);
        next()
        NProgress.done()
      } catch (error) {
        console.log(error);
      }
    }

  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      ElMessage({
        message: "token失效",
        type: 'error',
      })
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})