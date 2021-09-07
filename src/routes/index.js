import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
// import Form from "@/views/Form.vue";
import VBuilder from "@/views/VBuilder.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    // {
    //     path: "/form",
    //     name: "form",
    //     component: Form,
    // },
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
