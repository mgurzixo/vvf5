<script setup>
import Builder from "../components/Builder.vue"; // @ is an alias to /src
</script>
<template>
    <div class="home">
        <Builder :form="myForm" />
    </div>
</template>

<script>
"use strict";

export default {
    data() {
        return {
            myForm: {
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
                ],
            },
        };
    },
    components: {
        Builder,
    },
};
</script>
