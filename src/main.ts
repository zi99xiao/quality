import {createApp} from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import zhCn from "element-plus/es/locale/lang/zh-cn";
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import {createPinia} from "pinia";
import router from './router/router';
import 'vue3-starry-sky/lib/style.css';
import globalComponent from "./components/index";

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn,
});
// 使用自定义全局插件注册全局组件
app.use(globalComponent)
// 全局导入ElementPlusIcon组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
