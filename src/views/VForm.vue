<script setup>
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

function anyEvent(...args) {
    let val = args.pop();
    if (typeof args[1] == "object") {
        console.log(
            `[Vform.anyEvent] ${val.eventName}':${
                args.length
            } args args[0]:${Object.keys(args[0])}`
        );
    } else {
        console.log(`[Vform.anyEvent] '${val.eventName}':${args.length} args.`);
    }
}

let mySubmit = (...args) => {
    console.log(`[Vform.submit] ${args.length} args.`);
    console.log(`[VForm.mySubmit] arg[0]:${Object.keys(args[0])}`);
    // console.log(`[VForm.mySubmit] arg2:${JSON.stringify(args[1])}`);
    console.log(`[Vform.mySubmit] mySub:${JSON.stringify(mySub)}`);
};
</script>

<template>
    <div class="home">
        <Form
            v-bind:src="form"
            v-bind:options="options"
            v-model:submission="mySub"
            v-on:Xsubmit="mySubmit"
            v-on:__any="anyEvent"
        ></Form>
    </div>
</template>
