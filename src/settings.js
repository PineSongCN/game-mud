import { getStorage } from '@/utils/storage';

const showSettings = getStorage('showSettings', true);
const tagsView = getStorage('tagsView', true);
const fixedHeader = getStorage('fixedHeader', true);
const sidebarLogo = getStorage('sidebarLogo', true);

export default {
    title: '雾海之下',

    showSettings,

    tagsView,

    fixedHeader,

    sidebarLogo,

    errorLog: 'production'
};