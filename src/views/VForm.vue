<script setup>
"use strict";
import { ref, getCurrentInstance } from "vue";
import Form from "../components/Form.vue";

var form = {
    components: [
        {
            type: "textfield",
            key: "firstName",
            label: "First Name",
        },
        {
            type: "textfield",
            key: "lastName",
            label: "Last Name",
        },
        {
            type: "button",
            key: "submit",
            label: "Submit",
        },
    ],
};

var mySub = {};

var options = ref({});

function mySubmit(...args) {
    args[0].metadata = {}; // Avoid polluting console
    console.log(
        `[VForm.mySubmit] ${args.length} args, args[0]:${JSON.stringify(args)}`
    );
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
}

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
            v-model:submission="mySub"
            v-on:formio-event="formioEvent"
            v-on:formio-key="formioKey"
        ></Form>
    </div>
</template>
