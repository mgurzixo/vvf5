<template>
    <nav
        class="navbar has-shadow has-background-grey-lighter is-size-5"
        role="navigation"
        aria-label="main navigation"
    >
        <div class="navbar-brand">
            <div class="navbar-item ml-6 pl-5 mr-0 pr-0">
                <img src="../assets/logo.png" />
            </div>
            <div class="navbar-item has-text-weight-bold has-text-secondary">VVF5(2)</div>

            <a
                class="navbar-burger"
                role="button"
                aria-label="menu"
                aria-expanded="false"
                data-target="mainMenu"
                @click="toggleBurger"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div
            id="mainMenu"
            class="navbar-menu has-text-secondary"
            :class="{ 'is-active': isHamburgerOpen }"
        >
            <div class="navbar-start" @click="toggleBurger">
                <router-link class="navbar-item" to="/builder">Builder</router-link>
                <router-link class="navbar-item" to="/form">Form</router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" @mouseenter="moreEnter" @mouseleave="moreLeave">
                        More
                    </a>

                    <div
                        class="navbar-dropdown is-size-5 has-background-grey-light"
                        @mouseenter="submenuEnter"
                        @mouseleave="submenuLeave"
                    >
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
export default {
    data() {
        return {
            isHamburgerOpen: false,
        };
    },
    methods: {
        toggleBurger() {
            console.log(`toggleBurger`);
            this.isHamburgerOpen = !this.isHamburgerOpen;
        },
        moreEnter(ev) {
            console.log(`moreEnter: y=${ev.clientY}`);
        },
        moreLeave(ev) {
            console.log(`moreLeave: y=${ev.clientY}`);
        },
        submenuEnter(ev) {
            console.log(`submenuEnter: y=${ev.clientY}`);
        },
        submenuLeave(ev) {
            console.log(`submenuLeave: y=${ev.clientY}`);
        },
    },
};
</script>
