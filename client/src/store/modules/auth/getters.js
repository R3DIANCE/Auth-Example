export default {
    isAdmin: state => {
        return state.user.role == 'admin';
    },
};
