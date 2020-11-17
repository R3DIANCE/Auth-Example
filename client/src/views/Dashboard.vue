<template>
    <div id="dasboard">
        <h1>Dashboard</h1>

        <div class="card-container centered" v-if="isAdmin && stats && stats.altVServer">
            <section class="cards">
                <router-link to="/manage/users" class="card">
                    Online Users
                    <br />
                    <span>{{ stats.altVServer.players }} / {{ stats.altVServer.maxPlayers }}</span>
                    <div class="circle x-small" :data-fill="this.usersOnlinePercentage" hour style="--color: #d12727">
                        <span>{{ usersOnlinePercentage }}%</span>
                        <div class="bar"></div>
                    </div>
                </router-link>

                <article class="card">
                    Admins
                    <br />
                    {{ stats.adminCount }}
                </article>

                <article class="card">
                    CPU Usage
                    <br />
                    <br />
                    <div class="circle x-small" :data-fill="stats.cpuUsage" hour style="--color: #d12727">
                        <span>{{ stats.cpuUsage }}%</span>
                        <div class="bar"></div>
                    </div>
                </article>
                <article class="card last-card">
                    RAM Usage
                    <br />
                    <br />
                    <div class="circle x-small" :data-fill="stats.ramUsage" hour style="--color: #d12727">
                        <span>{{ stats.ramUsage }}%</span>
                        <div class="bar"></div>
                    </div>
                </article>
            </section>
        </div>

        <p>{{ auth.user.username }}</p>
        <p>{{ auth.user._id }}</p>

        <br />

        <p>{{ stats.altVServer.branch }}</p>
        <p>{{ stats.altVServer.build }}</p>

        <br />

        <h3>Server Log</h3>
        <div id="altLogs" v-if="stats.altLogs">
            {{ stats.altLogs }}
        </div>

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
        setInterval(() => {
            this.$store.dispatch('stats/updateAltStats');
        }, 300000);
    },

    updated() {
        const altLogsElement = document.getElementById('altLogs');
        if (altLogsElement) {
            altLogsElement.scrollTop = altLogsElement.scrollHeight;
        }
    },
};
</script>

<style lang="less" scoped>
@import '@/assets/css/circle.less';
@import '@/assets/css/colors.less';

#dasboard {
    padding: 15px;
    user-select: none;
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
    background-color: @dark-grey;
    color: @white;
    padding: 15px;
    margin: 0px 10px 0px 0px;
    width: 100%;
    border-radius: 3px;
    cursor: pointer;
    height: 120px;
    text-decoration: none;
}

.last-card {
    margin: 0px;
}

#altLogs {
    background-color: @dark-grey;
    color: #acacac;
    padding: 5px 10px;
    border-radius: 3px;
    margin: 10px 0px;
    white-space: pre-line;
    height: 200px;
    overflow-y: auto;
}

#altLogs::-webkit-scrollbar {
    width: 3px;
}

#altLogs::-webkit-scrollbar-track {
    border-radius: 10px;
}

#altLogs::-webkit-scrollbar-thumb {
    background: @main-red;
    border-radius: 10px;
}

#altLogs::-webkit-scrollbar-thumb:hover {
    background: @other-red;
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
    }
    #altLogs {
        font-size: 0.7rem;
    }
}

@media only screen and (max-width: 380px) {
    .cards {
        flex-wrap: nowrap;
        flex-direction: column;
    }
    .card {
        flex-basis: auto;
    }
}
</style>
