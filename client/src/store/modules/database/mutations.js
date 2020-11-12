export default {
    APP_SET_USERS(state, payload) {
        state.users = payload;
    },
    APP_CLEAR_STATE(state, payload) {
        state.userCount = 0;
        state.adminCount = 0;
    },
};
