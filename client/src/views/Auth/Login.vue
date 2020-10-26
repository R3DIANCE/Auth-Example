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

            <button class="button" @click="login">Login</button>
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
.centered {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input {
    width: 200px;
    margin: 10px 0;
    padding: 10px;
    outline: none;
}

.error {
    background-color: #fbb32d;
    width: 50%;
    margin: auto;
    padding: 8px 2px;
    margin-bottom: 20px;
    border-radius: 5px;
}

#errMsg {
    color: #000;
}
</style>