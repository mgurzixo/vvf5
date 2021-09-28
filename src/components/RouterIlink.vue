<script>
import { reactive, ref, getCurrentInstance, nextTick } from "vue";
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { doIlink } from "../lib/Ilink";
import { getDrawer, setDrawer, getDrawerDuration, setDrawerDuration } from "@/lib/MgDrawer.js";

export default defineComponent({
    props: {
        to: {
            type: String,
            default: "",
        },
        transition: {
            type: String,
            default: "right",
        },
        durationMs: {
            type: Number,
            default: undefined,
        },
        label: {
            type: String,
            default: "Unknown ilink!",
        },
        resetDrawer: {
            type: Boolean,
            default: true,
        },
        button: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        var vm = getCurrentInstance();
        const router = useRouter();
        let handleClick = function (e) {
            doIlink(
                () => {
                    router.push(props.to);
                },
                props.transition,
                props.durationMs
            );
            if (props.resetDrawer) {
                setDrawer(false);
                e.stopPropagation();
            }
        };

        return { handleClick };
    },
});
</script>

<template>
    <button v-if="button" :class="button" @click="handleClick">{{ label }}</button>
    <a v-else @click="handleClick">{{ label }}</a>
</template>
