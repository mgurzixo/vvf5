"use strict";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        form: {},
        sub: {},
    },
    mutations: {
        setForm(state, myForm) {
            state.form = myForm;
        },
        setSub(state, mySub) {
            // Changing the state triggers an update of the
            // form submission, accessed through getMySub
            state.sub = mySub;
        },
    },
    actions: {
        setForm(context, myForm) {
            context.commit("setForm", myForm);
        },
        setSub(context, mySub) {
            console.log(`[store.setSub] mySub:${JSON.stringify(mySub)}`);
            setTimeout(() => {
                // Simulate a Db update taking 2 seconds
                context.commit("setSub", mySub);
            }, 2000);
        },
    },
    getters: {
        // Used for getting a console message; otherwise use mapState
        getMyForm: (state) => {
            console.log(`[store.getMyForm] form:${JSON.stringify(state.form)}`);
            return state.form;
        },
        getMySub: (state) => {
            console.log(`[store.getMySub] sub:${JSON.stringify(state.sub)}`);
            return state.sub;
        },
    },
});
