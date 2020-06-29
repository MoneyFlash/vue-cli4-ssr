// entry-client.js

import { createApp } from './main'
import Vue from 'vue'

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

Vue.mixin({
  data () {
    return {
      dataPromise: null
    }
  },
  beforeMount () {
    const { asyncData } = (this as any).$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      (this as any).dataPromise = asyncData({
        store: (this as any).$store,
        route: (this as any).$route
      })
    }
  }
})

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = (this as any).$options
    if (asyncData) {
      asyncData({
        store: (this as any).$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

router.onReady(() => {
  app.$mount('#app')
})
