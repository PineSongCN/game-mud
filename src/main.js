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

import clipboard from '@/directive/focus.js';

import Vant from 'vant';
import 'vant/lib/index.css';
import '@vant/touch-emulator';
import Web3ModalMixin from '@/utils/mixin.js';
const Web3ModalOptions = {
    network: 'mainnet', // optional
    cacheProvider: true, // optional
    disableInjectedProvider: false, // optional
    providerOptions: {
        // required
        // ...
    },
    theme: {
        // optional
        //  ...
    }
};

// import Web3 from 'web3';
// import Web3Modal from 'web3modal';

// const providerOptions = {
//     /* See Provider Options Section */
// };

// const web3Modal = new Web3Modal({
//     network: 'mainnet', // optional
//     cacheProvider: true, // optional
//     providerOptions // required
// });

// const provider = await web3Modal.connect();

// const web3 = new Web3(provider);

// Vue.prototype.$web3 = web3;

Vue.use(Vant);

Vue.use(Element, {
    size: Cookies.get('size') || 'mini' // set element-ui default size medium
    // locale: enLang // 如果使用中文，无需设置
});
Vue.use(clipboard);

// register global utility filters
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    mixins: [Web3ModalMixin],
    Web3ModalOptions,
    render: (h) => h(App)
});
