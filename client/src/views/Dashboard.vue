<template>
    <div id="dasboard">
        <h1>Dashboard</h1>

        <div class="card-container centered" v-if="isAdmin">
            <section class="cards">
                <article class="card">
                    Online Users
                    <br />
                    <span>{{ stats.altVServer.players }} / {{ stats.altVServer.maxPlayers }}</span>
                    <div class="circle x-small" :data-fill="this.usersOnlinePercentage" hour style="--color: #d12727">
                        <span>{{ usersOnlinePercentage }}%</span>
                        <div class="bar"></div>
                    </div>
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

                <article class="card last-card">
                    Placeholder
                    <br />
                    0
                </article>
            </section>
        </div>

        <p>{{ auth.user.username }}</p>
        <p>{{ auth.user._id }}</p>

        <br />

        <p>{{ stats.altVServer.branch }}</p>
        <p>{{ stats.altVServer.build }}</p>

        <br />

        <button class="button" @click="logout">Logout</button>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    metaInfo: {
        title: `Rebel Roleplay - Dashboard`,
    },

    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$store.commit('auth/APP_SET_LOGIN_STATE', false);
            this.$router.push('/auth/login');
        },
    },

    computed: {
        ...mapState(['auth', 'stats']),
        ...mapGetters({
            isAdmin: 'auth/isAdmin',
        }),

        usersOnlinePercentage() {
            if (this.stats.altVServer) {
                let percentage = Math.round((this.stats.altVServer.players / this.stats.altVServer.maxPlayers) * 100);
                if (percentage == 51) {
                    percentage = 50;
                }
                return percentage || 0;
            }
        },
    },

    mounted() {
        this.$store.dispatch('auth/loggedIn', { token: localStorage.token, getStats: true });
        this.$store.dispatch('stats/getAltV');
    },
};
</script>

<style lang="less" scoped>
@import '../assets/css/circle.less';

#dasboard {
    padding: 15px;
}

.card-container {
    margin-top: 10px;
}

.cards {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    user-select: none;
}

.card {
    display: flex;
    flex-direction: column;
    background-color: #2f2f2f;
    padding: 15px;
    margin: 0px 10px 0px 0px;
    width: 100%;
    border-radius: 3px;
    cursor: pointer;
}

.last-card {
    margin: 0px;
}

.circle {
    align-self: flex-end;
}

@media only screen and (max-width: 600px) {
    .cards {
        flex-wrap: wrap;
    }
    .card {
        flex-basis: calc(50% - 10px);
        margin: 3px;
        height: 120px;
    }
}

@media only screen and (max-width: 380px) {
    .cards {
        flex-wrap: nowrap;
        flex-direction: column;
    }
    .card {
        flex-basis: 0;
        height: 120px;
    }
}
</style>
