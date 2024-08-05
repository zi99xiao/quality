import {createApp} from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import zhCn from "element-plus/es/locale/lang/zh-cn";
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import {createPinia} from "pinia";
import router from './router/router.ts';
import 'vue3-starry-sky/lib/style.css';

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
