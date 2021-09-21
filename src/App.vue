<template>
    <div class="">
        <burger-button doILInk="doILInk" />
        <my-app />
        <button class="button is-warning" style="z-index: 5000" @click="handleClick">
            Click Me
        </button>
    </div>
</template>

<script>
import myApp from "./views/myApp.vue";
import _ from "lodash";
import router from "./routes";
import BurgerButton from "./components/BurgerButton.vue";
import { getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
    components: {
        myApp,
        BurgerButton,
    },
    setup(props) {
        const router = useRouter();
        var vm = getCurrentInstance();
        function doILink(route, type) {}
        let handleClick = function () {
            console.log(`clicked`);
            let app = document.getElementById("app");
            app.style.transition = undefined;
            let el = app.innerHTML;
            let clone = document.getElementById("mgShadowApp");
            if (!clone) {
                let el1 = document.createElement("div");
                clone = app.parentElement.appendChild(el1);
            }
            clone.className = "mgright";
            clone.id = "mgShadowApp";
            clone.style.transition = undefined;
            clone.style.zindex = -1000;
            clone.innerHTML = el;
            app.style.transition = undefined;

            clone.style.left = "0vw";
            clone.scrollTop = app.scrollTop;

            app.style.display = "none";

            app.style.left = "100vw";
            app.style.display = "block";
            router.push("/builder");

            // https://stackoverflow.com/questions/15875128/is-there-element-rendered-event
            setTimeout(() => {
                clone.style.transition = "left 0.3s, ease ease-in-out";
                app.style.transition = "left 0.3s, ease ease-in-out";
                // clone.style.transitionDelay = "0.1s";
                // app.style.transitionDelay = "0.1s";
                clone.style.left = "-100vw";
                app.style.left = "0vw";
            }, 0);
            console.log(`end clicked`);
        };
        return { handleClick, doILink };
    },
};
</script>

<style>
.mgscreen {
    position: fixed;
    top: 0vh;
    left: 0vw;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
}

.mgleft {
    position: fixed;
    top: 0vh;
    left: -100vw;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
}

.mgright {
    position: fixed;
    top: 0vh;
    left: 100vw;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
}
</style>
