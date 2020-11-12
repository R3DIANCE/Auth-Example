import router from '@/router/index.js';

const API_URL = 'http://192.168.1.131:5000/api/v1/users';

export default {
    getAllUsers(context, payload) {
        fetch(API_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${payload}`,
            },
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                context.commit('APP_SET_USERS', result);
            })
            .catch(error => {
                console.error(error);
            });
    },
};
