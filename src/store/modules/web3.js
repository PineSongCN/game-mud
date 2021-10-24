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
}
const map = [
    {
        key: 'web3Account',
        def: getStorage('web3Account', '')
    },
    {
        key: 'web3Chain',
        def: getStorage('web3Chain', '')
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
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
