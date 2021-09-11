<script>
import Form from "../components/Form.vue";
import {
    defineComponent,
    ref,
    watch,
    computed,
    reactive,
    isReactive,
} from "vue";
import store from "../store.js";
import { reactDeepUpdate } from "../lib/reactUtils";

export default defineComponent({
    components: {
        Form,
    },
    setup(props) {
        const getSubmission = () => {
            let res = store.getters.submission;
            console.log(`[VForm.getSubmission] sub=${JSON.stringify(res)}`);
        };
        const setSubmission = (val) => store.dispatch("setSubmission", val);
        const form = computed(() => store.getters.form);
        const defaultSubmission = computed(() => store.getters.submission);

        var options = ref({});

        function mySubmit(...args) {
            args[0].metadata = {}; // Avoid polluting console
            console.log(
                `[VForm.mySubmit] ${args.length} args, args[0]:${JSON.stringify(
                    args
                )}`
            );
            setSubmission(args[0]);
        }

        let submission = reactive({ data: {} });

        function handleFormioEvent(...args) {
            let val = args.pop();
            if (typeof args[1] == "object") {
                console.log(
                    `[VForm.formioEvent] ${val.eventName}':${
                        args.length
                    } args args[0]:${Object.keys(args[0])}`
                );
            } else {
                console.log(
                    `[VForm.formioEvent] '${val.eventName}':${args.length} args.`
                );
            }
            switch (val.eventName) {
                case "submit":
                    mySubmit(...args);
                    break;
            }
        }

        function handleFormioKey(e) {
            console.log(
                `[VForm.handlehandleFormioKey] key:'${e.detail.key}' code:'${e.detail.e.code}' ctrl:${e.detail.e.ctrlKey}`
            );
        }

        let handleSubmission = function (event) {
            reactDeepUpdate(submission, event.data);
        };

        // expose to template
        return {
            form,
            submission,
            defaultSubmission,
            handleFormioEvent,
            handleSubmission,
            handleFormioKey,
            options,
        };
    },
});
</script>
<template>
    <div class="home">
        <Form
            :src="form"
            :options="options"
            :default="defaultSubmission"
            @formio-event="handleFormioEvent"
            @formio-key="handleFormioKey"
            @update:submission="handleSubmission"
        ></Form>
    </div>
    <div>res:'{{ JSON.stringify(submission) }}'</div>
    <!-- {{ X }} -->
    <!-- v-model="submission" -->
</template>
