import router from '@/router/index.js';

const STATS_URL = 'http://192.168.1.131:5000/api/v1/stats/all';
const ALTV_URL = 'http://api.altv.mp/servers/list';

export default {
    // Get All Stats
    getAll(context, payload) {
        if (this.getters['auth/isAdmin']) {
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
                })
                .then(result => {
                    context.commit('APP_SET_STATS', result);
                });
        }
    },

    getAltV(context, payload) {
        if (this.getters['auth/isAdmin']) {
            fetch(ALTV_URL, {
                method: 'GET',
                headers: { 'content-Type': 'application/json' },
            })
                .then(res => {
                    res.json().then(json => {
                        const rebelServer = json.find(server => server.host == '185.254.99.20');
                        context.commit('APP_SET_ALTV_SERVER', rebelServer);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
};
