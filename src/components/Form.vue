<script>
"use strict";
import {
    onMounted,
    onUnmounted,
    watch,
    getCurrentInstance,
    toRaw,
    isReactive,
    defineComponent,
} from "vue";

// Sourced from vue-formio/src/components/Form.ts
import AllComponents from "formiojs/components";
import Components from "formiojs/components/Components";
Components.setComponents(AllComponents);
import Templates from "formiojs/templates/Templates";
import FormioForm from "formiojs/Form";
import bulma from "../templatesCompiled/bulma";

export default defineComponent({
    props: {
        src: {
            type: Object,
            default: { components: [] },
        },
        default: {
            type: Object,
            default: { data: {} },
        },
        language: {
            type: String,
            default: "en",
        },
        options: {
            type: Object,
            default: {},
        },
    },
    emits: ["update-submission", "formio-event"],

    setup(props) {
        let formInstance;
        let vm = getCurrentInstance();

        onMounted(function () {
            useBulma();
            initializeForm()
                .then(() => {
                    setupForm();
                })
                .catch((err) => {
                    console.warn(`[Form] ${err}`);
                });
        });

        function initializeForm() {
            return new FormioForm(
                vm.refs.formio,
                props.src,
                props.options
            ).ready
                .then((myInstance) => {
                    formInstance = myInstance;
                    return formInstance;
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        function useBulma() {
            // console.log(`[useBulma] ${JSON.stringify(bulma, null, 2)}`);
            for (var comp of Object.keys(bulma)) {
                Templates.current[comp] = bulma[comp];
            }
        }

        function setFormSubmission(val) {
            if (formInstance) {
                // Without JSON, defaultSubmission in Form will be polluted...
                formInstance.setSubmission(JSON.parse(JSON.stringify(val)));
                // .then(() => {
                //     console.log(
                //         `[Form.setFormSubmission]setSubmission done formInstance.submission=${JSON.stringify(
                //             formInstance.submission
                //         )}`
                //     );
                // });
            }
        }

        function setupForm() {
            if (!formInstance) {
                return;
            }
            for (let comp of formInstance.components) addKeyEvent(comp);
            formInstance.language = props.language;
            formInstance.nosubmit = true;
            setFormSubmission(props.default);
            watch(props.default, () => {
                setFormSubmission(props.default);
            });

            formInstance.events.onAny((...args) => {
                const eventParts = args[0].split(".");
                // Only handle formio events. Should we?
                const namespace = props.options.namespace || "formio";
                if (eventParts[0] !== namespace || eventParts.length !== 2) {
                    console.log(`[Form.onAny]  got nonFormio event:${args[0]}`);
                    return;
                }
                // Remove formio. from event.
                args[0] = eventParts[1];
                if (args[0] == "change") {
                    // send current submission
                    // For an unknown reason, args[1].changed is weird!
                    // Maybe https://stackoverflow.com/questions/46850145/return-undefined-from-existing-property-in-javascript-model
                    args[1]["changed"] = {};
                    args[1]["changed"] = undefined;
                    vm.emit("update-submission", args[1]);
                }
                // Emit custom events under their own name as well.
                if (eventParts[1] === "customEvent") {
                    args[0] = args[1].type;
                }
                // Create the formio-event event so that vue can listen
                // to all formio events easily
                args.push({
                    eventName: args[0],
                    formInstance: formInstance,
                });
                args[0] = "formio-event";
                vm.emit.apply(vm, args);
            });
        }

        function addKeyEvent(comp) {
            let elem = document.getElementById(comp.id);
            elem.addEventListener("keydown", function (e) {
                // console.log(`${comp.key}`);
                let e1 = new CustomEvent("formio-key", {
                    bubbles: true,
                    detail: {
                        e: e,
                        key: comp.key,
                        comp: comp,
                        formInstance: formInstance,
                    },
                });
                elem.dispatchEvent(e1);
            });
        }

        onUnmounted(function () {
            console.log(`[Form.onUnmounted]`);
            // Should we have a callback to call for saving current screen state?
            // Should we remove keyEvent listeners?
            if (formInstance) {
                formInstance.destroy(true);
            }
        });
        // expose to template
        return {};
    },
});
</script>

<template>
    <div ref="formio"></div>
</template>
