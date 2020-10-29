<template>
    <div id="home">
        <h1>Home</h1>

        <img id="main-img" :src="require('@/assets/img/main.png')" />

        <p id="img-caption">Rebel Roleplay is an upcoming survival Roleplay server for Grand Theft Auto V, the focus will be both on combat and roleplay set in a post apocalyptic Los Santos</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Home',
    metaInfo: {
        title: `Rebel Roleplay - Home`,
    },

    computed: {
        ...mapState(['auth']),
    },
};
</script>

<style scoped>
#home {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#img-caption {
    width: 90%;
}

#main-img {
    height: auto;
    max-height: 100%;
    max-width: 100%;
}
</style>
