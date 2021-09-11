"use strict";

export function reactDeepAssign(target, source) {
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
        throw "[reactDeepAssign] Only Objects or Arrays are supported.";
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
            target[prop] = reactDeepAssign(target, source[prop]);
        } else {
            target[prop] = source[prop];
        }
    }
    return target;
}

export function reactClear(x) {
    for (let prop in x) {
        x[prop] = undefined;
    }
}

export function reactDeepUpdate(target, source) {
    if (source === undefined) {
        return reactClear(target);
    }
    // If the source isn't an Object or Array, throw an error.
    if (
        !(source instanceof Object) ||
        source instanceof Date ||
        source instanceof String
    ) {
        console.log(
            `[reactDeepAssign] source is instanceof '${typeof source}'`
        );
        throw "[reactDeepAssign] Only Objects or Arrays are supported.";
    }
    for (let prop in target) {
        if (source[prop === undefined]) target[prop] = undefined;
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
            target[prop] = reactDeepUpdate(target, source[prop]);
        } else {
            if (source[prop] === undefined) {
                console.warn(
                    `[reactDeepUpdate] source[${prop}]= undefined !!! skipping`
                );
                continue;
            }
            target[prop] = source[prop];
        }
    }
    return target;
}

export function reactDeepClone(target, source) {
    reactClear(target);
    reactDeepAssign(target, source);
    return target;
}
