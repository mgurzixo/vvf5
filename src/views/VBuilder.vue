<script setup>
import Builder from "../components/Builder.vue"; // @ is an alias to /src
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

function anyEvent(...args) {
    let val = args.pop();
    console.log(`[VBuilder.anyEvent] '${val.eventName}':${args.length} args.`);
    // if (typeof args[1] == "object")
    //     console.log(`[VBuilder.anyEvent] ${Object.keys(args[0])}`);
}
</script>
<template>
    <div class="home">
        <Builder :components="components" @change="changed" @__any="anyEvent" />
    </div>
</template>
