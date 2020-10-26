export default {
    APP_SET_STATS(state, payload) {
        state.userCount = payload.userCount;
        state.adminCount = payload.adminCount;
    },
};
