export default {
    APP_SET_STATS(state, payload) {
        if (payload) {
            state.userCount = payload.userCount;
            state.adminCount = payload.adminCount;
        }
    },
    APP_SET_ALTV_SERVER(state, payload) {
        state.altVServer = payload;
    },
    APP_CLEAR_STATE(state, payload) {
        state.userCount = 0;
        state.adminCount = 0;
    },
};
