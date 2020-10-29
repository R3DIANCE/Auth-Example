import router from '@/router/index.js';

const LOGIN_URL = 'http://192.168.1.131:5000/auth/login';
const REGISTER_URL = 'http://192.168.1.131:5000/auth/signup';
const LOGGEDIN_URL = 'http://192.168.1.131:5000/';

function waitSpinner(context, error) {
    setTimeout(() => {
        context.commit('APP_SET_LOADING_STATE', false);
        context.commit('APP_SET_ERROR_MESSAGE', error);
    }, 1000);
}

export default {
    // Login
    login(context, payload) {
        context.commit('APP_SET_LOADING_STATE', true);
        fetch(LOGIN_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then(error => {
                    waitSpinner(context, error.error);
                });
            })
            .then(result => {
                if (!result) {
                    waitSpinner(context, 'Failed to Login');
                } else {
                    localStorage.token = result.token;
                    setTimeout(() => {
                        context.commit('APP_SET_LOADING_STATE', false);
                        context.commit('APP_SET_LOGIN_STATE', true);
                        router.push('/dashboard');
                    }, 1000);
                }
            })
            .catch(error => {
                setTimeout(() => {
                    context.commit('APP_SET_LOADING_STATE', false);
                    context.commit('APP_SET_ERROR_MESSAGE', error.message);
                }, 1000);
            });
    },

    //  Register
    register(context, payload) {
        context.commit('APP_SET_LOADING_STATE', true);
        fetch(REGISTER_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then(error => {
                    context.commit('APP_SET_LOADING_STATE', false);
                    context.commit('APP_SET_ERROR_MESSAGE', error.message);
                });
            })
            .then(user => {
                setTimeout(() => {
                    context.commit('APP_SET_LOADING_STATE', false);
                    router.push('login');
                }, 1000);
            })
            .catch(error => {
                setTimeout(() => {
                    context.commit('APP_SET_LOADING_STATE', false);
                    context.commit('APP_SET_ERROR_MESSAGE', error.message);
                }, 1000);
            });
    },

    loggedIn(context, payload) {
        console.log(context);
        fetch(LOGGEDIN_URL, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        })
            .then(res => res.json())
            .then(result => {
                if (result.user) {
                    console.log(result);
                    context.commit('APP_SET_USER_DATA', result.user);
                    context.commit('APP_SET_LOGIN_STATE', true);
                    if (payload.getStats) {
                        context.dispatch('stats/getAll', localStorage.token, { root: true });
                    }
                } else {
                    localStorage.removeItem('token');
                    router.push('/auth/login');
                }
            });
    },
};
