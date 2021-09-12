"use strict";
import { toRaw } from "vue";
export function vue3DeepAssign(target, source) {
    if (source === undefined) return undefined;
    // If the source isn't an Object or Array, throw an error.
    if (
        !(source instanceof Object) ||
        source instanceof Date ||
        source instanceof String
    ) {
        console.log(
            `[reactDeepAssign] source is instanceof '${typeof source}'`
        );
        throw "[vue3DeepAssign] Only Objects or Arrays are supported.";
    }
    for (let prop in source) {
        // Make sure the property isn't on the protoype
        if (
            source instanceof Object &&
            !(source instanceof Array) &&
            !source.hasOwnProperty(prop)
        )
            continue;
        if (
            source[prop] instanceof Object &&
            !(source[prop] instanceof Date) &&
            !(source[prop] instanceof String)
        ) {
            if (target[prop] === undefined) {
                target[prop] = {};
            }
            target[prop] = reactDeepAssign(target[prop], source[prop]);
        } else {
            target[prop] = toRaw(source[prop]);
        }
    }
    return target;
}

export function vue3Clear(x) {
    for (let prop in x) {
        x[prop] = undefined;
    }
}

export function vue3DeepClone(target, source) {
    if (source === undefined) {
        return vue3Clear(target);
    }
    // If the source isn't an Object or Array, throw an error.
    if (
        !(source instanceof Object) ||
        source instanceof Date ||
        source instanceof String
    ) {
        throw "[vue3DeepClone] instanceof '${typeof source}': Only Objects or Arrays are supported.";
    }
    for (let prop in target) {
        if (source[prop] === undefined) {
            target[prop] = undefined;
        }
    }
    for (let xprop in source) {
        let prop = toRaw(xprop);
        // Make sure the property isn't on the protoype
        if (
            source instanceof Object &&
            !(source instanceof Array) &&
            !source.hasOwnProperty(prop)
        )
            continue;
        if (
            source[prop] instanceof Object &&
            !(source[prop] instanceof Date) &&
            !(source[prop] instanceof String)
        ) {
            if (target[prop] === undefined) {
                target[prop] = {};
            }
            target[prop] = vue3DeepClone(target[prop], source[prop]);
        } else {
            // cf. https://stackoverflow.com/questions/27509/detecting-an-undefined-object-property
            // and https://stackoverflow.com/questions/46850145/return-undefined-from-existing-property-in-javascript-model
            // Typically an unutialized class member...
            if (source[prop] === undefined) {
                // Commented this warning as it occurs often with formio submissions
                // console.warn(
                //     `[vue3DeepClone] source[${prop}] = undefined (type:'${typeof source[
                //         prop
                //     ]}') !!! skipping`
                // );
                continue;
            }
            target[prop] = source[prop];
        }
    }
    return target;
}
