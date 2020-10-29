import actions from './actions';
import getter from './getters';
import mutations from './mutations';

const state = {
    altVServer: {},
    userCount: 0,
    adminCount: 0,
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
