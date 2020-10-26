<template>
    <div id="dasboard">
        <h1>Dashboard</h1>

        <div class="centered">
            <section class="cards">
                <article class="card">
                    Users
                    <br />
                    {{ stats.userCount }}
                </article>

                <article class="card">
                    Admins
                    <br />
                    {{ stats.adminCount }}
                </article>

                <article class="card">
                    Placeholder
                    <br />
                    0
                </article>

                <article class="card">
                    Placeholder
                    <br />
                    0
                </article>
            </section>
        </div>

        <p>{{ auth.user.username }}</p>
        <p>{{ auth.user._id }}</p>

        <button class="btn" @click="logout">Logout</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Dashboard',

    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$store.commit('auth/APP_SET_LOGIN_STATE', false);
            this.$router.push('/auth/login');
        },
    },

    computed: {
        ...mapState(['auth', 'stats']),
    },

    mounted() {
        this.$store.dispatch('auth/loggedIn', localStorage.token);
        this.$store.dispatch('stats/getAll', localStorage.token);
    },
};
</script>

<style scoped>
#home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cards {
    display: flex;
    justify-content: space-between;
    background-color: #282828;
    margin-bottom: 20px;
}
.card {
    margin: 5px;
    padding: 15px;
    width: 100%;
}
</style>
