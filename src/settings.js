import { getStorage } from '@/utils/storage';

const showSettings = getStorage('showSettings', true);
const tagsView = getStorage('tagsView', true);
const fixedHeader = getStorage('fixedHeader', true);
const sidebarLogo = getStorage('sidebarLogo', true);

export default {
    title: 'Mymro Admin',

    showSettings,

    tagsView,

    fixedHeader,

    sidebarLogo,

    errorLog: 'production'
};
// module.exports = {
//     title: 'Mymro Admin',

//     showSettings,

//     tagsView,

//     fixedHeader,

//     sidebarLogo,

//     errorLog: 'production'
// };
