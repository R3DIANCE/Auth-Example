<template>
  <div id="home">
    <h1>Home</h1>

    <img id="main-img" :src="require('@/assets/img/main.png')" />

    <p id="img-caption">
      Rebel Roleplay is an upcoming survival Roleplay server for Grand Theft
      Auto V, the focus will be both on combat and roleplay set in a post
      apocalyptic Los Santos
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",

  computed: {
    ...mapState(["auth"]),
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

#main-img {
  max-width: 100%;
  height: auto;
  max-height: 100%;
}

#img-caption {
  width: 90%;
}
</style>
