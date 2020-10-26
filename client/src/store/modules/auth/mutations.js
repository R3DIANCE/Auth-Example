export default {
    APP_SET_ERROR_MESSAGE(state, payload) {
        state.error = payload;
    },
    APP_SET_LOADING_STATE(state, payload) {
        state.loading = payload;
        state.error = undefined;
    },
    APP_SET_LOGIN_STATE(state, payload) {
        state.loggedIn = payload;
        state.error = undefined;
    },
    APP_SET_USER_DATA(state, payload) {
        state.user = payload;
    },
};
