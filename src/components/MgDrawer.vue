<template>
    <div>
        <div
            class="mgdrawer-overlay"
            :style="overlayDisplay"
            @click="handleOverlayClick($event)"
        ></div>
        <div
            class="mgdrawer has-background-dark"
            @click="handleDrawerClick($event, link)"
            :class="{ 'is-visible': isDrawerActive }"
        >
            <div class="menu has-background-dark is-invert">
                <p class="menu-label">General</p>
                <ul class="menu-list">
                    <!--  -->
                    <router-ilink to="/builder" label="Builder" />
                    <!--  -->
                    <router-link to="/">Home</router-link>
                    <router-link to="/drag">Drag</router-link>
                </ul>
                <p class="menu-label">Forms</p>
                <ul class="menu-list">
                    <li><a>Item 1</a></li>
                    <li>
                        <a> The Form System</a>
                        <ul>
                            <router-ilink to="/builder" label="Builder"></router-ilink>
                            <router-ilink to="/form" label="Form"></router-ilink>
                        </ul>
                    </li>
                </ul>
                <p class="menu-label">Transactions</p>
                <ul class="menu-list">
                    <li><a>Payments</a></li>
                    <li><a>Transfers</a></li>
                    <li><a>Balance</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { getDrawer, setDrawer } from "@/lib/MgDrawer.js";
import routerIlink from "@/components/RouterIlink.vue";
import { defineComponent } from "vue";

export default defineComponent({
    data: () => {
        return {};
    },
    components: {
        routerIlink,
    },
    computed: {
        isDrawerActive: {
            get() {
                // return this.$store.state.drawer;
                return getDrawer().value;
            },
            set(val) {
                // this.$store.commit("setDrawer", val);
                setDrawer(val);
            },
        },
        overlayDisplay() {
            let res = `display:${getDrawer().value == true ? "block" : "none"}`;
            // console.log(`[overlayDisplay]res=${res}`);
            return res;
        },
    },
    setup(props) {
        // console.log(`[mgDrawer.setup]`);
        function handleDrawerClick(e, link) {
            console.log(`[handleDrawerClick]`);
            setDrawer(false);
        }
        function handleOverlayClick(e, link) {
            console.log(`[handleDrawerClick]`);
            setDrawer(false);
        }

        return { handleDrawerClick, handleOverlayClick };
    },
});
</script>

<script setup></script>
<style lang="scss">
// plagiarized from https://github.com/lucperkins/bulma-drawer

$mgdrawer-width: 20rem !default;
$mgdrawer-transition-duration: 200ms !default;
$mgdrawer-panel-padding: 1rem !default;
$mgdrawer-opacity: 0.95 !default;
$mgdrawer-background-color: black !default;
$mgdrawer-z-index: 1000 !default;

@mixin transition {
    transition: all $mgdrawer-transition-duration;
}
// .mgdrawer {
//     @include transition;

//     &.is-pushed {
//         margin-left: $mgdrawer-width;
//     }
//     &.is-opaque {
//         opacity: $mgdrawer-opacity;
//     }
// }
.mgdrawer {
    @include transition;
    z-index: $mgdrawer-z-index;
    position: fixed;
    top: 0;
    width: $mgdrawer-width;
    left: -#{$mgdrawer-width};
    height: 100vh;
    overflow: auto;
    opacity: $mgdrawer-opacity;

    &.is-visible {
        left: 0;
    }
    &.is-pushed {
        margin-left: $mgdrawer-width;
    }
    &.is-opaque {
        opacity: $mgdrawer-opacity;
    }
}

.mgdrawer-overlay {
    @include transition;
    position: fixed;
    width: 100%;
    height: 100%;
    display: none;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: $mgdrawer-z-index;
}
</style>
