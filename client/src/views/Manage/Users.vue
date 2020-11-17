<template>
    <div id="users" @click="closeModal">
        <h1>Manage Users</h1>

        <div class="centered" v-if="!database.users">
            <img :src="require('@/assets/img/spinners/spinner1.svg')" />
        </div>

        <table role="table" v-if="database.users">
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Active ?</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in database.users" :key="index">
                    <td>{{ user._id }}</td>
                    <td class="txt-ctr">{{ user.username }}</td>
                    <td>{{ user.role }}</td>
                    <td><i id="editButton" class="fas fa-wrench" @click="manageSpecificUser(index)"></i></td>
                    <td><i id="deleteButton" class="far fa-trash-alt" @click="deleteSpecificUser(index)"></i></td>
                    <td v-if="user.active"><i class="fas fa-check hover" @click="toggleUserActive(index, false)"></i></td>
                    <td v-else><i class="fas fa-times hover" @click="toggleUserActive(index, true)"></i></td>
                </tr>
            </tbody>
        </table>

        <Edit v-if="isEdit && specificUser" />
        <Delete v-if="isDelete && specificUser" />
    </div>
</template>

<script>
import { mapState } from 'vuex';

import Edit from '@/components/modals/manage/Edit';
import Delete from '@/components/modals/manage/Delete';

export default {
    metaInfo: {
        title: `Rebel Roleplay - Manage - Users`,
    },
    components: {
        Edit,
        Delete,
    },
    data() {
        return {
            specificUser: '',
            isEdit: false,
            isDelete: false,
        };
    },

    methods: {
        manageSpecificUser(id) {
            this.isEdit = true;
            this.specificUser = this.database.users[id];
        },
        deleteSpecificUser(id) {
            this.isDelete = true;
            this.specificUser = this.database.users[id];
        },
        toggleUserActive(id, state) {
            this.isDelete = false;
            this.specificUser = this.database.users[id];
            this.$store.dispatch('database/toggleUserActive', this.specificUser);
        },

        closeModal(key) {
            if (key && key.keyCode !== 27) return;
            this.isDelete = false;
            this.specificUser = '';
        },
    },
    computed: {
        ...mapState(['database']),
    },

    mounted() {
        this.$store.dispatch('database/getAllUsers', localStorage.token);
        this.$on('closeModal', this.closeModal);

        window.addEventListener('keyup', this.closeModal);
    },
};
</script>

<style lang="less" scoped>
@import '@/assets/css/colors.less';

#users {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

table {
    background-color: @dark-grey;
    width: 100%;
    margin-top: 15px;
    padding: 10px;
    text-transform: capitalize;
    border-collapse: collapse;
    text-align: center;
}

thead {
    background-color: @darker-grey;
}

th {
    width: auto;
    padding: 10px;
}

td {
    width: auto;
    padding: 10px;
}

#editButton {
    background-color: @info;
    border-radius: 2px;
    width: 34px;
    cursor: pointer;
    padding: 4px 10px;

    &:hover {
        background-color: #176ba3;
    }
}

#deleteButton {
    background-color: @error;
    border-radius: 2px;
    width: 34px;
    cursor: pointer;
    padding: 4px 10px;

    &:hover {
        background-color: #ad232a;
    }
}
</style>