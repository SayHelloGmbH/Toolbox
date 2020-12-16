import apiFetch from '@wordpress/api-fetch';
import { registerStore } from '@wordpress/data';

const actions = {
    setMenus(menus) {
        return {
            type: 'SET_MENUS',
            menus,
        };
    },
    getMenus(path) {
        return {
            type: 'GET_MENUS',
            path,
        };
    },
};

registerStore('sht/menus', {
    reducer(state = { menus: {} }, action) {
        switch (action.type) {
            case 'SET_MENUS':
                return {
                    ...state,
                    menus: action.menus,
                };
        }

        return state;
    },

    actions,

    selectors: {
        getMenus(state) {
            const { menus } = state;
            return menus;
        },
    },

    controls: {
        GET_MENUS(action) {
            return apiFetch({ path: action.path });
        },
    },

    resolvers: {
        *getMenus() {
            const menus = yield actions.getMenus('/sht/menus/');
            return actions.setMenus(menus);
        },
    },
});
