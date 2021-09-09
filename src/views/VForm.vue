<script setup>
"use strict";
import { ref, watch } from "vue";
import Form from "../components/Form.vue";
import { initStoreDefs, form, submission, setSubmission } from "../storeDefs";
initStoreDefs();

var options = ref({});

function mySubmit(...args) {
    args[0].metadata = {}; // Avoid polluting console
    console.log(
        `[VForm.mySubmit] ${args.length} args, args[0]:${JSON.stringify(args)}`
    );
    setSubmission(args[0]);
}

function formioEvent(...args) {
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

    // console.log(`[VForm] sub=${JSON.stringify(submission.value)}`);
}
watch(submission, (newSub, oldSub) => {
    // console.log(`[VForm.watch.submission]`);
    console.log(`[VForm.watch.submission] sub=${JSON.stringify(newSub)}`);
});
function formioKey(e) {
    console.log(
        `[VForm.formioKey] key:'${e.detail.key}' code:'${e.detail.e.code}' ctrl:${e.detail.e.ctrlKey}`
    );
}
</script>

<template>
    <div class="home">
        <Form
            v-bind:src="form"
            v-bind:options="options"
            v-bind:submission="submission"
            v-on:formio-event="formioEvent"
            v-on:formio-key="formioKey"
        ></Form>
    </div>
</template>
