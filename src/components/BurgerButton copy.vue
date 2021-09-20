<script>
// Plagiarized from https://github.com/VitorLuizC/vue-burger-button
// Which does not work with vue3

"use strict";
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        active: {
            Boolean,
            default: false,
        },
        barWidth: {
            type: Number,
            default: 40,
        },
        barHeight: {
            type: Number,
            default: 5,
        },
        barColor: {
            type: String,
            default: "#000000",
        },
    },
});
</script>

<template>
    <button
        class="burguer-button"
        :class="{ '-active': active }"
        :style="{
            width: barWidth + 'px',
            height: barHeight * 6 + 'px',
        }"
    >
        <span
            class="bar"
            v-for="index in 3"
            :key="index"
            :style="{
                width: barWidth + 'px',
                height: barHeight + 'px',
                backgroundColor: barColor,
            }"
        ></span>
    </button>
</template>

<style lang="scss">
.burguer-button {
    appearance: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
    border-width: 0;
    border-style: none;
    border-color: transparent;
    background-image: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    & > .bar {
        display: block;
        border-radius: 25px;
        background-color: #000;
        transition: opacity 0.2s ease-in, transform 0.2s ease-out;
        &:nth-child(1) {
            transform: translateY(-75%);
        }
        &:nth-child(3) {
            transform: translateY(75%);
        }
    }
    &.-active {
        & > .bar {
            &:nth-child(2) {
                opacity: 0;
            }
            &:nth-child(1) {
                transform: translateY(100%) rotate(45deg);
            }
            &:nth-child(3) {
                transform: translateY(-100%) rotate(-45deg);
            }
        }
    }
}
</style>
