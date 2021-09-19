import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import VForm from "@/views/VForm.vue";
import VBuilder from "@/views/VBuilder.vue";
import VDrag from "../views/Xdrag.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/drag",
        name: "drag",
        component: VDrag,
    },
    {
        path: "/form",
        name: "form",
        component: VForm,
    },
    {
        path: "/builder",
        name: "builder",
        component: VBuilder,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
