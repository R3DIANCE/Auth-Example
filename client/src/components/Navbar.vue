<template>
    <nav>
        <ul class="menu">
            <li class="logo">
                <router-link to="/">Rebel Roleplay</router-link>
            </li>
            <li class="item">
                <router-link to="/">Home</router-link>
            </li>
            <!-- <li class="item" v-if="this.auth.loggedIn">
                <router-link to="/dashboard">Dashboard</router-link>
            </li> -->

            <!-- Right Aligned from here -->
            <li class="item right" v-if="!this.auth.loggedIn">
                <router-link to="/auth/login">Login</router-link>
            </li>
            <li class="item" v-if="!this.auth.loggedIn">
                <router-link to="/auth/register">Register</router-link>
            </li>

            <li class="item right" v-if="this.auth.loggedIn">
                <router-link to="/dashboard">{{ auth.user.username }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Navbar',
    data() {
        return {};
    },

    methods: {},

    computed: {
        ...mapState(['auth']),
    },
};
</script>

<style scoped>
nav {
    background-color: #282828;
    width: 100%;
}

ul {
    list-style-type: none;
}

.menu {
    display: flex;
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
}

.logo a {
    text-decoration: none;
    color: #fff;
}

.item {
    flex-direction: column-reverse;
    justify-content: center;
    padding: 15px;
}

.item a {
    color: #484848;
    text-decoration: none;
}

.right {
    margin-left: auto;
}

.router-link-active {
    text-transform: capitalize;
}

.router-link-exact-active {
    color: #fff !important;
}
</style>
