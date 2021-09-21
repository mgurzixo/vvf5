<script setup>
import MgDrawer from "../components/MgDrawer.vue";
import MgNavbar2 from "../components/Navbar2.vue";
</script>
<template>
    <div class="">
        <mg-drawer />
        <mg-navbar2 />
        <router-view />
    </div>
</template>

<script>
export default {
    data: () => {
        return { isActive: false };
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
</style>
