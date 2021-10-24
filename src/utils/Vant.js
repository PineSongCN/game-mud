import {
    Button,
    Field,
    Sticky,
    Image,
    Popup,
    Toast,
    Dialog,
    Loading,
    Notify,
    Divider,
    Empty,
    Lazyload,
    Skeleton,
    Tabbar,
    TabbarItem,
    NavBar
} from 'vant';

const install = function (Vue, opts = {}) {
    Vue.use(Button);
    Vue.use(Field);
    Vue.use(Sticky);
    Vue.use(Image);
    Vue.use(Popup);
    Vue.use(Toast);
    Vue.use(Dialog);
    Vue.use(Loading);
    Vue.use(Notify);
    Vue.use(Divider);
    Vue.use(Empty);
    Vue.use(Lazyload);
    Vue.use(Skeleton);
    Vue.use(Tabbar);
    Vue.use(TabbarItem);
    Vue.use(NavBar);
};

export default {
    install
};
