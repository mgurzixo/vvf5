<script setup>
"use strict";

import HelloWorld from "@/components/HelloWorld.vue";
</script>

<template>
    <!-- https://stackoverflow.com/questions/53244082/how-to-center-a-section-with-bulma -->
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="title">
                        <HelloWorld msg="Welcome to Formio+Vuejs3+Vite App" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
