import apiFetch from '@wordpress/api-fetch';
import { registerStore } from '@wordpress/data';

const endpoint = 'sht/menus';

const actions = {
    set(data) {
        return {
            type: 'SET',
            data,
        };
    },
    get(path) {
        return {
            type: 'GET',
            path,
        };
    },
};

registerStore(endpoint, {
    reducer(state = { data: {} }, action) {
        switch (action.type) {
            case 'SET':
                return {
                    ...state,
                    data: action.data,
                };
        }

        return state;
    },

    actions,

    selectors: {
        get(state) {
            const { data } = state;
            return data;
        },
    },

    controls: {
        GET(action) {
            return apiFetch({ path: action.path });
        },
    },

    resolvers: {
        *get() {
            const data = yield actions.get(`/${endpoint}/`);
            return actions.set(data);
        },
    },
});
