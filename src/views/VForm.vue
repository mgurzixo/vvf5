<script setup>
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

var options = {};

function submit() {
    console.log(`[Vform.submit] ${JSON.stringify(mySub)}`);
}
</script>

<template>
    <div class="home">
        <Form
            v-bind:src="form"
            v-bind:options="options"
            v-bind:submission="mySub"
            v-on:submit="submit"
        ></Form>
    </div>
</template>
