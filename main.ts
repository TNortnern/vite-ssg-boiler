// register vue composition api globally
import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
// import VueSmoothScroll from 'vue3-smooth-scroll'
// import VueObserveVisibility from 'vue3-observe-visibility2'
import App from './App.vue'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// your custom styles here
import './styles/main.css'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'
// import { registerScrollSpy, Easing } from 'vue3-scroll-spy'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    const globalMixin = {
      computed: {
        activeHash() {
          return this.$route.hash
        },
      },
    }
    const { app } = ctx
    // app.use(VueSmoothScroll)
    app.mixin(globalMixin)
    // app.use(VueObserveVisibility)

    // or custom global options
    // registerScrollSpy(app, {
    //   easing: Easing.Cubic.In
    // })
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
  },
)
