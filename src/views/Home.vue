<script>
import burgerButton from "@/components/BurgerButton.vue";
import mgDrawer from "@/components/MgDrawer.vue";
import { reactive } from "vue";
import { getDrawer, setDrawer } from "@/lib/MgDrawer.js";
import routerIlink from "@/components/RouterIlink.vue";

export default {
    components: {
        burgerButton,
        mgDrawer,
        routerIlink,
    },
    setup(props) {
        const burgerOptions = reactive({
            action: () => setDrawer(true),
            transition: "none",
        });
        return { burgerOptions };
    },
};
</script>

<template>
    <div
        style="background-image: url('/src/assets/images/igor-kasalovic-tNDvFkxkBHo-unsplash.jpg')"
    >
        <burger-button :options="burgerOptions" />
        <mg-drawer></mg-drawer>
        <div class="m-5"></div>

        <!-- https://stackoverflow.com/questions/53244082/how-to-center-a-section-with-bulma -->
        <section class="section">
            <div class="card">
                <div class="card-header">
                    <div class="container">
                        <div class="columns is-multiline is-centered is-mobile">
                            <div class="column has-text-centered">
                                <div class="title">Welcome to <br />Vite+Formio+Vue3+Bulma App</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <button class="button m-3 is-medium is-primary is-light">
                        <router-ilink to="/builder" label="Builder"></router-ilink>
                    </button>
                    <button class="button m-3 is-medium is-primary is-light">
                        <router-ilink to="/form" label="Form"></router-ilink>
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>
