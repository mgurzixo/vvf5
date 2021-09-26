<script>
"use strict";
import { onBeforeMount, onMounted, onUpdated } from "vue";
import { doIlink } from "../lib/XIlink";

export default {
    props: {
        options: {
            type: Object,
            default: {
                isActive: true,
                iconClass: "",
                // ()=> router.push(route);
                action: () => {},
                transition: "down", // none, right, left, up, down
                durationMs: "300",
            },
        },
    },

    setup(props) {
        onBeforeMount(() => {
            // Setup a sensible default icon if needed
            if (!props.options.iconClass) {
                props.options.iconClass = [
                    "fa fa-bars",
                    "fa fa-arrow-up",
                    "fa fa-arrow-down",
                    "fa fa-arrow-right",
                    "fa fa-arrow-left",
                ][["none", "up", "down", "right", "left"].indexOf(props.options.transition)];
            }
        });

        let handleClick = function (e) {
            console.log(`click Burger`);
            doIlink(props.options.action, props.options.transition, props.options.durationMs);
        };

        return {
            handleClick,
        };
    },
};
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
        <div class="is-fixed" id="fixedDiv">
            <button
                @click="handleClick"
                id="mgburgerbutton"
                class="button is-size-4 is-circular has-text-white has-background-grey"
            >
                <span class="icon fa-lg">
                    <i :class="options.iconClass"></i>
                </span>
            </button>
        </div>
    </div>
</template>
