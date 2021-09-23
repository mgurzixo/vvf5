import { ref } from "vue";
let drawerActive = ref(false);
export function setDrawer(val) {
    console.log(`[MgDrawer.setDrawer] val=${val}`);
    drawerActive.value = val;
}
export function getDrawer() {
    console.log(`[MgDrawer.getDrawer] drawerActive=${drawerActive.value}`);
    return drawerActive;
}
