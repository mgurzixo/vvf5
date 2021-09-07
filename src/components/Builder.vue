<script setup>
import {
    ref,
    onMounted,
    defineProps,
    getCurrentInstance,
    withDefaults,
} from "vue";

const props = defineProps({
    form: {},
});

var builder = {};
var builderReady = false;
var vm = getCurrentInstance();
// console.log(`[Builder.mounted] getCurrentInstance=${Object.keys(vm)}`);

onMounted(function () {
    // console.log(`onMounted`);
    console.log(`[Builder.onMounted] props=${JSON.stringify(props)}`);
    if (!props.form.components) props.form.components = [];
    if (!props.form.settings) props.form.settings = {};
    builder = new Formio.FormBuilder(
        vm.refs.formio,
        {
            components: props.form.components,
            settings: props.form.settings,
        },
        {
            baseUrl: "",
        }
    );
    builder.setDisplay("form").then(function (instance) {
        instance.on("change", function (myForm) {
            console.log(`[Builder.onChange] got change`);
            if (myForm.components) {
                console.log(`[Builder.onChange] has components`);
            } else {
                console.log(
                    `[Builder.onChange] myForm:${Object.keys(myForm.value)}`
                );
                console.log(
                    `[Builder.onChange] changed:${Object.keys(
                        myForm.value.changed
                    )}`
                );
                console.log(
                    `[Builder.onChange] myForm:${JSON.stringify(
                        myForm.value.data
                    )}`
                );
            }
        });
    });
});

function initializeBuilder() {
    if (builder !== undefined) {
        builder.instance.destroy(true);
    }
    theForm.value = props.form; // ?? Should use deep clone
    if (!theForm.value.components) theForm.value = { components: [] };
    var options = theForm.value.settings ? theForm.value.settings : {};
    builder = new FormioFormBuilder(vm.refs.formio, form.components, options);
    builderReady = builder.ready;
    return builderReady.then(() => {
        builder.instance.events.onAny((...args) => {
            const eventParts = args[0].split(".");

            // Only handle formio events.
            const namespace = options.namespace || "formio";
            if (eventParts[0] !== namespace || eventParts.length !== 2) {
                return;
            }

            // Remove formio. from event.
            args[0] = eventParts[1];

            $emit.apply(this, args);

            // Emit a change event if the schema changes.
            if (
                [
                    "saveComponent",
                    "updateComponent",
                    "deleteComponent",
                ].includes(eventParts[1])
            ) {
                args[0] = "change";
                $emit.apply(this, args);
            }
        });
    });
}

function onDestroyed() {
    if (builder) {
        builder.instance.destroy(true);
    }
}
// console.log(`script setup`);
</script>

<template>
    <div ref="formio"></div>
</template>

<style scoped>
a {
    color: #42b983;
}
</style>
