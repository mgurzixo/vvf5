<template>
    <div id="app">
        <HelloWorld msg="Welcome to test drag" />
        <draggable-button :isClick.sync="btnIsClick">
            <img alt="Vue logo" @click="clickHandler" src="../assets/logo.png" />
            <div @click.stop="clickHandler">drag it ↑</div>
        </draggable-button>
    </div>
</template>
<script>
import HelloWorld from "../components/HelloWorld.vue";
export default {
    name: "App",
    data() {
        return {
            btnIsClick: false,
        };
    },
    components: {
        HelloWorld,
    },
    methods: {
        clickHandler() {
            if (this.btnIsClick) {
                alert("Hi!");
            }
        },
    },
};
</script>
