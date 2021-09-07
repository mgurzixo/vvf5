<template>
    <div class="home">
        <Form
            v-bind:src="form"
            v-bind:options="options"
            v-bind:submission="getMySub"
            v-on:submit="mySub"
        ></Form>
    </div>
</template>

<script>
"use strict";
import { Form } from "@/components/Form";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    components: {
        Form,
    },
    data: function () {
        return {
            options: {},
            roSub: this.$store.getMySub,
        };
    },
    computed: {
        ...mapState(["form", "sub"]),
        ...mapGetters(["getMySub"]),
    },
    methods: {
        ...mapActions(["setForm"]),
        mySub: function (event) {
            // Avoid polluting console :)
            // The metadata is generated at submit time
            event.metadata = {};
            console.log(`[Form] event:${JSON.stringify(event)}`);
            // See https://help.form.io/developers/form-renderer#form-events

            this.$store.dispatch("setSub", event);
        },
    },
};
</script>
