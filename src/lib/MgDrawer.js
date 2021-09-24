import { ref } from "vue";
let drawerActive = ref(false);
let drawerDurationMs = ref(300);
export function setDrawer(val) {
    console.log(`[MgDrawer.setDrawer] val=${val}`);
    drawerActive.value = val;
}
export function getDrawer() {
    console.log(`[MgDrawer.getDrawer] drawerActive=${drawerActive.value}`);
    return drawerActive;
}

export function getDrawerDuration() {
    return drawerDurationMs;
}

export function setDrawerDuration(val) {
    drawerDurationMs.value = val;
}
