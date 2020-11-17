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
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

body {
    color: #fff;
    background-color: #3d3d3d;
    font-family: 'Commissioner', sans-serif;
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

.hover {
    cursor: pointer;
}
</style>
