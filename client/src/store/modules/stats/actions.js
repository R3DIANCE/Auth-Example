import router from '@/router/index.js';

const STATS_URL = 'http://localhost:5000/api/v1/stats/all';

export default {
    // Get All Stats
    getAll(context, payload) {
        fetch(STATS_URL, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `JWT ${localStorage.token}`,
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then(error => {
                    console.log(error);
                });
            })
            .then(result => {
                context.commit('APP_SET_STATS', result);
            });
    },
};
