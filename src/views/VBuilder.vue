<script setup>
"use strict";
console.log(`[VBuilder] entering`);

import Builder from "../components/Builder.vue";
import {
    initStoreDefs,
    components,
    setComponents,
    setForm,
} from "../storeDefs";
initStoreDefs();

function changed(event) {
    // console.log(`[Vbuilder.changed] ${JSON.stringify(event)}`);
    if (event.components) {
        // console.log(`[Builder.changed] event:${Object.keys(event)}`);
        // Dirty ;) cf. console.log...
        // See https://help.form.io/developers/form-builder#events
        setForm(event);
    } else {
        // console.log(`[Vbuilder.changed] no components`);
    }
}

function formioEvent(...args) {
    let val = args.pop();
    // console.log(
    //     `[VBuilder.formioEvent] '${val.eventName}': ${args.length} args.`
    // );
}

console.log(`[VBuilder] end`);
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
