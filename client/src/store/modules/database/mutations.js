export default {
    APP_SET_USERS(state, payload) {
        state.users = payload;
    },
    APP_SET_USER_ACTIVE_STATE(state, payload) {
        state.users.forEach(user => {
            if (user._id == payload._id) {
                user.active = payload.active;
            }
        });
    },
    APP_CLEAR_STATE(state, payload) {
        state.userCount = 0;
        state.adminCount = 0;
    },
};
