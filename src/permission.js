import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['Web3']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();
    document.title = getPageTitle(to.meta.title);
    const web3Account = store.getters.web3Account;
    if (web3Account) {
        if (whiteList.includes(to.name)) {
            next('/');
        } else {
            next();
        }
    } else {
        if (whiteList.includes(to.name)) {
            next();
        } else {
            next('/web3');
        }
    }
    NProgress.done();
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
