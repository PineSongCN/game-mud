import Vue from 'vue';

import Cookies from 'js-cookie';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets

import Element from 'element-ui';
import './styles/element-variables.scss';
import enLang from 'element-ui/lib/locale/lang/en'; // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';

import './icons'; // icon
import './permission'; // permission control
import './utils/error-log'; // error log

import * as filters from './filters'; // global filters

import clipboard from '@/directive/focus.js'

import Vant from 'vant';
import 'vant/lib/index.css';
import '@vant/touch-emulator';

Vue.use(Vant);

Vue.use(Element, {
    size: Cookies.get('size') || 'mini', // set element-ui default size medium
    // locale: enLang // 如果使用中文，无需设置
});
Vue.use(clipboard);

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
