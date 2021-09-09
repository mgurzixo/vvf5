<script setup>
"use strict";
import Builder from "../components/Builder.vue";
var components = [
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
];

function changed() {
    // console.log(`[Vbuilder.changed]`);
    // console.log(`[Vbuilder.changed] ${JSON.stringify(components)}`);
}

function formioEvent(...args) {
    let val = args.pop();
    console.log(
        `[VBuilder.formioEvent] '${val.eventName}': ${args.length} args.`
    );
}
</script>
<template>
    <div class="home">
        <Builder
            :components="components"
            @change="changed"
            @formio-event="formioEvent"
        ></Builder>
    </div>
</template>
