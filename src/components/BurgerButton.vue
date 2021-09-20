<script>
"use strict";
import { defineComponent } from "vue";

export default defineComponent({
    data: () => {
        return {};
    },
    computed: {
        hamburgerOpen: {
            get() {
                return this.$store.state.drawer;
            },
            set(val) {
                this.$store.commit("setDrawer", val);
            },
        },
    },
    methods: {
        // ...mapMutations(["setDrawer"]),
        handleClick(e) {
            console.log(`click Burger`);
            this.$store.commit("setDrawer", true);
        },
    },
});
</script>

<style lang="scss">
.is-fixed {
    position: fixed;
    z-index: 990;
    top: 0;
    left: 0;
    margin: 0.2em;
}
</style>
<template>
    <div>
        <div class="is-fixed">
            <button
                class="button is-circular has-text-white has-background-grey"
                @click="handleClick($event)"
            >
                <span class="icon is-small">
                    <i class="fa fa-bars"></i>
                </span>
            </button>
        </div>
    </div>
</template>
