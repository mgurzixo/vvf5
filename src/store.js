"use strict";
import { createStore } from "vuex";

export default createStore({
    state: {
        // Warning! all getters elements MUST exist!
        form: {
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
        },
        submission: {
            data: { firstName: "1", lastName: "2", submit: true },
        },
    },
    mutations: {
        setForm(state, myForm) {
            console.log(`[store.mutations.setForm]`);
            state.form = myForm;
        },
        setComponents(state, myComponents) {
            state.form.components = myComponents;
            console.log(`[store.mutations.setComponents]`);
        },
        setSubmission(state, mySubmission) {
            // Changing the state triggers an update of the
            // form submission, accessed through submission
            console.log(`[store.mutations.setSubmission]`);
            // state.submission = mySubmission;
            state.submission = {};
        },
    },
    actions: {
        setForm(context, myForm) {
            console.log(`[store.actions.setForm]`);
            context.commit("setForm", myForm);
        },
        setComponents(context, myComponents) {
            console.log(`[store.actions.setComponents]`);
            context.commit("setComponents", myComponents);
        },
        setSubmission(context, mySub) {
            console.log(`[store.actions.setSubmission]`);
            setTimeout(() => {
                // Simulate a Db update taking 2 seconds
                context.commit("setSubmission", mySub);
            }, 2000);
        },
    },
    getters: {
        components: (state) => {
            console.log(`[store.getters.components]`);
            return state.form.components;
        },
        form: (state) => {
            console.log(`[store.getters.form]`);
            return state.form;
        },
        submission: (state) => {
            console.log(`[store.getters.submission]`);
            return state.submission;
        },
    },
});
