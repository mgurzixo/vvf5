<template>
    <nav
        class="navbar is-fixed-top has-shadow has-background-grey-lighter is-size-5"
        role="navigation"
        aria-label="main navigation"
    >
        <div class="navbar-brand">
            <div class="navbar-item">
                <img src="../assets/logo.png" />
            </div>
            <div class="navbar-item has-text-weight-bold has-text-secondary">VVF5</div>

            <a
                role="button"
                class="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="mainMenu"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="mainMenu" class="navbar-menu has-text-secondary">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/">Home</router-link>
                <router-link class="navbar-item" to="/builder">Builder</router-link>
                <router-link class="navbar-item" to="/form">Form</router-link>
                <router-link class="navbar-item" to="/drag">Drag</router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link"> More </a>

                    <div class="navbar-dropdown is-size-5 has-background-grey-ligh">
                        <a class="navbar-item"> About </a>
                        <a class="navbar-item"> Jobs </a>
                        <a class="navbar-item"> Contact </a>
                        <hr class="navbar-divider" />
                        <a class="navbar-item"> Report an issue </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary is-small">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light is-small"> Log in </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import throttle from "lodash/throttle";

export default {
    data() {
        return {
            isActive: false,
            showNavbar: true,
            lastScrollPosition: 0,
        };
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener("resize", throttle(this.closeMenu, 500));
            window.addEventListener("scroll", throttle(this.hideNav, 250));
        });
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.closeMenu);
        window.removeEventListener("scroll", this.hideNav);
    },
    methods: {
        closeMenu() {
            this.isActive = false;
        },
        hideNav() {
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScrollPosition < 0) return;
            if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) return;
            this.showNavbar = currentScrollPosition < this.lastScrollPosition;
            this.lastScrollPosition = currentScrollPosition;
            setTimeout(this.closeMenu, 250);
        },
    },
};
</script>
