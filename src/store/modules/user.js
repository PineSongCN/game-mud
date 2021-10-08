import { login, logout, getInfo } from '@/api/user';
import {
    getStorage,
    setStorage,
    removeStorage,
    clearStorage
} from '@/utils/storage';
import { validEmpty } from '@/utils/validate';
import router, { resetRouter } from '@/router';

const defMap = {
    avatar: 'https://static.mymro.cn/newweb/Content/images/mymro.ico'
}
const map = [
    {
        key: 'token',
        def: getStorage('token', '')
    },
    {
        key: 'userId',
        def: getStorage('userId', '')
    },
    {
        key: 'userName',
        def: getStorage('userName', '')
    },
    {
        key: 'userInfo',
        def: getStorage('userInfo', {})
    },
    {
        key: 'avatar',
        def: defMap.avatar
    },
    {
        key: 'email',
        def: getStorage('email', '')
    },
    {
        key: 'nickName',
        def: getStorage('nickName', '')
    },
    {
        key: 'opsType',
        def: getStorage('opsType', '')
    },
    {
        key: 'phonenumber',
        def: getStorage('phonenumber', '')
    },
    {
        key: 'sex',
        def: getStorage('sex', '')
    },
    {
        key: 'roles',
        def: getStorage('roles', ['admin'])
    }
];

const state = {};
const mutations = {};

for (let i = map.length - 1; i >= 0; i--) {
    let { key, def, type = 1 } = map[i];
    const setKey = `SET_${key.toUpperCase()}`;
    const removeKey = `REMOVE_${key.toUpperCase()}`;
    if (type === 2) {
        state[key] = def;

        mutations[setKey] = (state, value) => {
            value =
                typeof value === 'object' && value !== null
                    ? JSON.parse(JSON.stringify(value))
                    : value;
            state[key] = value;
        };
    } else {
        state[key] = getStorage({
            key,
            def
        });
        setStorage({
            key,
            value: def,
            type
        });

        mutations[setKey] = (state, value) => {
            value =
                typeof value === 'object' && value !== null
                    ? JSON.parse(JSON.stringify(value))
                    : value;
            state[key] = value;
            setStorage({
                key,
                value,
                type
            });
        };

        mutations[removeKey] = (state, value) => {
            removeStorage({
                key,
                type
            });
        };
    }
}

const actions = {
    async login({ commit, dispatch }, userInfo) {
        try {
            const { username, password } = userInfo;
            const response = await login({
                username: username.trim(),
                password: password
            });
            console.log(response)
            const { token } = response;
            commit('SET_TOKEN', token);

            userInfo = await dispatch('getInfo');
            return userInfo;
        } catch (e) {
            console.log('store:user:login:e', e);
            throw e;
        }
    },

    async getInfo({ commit, state }) {
        try {
            const response = await getInfo(state.token);
            const { userId, userName,  avatar, email, nickName, opsType, phonenumber, sex } = response;
            commit('SET_USERINFO', response);
            commit('SET_USERID', userId);
            commit('SET_USERNAME', userName);
            commit('SET_AVATAR', avatar || defMap.avatar);
            commit('SET_EMAIL', email);
            commit('SET_NICKNAME', nickName);
            commit('SET_OPSTYPE', opsType);
            commit('SET_PHONENUMBER', phonenumber);
            commit('SET_SEX', sex);
            return response;
        } catch (e) {
            console.log('store:user:getInfo:e', e);
            throw e;
        }
    },

    async logout({ commit, state, dispatch }) {
        try {
            commit('SET_TOKEN', null);
            commit('SET_USERINFO', null);
            resetRouter();
            dispatch('tagsView/delAllViews', null, { root: true });
            return true;
        } catch (e) {
            console.log('store:user:logout:e', e);
            throw e;
        }
    },

    async resetToken({ dispatch }) {
        try {
            await dispatch('logout');
            return true;
        } catch (e) {
            console.log('store:user:resetToken:e', e);
            throw e;
        }
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
