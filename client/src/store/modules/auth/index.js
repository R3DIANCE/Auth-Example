import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
    error: undefined,
    loading: false,
    loggedIn: false,
    user: {},
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};
