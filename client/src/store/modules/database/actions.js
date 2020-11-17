import router from '@/router/index.js';

const API_URL = 'http://192.168.1.131:5000/api/v1/users';
const TOGGLE_ACTIVE = 'http://192.168.1.131:5000/api/v1/users/manage/toggleactive';

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

    toggleUserActive(context, payload) {
        console.log(payload);
        fetch(TOGGLE_ACTIVE, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
                'content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                context.commit('APP_SET_USER_ACTIVE_STATE', result);
            })
            .catch(error => {
                console.error(error);
            });
    },
};
