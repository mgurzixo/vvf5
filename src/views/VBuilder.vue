<script>
"use strict";
import { defineComponent } from "vue";
import store from "../store.js";
import Builder from "../components/Builder.vue";

export default defineComponent({
    components: {
        Builder,
    },
    props: {},
    setup(props) {
        const components = store.getters.form.components;

        function handleChange(event) {
            // console.log(`[Vbuilder.handleChanged] ${JSON.stringify(event)}`);
            if (event.components) {
                // See https://help.form.io/developers/form-builder#events
                // console.log(`[Builder.handleChanged] event:${Object.keys(event)}`);
                store.dispatch("setForm", event);
            } else {
                // console.log(`[Vbuilder.handleChanged] no components`);
            }
        }

        function handleFormioEvent(...args) {
            let val = args.pop();
            console.log(
                `[VBuilder.handleFormioEvent] '${val.eventName}': ${args.length} args.`
            );
        }

        // expose to template
        return {
            components,
            handleChange,
            handleFormioEvent,
        };
    },
});
</script>
<template>
    <div class="home">
        <Builder
            :components="components"
            @formio-event="handleFormioEvent"
        ></Builder>
    </div>
    <!-- @change="handleChange" -->
</template>
