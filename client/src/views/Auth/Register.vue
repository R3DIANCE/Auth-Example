<template>
    <div>
        <h1>Register</h1>

        <div class="centered" v-if="this.auth.loading">
            <img :src="require('@/assets/img/spinners/spinner1.svg')" />
        </div>

        <form class="centered" v-else @submit.prevent="register">
            <label>Username</label>
            <input class="type-2" v-model="user.username" type="text" placeholder="Username" required />

            <label>Email Address</label>
            <input class="type-2" v-model="user.email" type="text" placeholder="Email Address" required />

            <label>Password</label>
            <input class="type-2" v-model="user.password" type="password" placeholder="Password" />

            <label>Confirm Password</label>
            <input class="type-2" v-model="user.password2" type="password" placeholder="Confirm Password" />

            <button class="button" @click="register">Register</button>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    login: 'Register',

    data() {
        return {
            user: {
                username: '',
                email: '',
                password: '',
                password2: '',
            },
        };
    },

    methods: {
        register() {
            this.$store.dispatch('auth/register', {
                username: this.user.username,
                email: this.user.email,
                password: this.user.password,
            });
        },
    },
    computed: {
        ...mapState(['auth']),
    },
};
</script>

<style scoped>
.centered {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
input {
    margin: 10px 0;
    outline: none;
    padding: 10px;
    width: 200px;
}
</style>