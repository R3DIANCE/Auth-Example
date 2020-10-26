<template>
    <div id="app">
        <Navbar />
        <router-view />
    </div>
</template>

<script>
import Navbar from './components/Navbar';
export default {
    components: {
        Navbar,
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Commissioner&display=swap');

body {
    color: #fff;
    background-color: #3d3d3d;
    font-family: 'Commissioner', sans-serif;
    margin: 0;
}

.button {
    background-color: #d12727;
    border: none;
    outline: 0;
    color: white;
    padding: 4px 7px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 3px;
    font-size: 16px;
}

.button:hover {
    background-color: #e24c4c;
    cursor: pointer;
}
</style>
