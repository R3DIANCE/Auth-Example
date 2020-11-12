<template>
    <div>
        <h1>Login</h1>

        <div class="centered error" v-if="auth.error">
            <span id="errMsg">{{ auth.error }}</span>
        </div>

        <div class="centered" v-if="this.auth.loading">
            <img :src="require('@/assets/img/spinners/spinner1.svg')" />
        </div>

        <form class="centered" v-else @submit.prevent="login">
            <label>Username or Email</label>
            <input class="type-2" v-model="user.username" type="text" placeholder="Username or Email Address" required />

            <label>Password</label>
            <input class="type-2" v-model="user.password" type="password" placeholder="Password" />

            <button class="button" type="button" @click="login">Login</button>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import * as regex from '@/helpers/regex';

export default {
    login: 'Login',

    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        };
    },

    methods: {
        login() {
            if (!this.user.username || !this.user.password) {
            }
            this.$store.dispatch('auth/login', this.user);
        },
    },
    computed: {
        ...mapState(['auth']),
    },
};
</script>

<style scoped>
#errMsg {
    color: #000;
}
.centered {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.error {
    background-color: #fbb32d;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 20px;
    padding: 8px 2px;
    width: 50%;
}
input {
    margin: 10px 0;
    outline: none;
    padding: 10px;
    width: 200px;
}
</style>