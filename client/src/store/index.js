import Vuex from 'vuex';
import Vue from 'vue';

import auth from './modules/auth/index';
import stats from './modules/stats/index';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        stats,
    },
});
