<template>
    <div>
        <div
            class="mgdrawer-overlay"
            :style="overlayDisplay"
            @click="handleDrawerClick($event)"
        ></div>
        <div
            class="mgdrawer has-background-dark"
            @click="handleDrawerClick($event, link)"
            :class="{ 'is-visible': isDrawerActive }"
        >
            <div class="menu has-background-dark is-invert">
                <p class="menu-label">General</p>
                <ul class="menu-list">
                    <router-link to="/">Home</router-link>
                    <router-link to="/drag">Drag</router-link>
                </ul>
                <p class="menu-label">Forms</p>
                <ul class="menu-list">
                    <li><a>Item 1</a></li>
                    <li>
                        <!-- <a class="is-active">Manage Your Team</a> -->
                        <a> The Form System</a>
                        <ul>
                            <router-link to="/builder">Builder</router-link>
                            <router-link to="/form">Form</router-link>
                        </ul>
                    </li>
                </ul>
                <p class="menu-label">Transactions</p>
                <ul class="menu-list">
                    <li><a>Payments</a></li>
                    <li><a>Transfers</a></li>
                    <li><a>Balance</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {};
    },
    computed: {
        isDrawerActive: {
            get() {
                return this.$store.state.drawer;
            },
            set(val) {
                this.$store.commit("setDrawer", val);
            },
        },
        overlayDisplay() {
            let res = `display:${this.$store.state.drawer == true ? "block" : "none"}`;
            return res;
        },
    },
    methods: {
        // ...mapMutations(["setDrawer"]),
        handleDrawerClick(e, link) {
            console.log(`click Drawer`);
            if (link) {
                // Handle nav
            }
            this.$store.commit("setDrawer", false);
            // this.onClick(e, l);
        },
    },
};
</script>
