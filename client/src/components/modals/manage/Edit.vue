<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h3 name="header">Edit User</h3>
                </div>

                <div class="modal-body" v-if="user">
                    <p>Username: {{ user.username }}</p>
                </div>

                <div class="modal-footer">
                    <a id="btn-1" @click="closeModal">Cancel</a>
                    <a id="btn-2">Confirm</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$parent.$emit('closeModal');
        },
    },

    computed: {
        user() {
            if (this.$parent.$data.specificUser) {
                return this.$parent.$data.specificUser;
            }
        },
    },
};
</script>

<style lang="less" scoped>
@import '../../../assets/css/colors.less';
@import '../../../assets/css/modals.less';

#btn-1 {
    background-color: @dark-grey;
    border-radius: 2px;
    cursor: pointer;
    padding: 4px 10px;
    width: 80px;
}

#btn-2 {
    background-color: @main-red;
    border-radius: 2px;
    cursor: pointer;
    padding: 4px 10px;
    width: 80px;
}
</style>