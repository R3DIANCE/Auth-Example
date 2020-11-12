<template>
    <div id="users">
        <h1>Manage Users</h1>

        <div class="centered" v-if="!database.users">
            <img :src="require('@/assets/img/spinners/spinner1.svg')" />
        </div>

        <table v-if="database.users">
            <tbody>
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Active ?</th>
                </tr>
                <tr v-for="(user, index) in database.users" :key="index" @click="manageSpecificUser(index)">
                    <td>{{ user._id }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.role }}</td>
                    <td v-if="user.active"><span>&#10003;</span></td>
                    <td v-else><span>&#10005;</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    methods: {
        manageSpecificUser(id) {
            console.log(id);
        },
    },
    computed: {
        ...mapState(['database']),
    },

    mounted() {
        this.$store.dispatch('database/getAllUsers', localStorage.token);
        // setInterval(() => {
        console.log(this.database.users);
        // }, 1000);
    },
};
</script>

<style scoped>
#users {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

table {
    background-color: #2f2f2f;
    width: 100%;
    margin-top: 15px;
    padding: 10px;
    text-transform: capitalize;
}

th {
    text-align: left;
    padding: 10px;
}

td {
    padding: 10px;
    cursor: pointer;
}
</style>