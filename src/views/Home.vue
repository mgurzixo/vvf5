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
                                <div class="title">
                                    Welcome to <br />Vite+<u>Formio</u>+Vue3+Bulma App
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <router-ilink
                        to="/builder"
                        label="Builder"
                        button="button m-3 is-medium is-primary is-light has-text-black is-outlined"
                    ></router-ilink>
                    <router-ilink
                        to="/form"
                        label="Form"
                        button="button m-3 is-medium is-primary is-light"
                    ></router-ilink>
                    <!-- from https://www.w3schools.com/css/tryit.asp?filename=trycss_layout_float2 -->
                    <div class="m-3">
                        <h2 class="is-size-3">Float Left</h2>
                        <p>
                            In this example, the image will float to the left in the paragraph, and
                            the text in the paragraph will wrap around the image.
                        </p>

                        <p>
                            <img
                                src="/src/assets/images/pineapple.jpg"
                                alt="Pineapple"
                                style="width: 170px; height: 170px; margin-right: 15px; float: left"
                            />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                            imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
                            scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
                            congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut
                            aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio.
                            Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc
                            sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero
                            sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget
                            tellus gravida venenatis. Integer fringilla congue eros non fermentum.
                            Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis
                            diam velit.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
