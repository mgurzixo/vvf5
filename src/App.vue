<script setup></script>
<template>
    <!-- <div id="app"> -->
    <ul>
        <li>
            <router-link to="/">Home</router-link>
        </li>
        |
        <li>
            <router-link to="/builder">Builder</router-link>
        </li>
        |
        <li>
            <router-link to="/form">Form</router-link>
        </li>
    </ul>
    <router-view />
    <!-- </div> -->
</template>

<script>
export default {
    data: () => {
        return {};
    },
};
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* color: #2c3e50; */
    /* text-align: center;
    margin-top: 60px; */
}
li {
    display: inline-block;
    margin: 0 5px;
}
</style>
