import actions from './actions';
import getter from './getters';
import mutations from './mutations';

const state = {
    altVServer: {},
    userCount: 0,
    adminCount: 0,
    cpuUsage: 0,
    ramUsage: 0,
    altLogs: '',
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
