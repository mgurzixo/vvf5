<script>
"use strict";
import { defineComponent } from "vue";
import store from "../store.js";
import mgBuilder from "@/components/Builder.vue";
import burgerButton from "@/components/BurgerButton.vue";
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import routerIlink from "@/components/RouterIlink.vue";

export default defineComponent({
    components: {
        mgBuilder,
        burgerButton,
        routerIlink,
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
            console.log(`[VBuilder.handleFormioEvent] '${val.eventName}': ${args.length} args.`);
        }

        // Burger button
        const router = useRouter();
        const burgerOptions = reactive({
            action: () => router.push("/"),
            transition: "left",
        });

        // expose to template
        return {
            components,
            handleChange,
            handleFormioEvent,
            burgerOptions,
        };
    },
});
</script>
<template>
    <div
        class="home"
        style="background-image: url('/src/assets/images/tatum-bergen-TIiH48yOLDU-unsplash.jpg')"
    >
        <burger-button :options="burgerOptions" />
        <button class="button is-medium is-primary is-light behind-burger">
            <router-ilink to="/form" transition="down" label="Form"></router-ilink>
        </button>
        <div class="m-4"></div>
        <mg-builder :components="components" @formio-event="handleFormioEvent"></mg-builder>
    </div>
    <!-- @change="handleChange" -->
</template>
