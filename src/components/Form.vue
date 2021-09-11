<script>
import {
    onMounted,
    onUnmounted,
    watch,
    watchEffect,
    getCurrentInstance,
    computed,
    toRaw,
    isReactive,
} from "vue";

export default {
    props: {
        src: {
            type: Object,
            default: { components: [] },
        },
        default: {
            type: Object,
            default: {},
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
    emits: ["update:submission", "formio-event"],

    setup(props) {
        let instance;
        let fastCloneDeep = Formio.Utils.fastCloneDeep;
        let vm = getCurrentInstance();

        onMounted(function () {
            initializeForm()
                .then(() => {
                    setupForm();
                })
                .catch((err) => {
                    console.warn(`[Form] ${err}`);
                });
        });

        function initializeForm() {
            return new Formio.createForm(
                vm.refs.formio,
                props.src,
                props.options
            )
                .then((myInstance) => {
                    instance = myInstance;
                    return instance;
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        function setFormSubmission() {
            console.log(
                `[Form.setFormSubmission]1 default=${JSON.stringify(
                    props.default
                )}`
            );
            if (instance) {
                let sub1 = fastCloneDeep(toRaw(props.default));
                instance.setSubmission(sub1).then(() => {
                    console.log(
                        `[Form.setFormSubmission]2 instance.submission:${JSON.stringify(
                            instance.submission
                        )}`
                    );
                });
            }
        }

        function setupForm() {
            if (!instance) {
                return;
            }
            for (let comp of instance.components) addKeyEvent(comp);
            instance.language = props.language;
            instance.nosubmit = true;
            setFormSubmission();
            instance.events.onAny((...args) => {
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
                    vm.emit("update:submission", args[1]);
                }
                // Emit custom events under their own name as well.
                if (eventParts[1] === "customEvent") {
                    args[0] = args[1].type;
                }
                // Create the formio-event event so that vue can listen
                // to all formio events easily
                args.push({
                    eventName: args[0],
                    formInstance: instance,
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
                        instance: instance,
                    },
                });
                elem.dispatchEvent(e1);
            });
        }

        watchEffect(props.default, (newSub, oldSub) => {
            console.log(`[Form.watch.default]`);
            setFormSubmission();
        });

        onUnmounted(function () {
            console.log(`[Form.onUnmounted]`);
            // Should we remove keyEvent listeners?
            if (instance) {
                instance.destroy(true);
            }
        });
        // expose to template
        return {};
    },
};
</script>

<template>
    <div ref="formio"></div>
</template>
