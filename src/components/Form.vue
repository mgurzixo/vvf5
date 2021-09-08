<script setup>
"use strict";
import {
    onMounted,
    onUnmounted,
    watch,
    // defineProps,
    getCurrentInstance,
} from "vue";

const props = defineProps({
    src: {
        src: {},
        default: { components: [] },
    },
    submission: {
        submission: {},
        default: {},
    },
    language: {
        language: String,
        default: "en",
    },
    options: {
        options: {},
        default: {},
    },
});

// console.log(`[Form] props=${JSON.stringify(props)}`);

let instance;
let vm = getCurrentInstance();
// console.log(`[Form] getCurrentInstance=${Object.keys(vm)}`);

function initializeForm() {
    // console.log(`[Form] src=${JSON.stringify(props.src)}`);
    return new Formio.createForm(vm.refs.formio, props.src, props.options)
        .then((myInstance) => {
            instance = myInstance;
            return instance;
        })
        .catch((err) => {
            console.error(err);
        });
}

function setupForm() {
    if (!instance) {
        return;
    }
    if (props.submission) {
        instance.submission = props.submission;
    }
    instance.language = props.language;
    instance.nosubmit = true;
    instance.events.onAny((...args) => {
        // console.log(`[Form.onAny] got event:${args[0]}`);
        const eventParts = args[0].split(".");
        // Only handle formio events. Should we?
        const namespace = props.options.namespace || "formio";
        if (eventParts[0] !== namespace || eventParts.length !== 2) {
            console.log(`[Form.onAny]  got nonFormio event:${args[0]}`);
            return;
        }
        // Remove formio. from event.
        args[0] = eventParts[1];
        vm.emit.apply(vm, args);
        // Emit custom events under their own name as well.
        if (eventParts[1] === "customEvent") {
            args[0] = args[1].type;
            // console.log(`[Form.onAny] sending custom event:${args[0]}`);
            vm.emit.apply(vm, args);
        }
        // Create the __any event so that vue can listen on it
        args.push({
            eventName: args[0],
            formInstance: instance,
        });
        args[0] = "__any";
        vm.emit.apply(vm, args);
    });
}

onMounted(function () {
    initializeForm()
        .then(() => {
            setupForm();
        })
        .catch((err) => {
            console.warn(`[Form] ${err}`);
        });
});

onUnmounted(function () {
    console.log(`[Form.onUnmounted]`);
    // if (instance) {
    //     instance.destroy(true);
    // }
});
</script>

<template>
    <div ref="formio"></div>
</template>
