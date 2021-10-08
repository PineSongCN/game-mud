import variables from '@/styles/element-variables.scss';
import defaultSettings from '@/settings';
import { getStorage, setStorage } from '@/utils/storage';

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

const state = {
    // theme: getStorage('theme', variables.theme),
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
};

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
            state[key] = value;
            setStorage({
                key,
                value,
                expireTime: 0
            });
        }
    }
};

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
