<script>
import { reactive, ref, getCurrentInstance, nextTick } from "vue";
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import iLink from "../lib/ILink";
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
            default: 5000,
        },
        label: {
            type: String,
            default: "Unknown ilink!",
        },
        resetDrawer: {
            type: Boolean,
            default: true,
        },
    },
    setup(props) {
        var vm = getCurrentInstance();
        const router = useRouter();
        let handleClick = function (e) {
            if (props.resetDrawer) {
                setDrawer(false);
                e.stopPropagation();
            }
            iLink(
                () => {
                    router.push(props.to);
                },
                props.transition,
                props.durationMs
            );
        };

        return { handleClick };
    },
});
</script>

<template>
    <a @click="handleClick">{{ label }}</a>
</template>
