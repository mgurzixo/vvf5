<script setup>
import { ref, reactive, computed } from "vue";
import TForm from "../components/TForm.vue";

defineProps({
    msg: String,
});

let myName = ref({});
// let XX = {};
// let myName = computed({
//     get() {
//         console.log(`[get]:${XX}`);
//         return XX;
//     },
//     set(val) {
//         console.log(`[set]: ${val}`);
//         XX = val;
//     },
// });

myName.value = { id: "Coucou" };

function submitForm() {
    console.log(myName.value);
}
</script>
<template>
    <h1>{{ msg }}</h1>
    <TForm v-model:myname="myName" @submit="submitForm" />
    <div>Hello, '{{ myName.id }}'!</div>
</template>

<style scoped>
a {
    color: #42b983;
}
</style>
