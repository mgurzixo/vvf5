"use strict";
import { createStore } from "vuex";
import { vue3DeepClone } from "./lib/vue3Utils";
export default createStore({
    state: {
        // Warning! all getters elements MUST exist!
        // drawer: false,
        isLoggedIn: null,
        form: {
            components: [
                {
                    label: "Columns",
                    key: "columns",
                    type: "columns",
                    columns: [
                        {
                            width: 6,
                            offset: 0,
                            push: 0,
                            pull: 0,
                            size: "md",
                            currentWidth: 6,
                            components: [
                                {
                                    type: "textfield",
                                    key: "firstName",
                                    label: "First Name",
                                },
                            ],
                        },
                        {
                            width: 6,
                            offset: 0,
                            push: 0,
                            pull: 0,
                            size: "md",
                            currentWidth: 6,
                            components: [
                                {
                                    type: "textfield",
                                    key: "lastName",
                                    label: "Last Name",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "button",
                    key: "submit",
                    label: "Submit",
                },
            ],
        },
        submission: {
            data: { firstName: "1" /* lastName: "2", submit: true*/ },
        },
    },
    getters: {
        // drawer: (state) => state.drawer,
        isLoggedIn: (state) => state.isLoggedIn,
    },
    mutations: {
        // toggleDrawer: (state) => (state.drawer = !state.drawer),
        // setDrawer: (state, payload) => {
        //     console.log(`[store.setDrawer] ${payload}`);
        //     state.drawer = payload;
        // },
        // Formio
        setForm(state, myForm) {
            console.log(`[store.mutations.setForm]`);
            state.form.value = myForm;
        },
        setComponents(state, myComponents) {
            state.form.components.value = myComponents;
            console.log(`[store.mutations.setComponents]`);
        },
        setSubmission(state, mySubmission) {
            vue3DeepClone(state.submission, mySubmission);
            // console.log(
            //     `[store.mutations.setSubmission] state sub = ${JSON.stringify(
            //         state.submission
            //     )}`
            // );
        },
    },
    actions: {
        setForm(context, myForm) {
            // console.log(`[store.actions.setForm]`);
            context.commit("setForm", myForm);
        },
        setComponents(context, myComponents) {
            // console.log(`[store.actions.setComponents]`);
            context.commit("setComponents", myComponents);
        },
        setSubmission(context, mySub) {
            console.log(`[store.actions.setSubmission]`);
            setTimeout(() => {
                // Simulate a Db update taking 2 seconds
                context.commit("setSubmission", mySub);
            }, 1000);
        },
    },
    getters: {
        components: (state) => {
            // console.log(`[store.getters.components]`);
            return state.form.components;
        },
        form: (state) => {
            // console.log(`[store.getters.form]`);
            return state.form;
        },
        submission: (state) => {
            console.log(`[store.getters.submission] sub=${JSON.stringify(state.submission)}`);
            return state.submission;
        },
    },
});
