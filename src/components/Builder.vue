<script>
"use strict";

// Sourced from vue-formio/src/FormBuilder.ts
import FormioFormBuilder from "formiojs/FormBuilder";
import AllComponents from "formiojs/components";
import Components from "formiojs/components/Components";
Components.setComponents(AllComponents);
import bulma from "../templatesCompiled/bulma";
import Templates from "formiojs/templates/Templates";

import { onMounted, onUnmounted, watch, getCurrentInstance, defineComponent } from "vue";

export default defineComponent({
    props: {
        components: {
            type: Array,
            default: [],
        },
        options: {
            type: Object,
            default: {},
        },
    },

    emits: [
        "change",
        "formio-event",
        "saveComponent",
        "updateComponent",
        "deleteComponent",
        "editComponent",
        "redraw",
        "addComponent",
    ],

    setup(props) {
        var builder;
        var builderReady;
        var vm = getCurrentInstance();
        // console.log(`[Builder] getCurrentInstance=${Object.keys(vm)}`);

        function initializeBuilder() {
            // console.log(`[Builder.initializeBuilder] builder=${builder}`);
            if (builder !== undefined) {
                builder.instance.destroy(true);
            }
            builder = new FormioFormBuilder(
                vm.refs.formio,
                {
                    components: props.components,
                    settings: props.options,
                },
                {
                    baseUrl: "",
                }
            );
            builderReady = builder.ready;
            return builderReady.then(() => {
                builder.instance.events.onAny((...args) => {
                    // console.log(`[Builder.onAny] got event`);
                    const eventParts = args[0].split(".");
                    // Only handle formio events.
                    const namespace = props.options.namespace || "formio";
                    if (eventParts[0] !== namespace || eventParts.length !== 2) {
                        return;
                    }
                    // Remove formio. from event.
                    args[0] = eventParts[1];
                    // console.log(`[Builder.onAny] sending formio event:${args[0]}`);
                    vm.emit.apply(vm, args);
                    // Emit a change event if the schema changes.
                    if (
                        ["saveComponent", "updateComponent", "deleteComponent"].includes(
                            eventParts[1]
                        )
                    ) {
                        args[0] = "change";
                        vm.emit.apply(vm, args);
                    }
                    // Create the formio-event event so that vue can listen on it
                    args.push({
                        eventName: args[0],
                        builder: builder,
                    });
                    args[0] = "formio-event";
                    vm.emit.apply(vm, args);
                });
            });
        }

        function useBulma() {
            // console.log(`[useBulma] ${JSON.stringify(bulma, null, 2)}`);
            for (var comp of Object.keys(bulma)) {
                Templates.current[comp] = bulma[comp];
            }
        }

        onMounted(function () {
            // console.log(`[Builder.onMounted] props=${JSON.stringify(props)}`);
            useBulma();
            initializeBuilder().catch((err) => {
                console.warn(`Builder] ${err}`);
            });
        });

        onUnmounted(function () {
            // console.log(`[Builder.onUnmounted]`);
            if (builder) {
                builder.instance.destroy(true);
            }
        });

        // Not tested !!!
        watch(
            () => props.components,
            (newComp, oldComp) => {
                console.log(`[Builder.watch] components changed`);
                if (builder) {
                    builder.instance.form = newComp;
                }
            }
        );
        // expose to template
        return {};
    },
});
</script>

<template>
    <div ref="formio"></div>
    <!-- <p><pre>{{JSON.stringify(components, null, 2)}}</pre></p> -->
</template>
