<script>
import Form from "../components/Form.vue";
import { defineComponent, ref, computed, reactive, isReactive, watch, watchEffect } from "vue";
import store from "../store.js";
import { vue3DeepClone } from "../lib/vue3Utils";
import burgerButton from "@/components/BurgerButton.vue";
import { useRouter, useRoute } from "vue-router";
import routerIlink from "@/components/RouterIlink.vue";

export default defineComponent({
    components: {
        Form,
        burgerButton,
        routerIlink,
    },
    setup(props) {
        const setSubmission = (val) => store.dispatch("setSubmission", val);
        const form = store.getters.form;
        let defaultSubmission = store.getters.submission;
        let currentSubmission = reactive({});
        var options = reactive({});

        function handleSubmit(...args) {
            args[0].metadata = {}; // Avoid polluting console
            console.log(
                `[VForm.handleSubmit] ${args.length} args, args[0]=${JSON.stringify(args[0])}`
            );
            setSubmission(args[0]);
        }

        function handleFormioKey(e) {
            // console.log(
            //     `[VForm.handlehandleFormioKey] key:'${e.detail.key}' code:'${e.detail.e.code}' ctrl:${e.detail.e.ctrlKey}`
            // );
        }

        let handleSubmission = function (event) {
            // console.log(
            //     `[VForm.handleSubmission] event=${JSON.stringify(event)}`
            // );
            // Copy non reactive event to reactive currentSubmission without loosing reactivity
            vue3DeepClone(currentSubmission, event);
        };

        function handleFormioEvent(...args) {
            let val = args.pop();
            if (typeof args[1] == "object") {
                console.log(
                    `[VForm.formioEvent] ${val.eventName}':${
                        args.length
                    } args args[0]:${Object.keys(args[0])}`
                );
            } else {
                console.log(`[VForm.formioEvent] '${val.eventName}':${args.length} args.`);
            }
            switch (val.eventName) {
                case "submit":
                    handleSubmit(...args);
                    break;
            }
        }

        // Burger button
        const router = useRouter();
        const burgerOptions = reactive({
            action: () => router.push("/"),
            transition: "left",
        });

        // expose to template
        return {
            form,
            currentSubmission,
            defaultSubmission,
            handleFormioEvent,
            handleSubmission,
            handleFormioKey,
            options,
            burgerOptions,
        };
    },
});
</script>
<template>
    <div
        class="home"
        style="background-image: url('/src/assets/images/josh-rose-9YQGFzg0RiM-unsplash.jpg')"
    >
        <burger-button :options="burgerOptions" />
        <button class="button is-medium is-primary is-light behind-burger">
            <router-ilink to="/builder" transition="up" label="Builder"></router-ilink>
        </button>
        <div class="m-5"></div>

        <Form
            :src="form"
            :options="options"
            :default="defaultSubmission"
            @formio-event="handleFormioEvent"
            @formio-key="handleFormioKey"
            @update-submission="handleSubmission"
        ></Form>
    </div>
    <div>currentSubmission = '{{ currentSubmission }}'</div>
    defaultSubmission = '{{ defaultSubmission }}''
    <!-- v-model="submission" -->
</template>
