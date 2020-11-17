import actions from './actions';
import getter from './getters';
import mutations from './mutations';

const state = {
    users: [],
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
