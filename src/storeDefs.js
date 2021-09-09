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

export const components = computed(() => store.getters.components);
export const setForm = (val) => store.dispatch("setForm", val);
export const setComponents = (val) => store.dispatch("setComponents", val);
export const setSub = (val) => store.dispatch("setSub", val);
