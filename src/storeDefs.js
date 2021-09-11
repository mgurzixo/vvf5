// storeDefs.js
// not pretty, but vuex4 is still in infancy,
// and https://medium.com/geekculture/mapgetters-with-vue3-vuex4-and-script-setup-5827f83930b4
// does not seem to work...

"use strict";

import { computed } from "vue";
import { useStore } from "vuex";

let store;

// Tricky: useStore is not valid inside an event handler...
export const initStoreDefs = () => (store = useStore());

export const getSubmission = computed(() => store.getters.submission);
export const setSubmission = (val) => store.dispatch("setSubmission", val);

export const form = computed(() => store.getters.form);
export const setForm = (val) => store.dispatch("setForm", val);

export const components = computed(() => store.getters.components);
export const setComponents = (val) => store.dispatch("setComponents", val);
