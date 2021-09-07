<template>
    <div class="home">
        <HelloWorld msg="Welcome to Formio+Vuejs2+Vite App" />
    </div>
</template>

<script lang="ts">
"use strict";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default {
    components: {
        HelloWorld,
    },
};
</script>
