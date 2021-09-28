"use strict";

let app;

// cf. https://stackoverflow.com/questions/22707475/how-to-make-a-promise-from-settimeout
function later(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

let defaultStyles; // Used by below function

// cf https://stackoverflow.com/questions/22907735/get-the-computed-style-and-omit-defaults
// There is more than 350 properties in the computed style...
function getStylesWithoutDefaults(element) {
    if (!defaultStyles) {
        // create an empty dummy object to compare with
        let dummy = document.createElement("element-" + new Date().getTime());
        app.parentElement.appendChild(dummy);

        // get computed styles for both elements
        let d = window.getComputedStyle(dummy, null);
        // Create an handy nice object
        defaultStyles = {};
        for (let i = d.length; i--; ) {
            defaultStyles[d[i]] = d.getPropertyValue(d[i]);
        }
        // Those styles must exist, as they are used after...
        [
            "display",
            "z-index",
            "top",
            "left",
            "width",
            "height",
            "margin-top",
            "margin-left",
            "opacity",
            "float",
        ].forEach((p) => (defaultStyles[p] = ""));
        dummy.remove(); // clear dom
    }
    let elementStyles = window.getComputedStyle(element, null);
    // calculate the difference
    let diff = {};
    for (var i = elementStyles.length; i--; ) {
        let key = elementStyles[i];
        let val = elementStyles.getPropertyValue(key);
        if (!defaultStyles[key] || val !== defaultStyles[key]) {
            diff[key] = val;
        }
    }
    // console.log(`[getStylesWithoutDefaults] res='${JSON.stringify(diff)}'`);
    return diff;
}

let pseudoId = 0; // Counter for pseudo-styles

export function ilinkCopy(src, dest) {
    let styleSheet = "";
    doIt(src, dest);
    function doIt(el, father) {
        if (!el) return;
        if (el == dest) return;
        switch (el.nodeType) {
            case 1: // element
                let cs = getStylesWithoutDefaults(el);
                if (cs["display"] === "none") return;
                if (cs["display"] == "inline" || cs["float"] != "none") {
                    // console.log(
                    //     `[ilinkCopy] el=${el} nodeName=${el.nodeName} val:'${el.nodeValue} INLINE`
                    // );
                    let elx = el.cloneNode(false);
                    elx.id = `clone-${el.id}`;
                    father.appendChild(elx.cloneNode(false));

                    el.childNodes.forEach((e) => {
                        // console.log(`[ilinkCopy] INLINE'${el.nodeValue}' calling child`);
                        doIt(e, father);
                    });
                    return;
                }
                let copy = document.createElement(el.nodeName);
                // console.log(`[ilinkCopy] el=${el} nodeName=${el.nodeName} val:'${el.nodeValue}'`);

                for (let k of Object.keys(cs)) copy.style[k] = cs[k];
                copy.id = `Clone-${el.id}`;

                // For now, only those 2 ones are managed; uncomment if
                // Other ones exist in the old display.
                let pseudos = [
                    "::before",
                    "::after",
                    // "::first-line",
                    // "::first-letter",
                    // "::selection",
                    // "::target-text",
                    // "::spelling-error",
                    // "::grammar-error",
                    // "::marker",
                    // "::placeholder",
                    // "::file-selector-button",
                ];
                pseudos.forEach((p) => {
                    let cs2 = window.getComputedStyle(el, p);
                    // For now, check only for "content". If there are other
                    // pseudo-styles in the old display, add them there
                    let pClasses = ["content"];
                    pClasses.forEach((pClass) => {
                        let val = cs2.getPropertyValue(pClass);
                        if (val != "none") {
                            // console.log(`[ilinkCopy] cs2[${pClass}]='${cs2[pClass]}'`);
                            // Add a specific class to elem
                            let cssId = `ilink-pseudo-${pseudoId}-${pClass}`;
                            copy.classList.add(cssId);
                            // And create corresponding CSS rule
                            let rule = `.${cssId}${p}{${pClass}:${val}}\n`;
                            styleSheet += rule;
                            pseudoId++;
                        }
                    });
                });

                copy.style.zIndex = cs["z-index"];
                if (el.style.display != "none") copy.style.display = "block";
                else copy.style.display = "none";

                let bounding = el.getBoundingClientRect();

                copy.style.top = parseFloat(bounding.top) - parseFloat(cs["margin-top"]) + "px";
                copy.style.left = parseFloat(bounding.left) - parseFloat(cs["margin-left"]) + "px";
                copy.style.width = cs["width"];
                copy.style.height = cs["height"];
                copy.style.position = "absolute";
                // Insert and recurse
                dest.appendChild(copy);
                el.childNodes.forEach((e) => doIt(e, copy));
                break;
            case 3: // Text
                // console.log(`[ilinkCopy] managing TEXT nodeValue=${el.nodeValue}`);
                father.appendChild(el.cloneNode(false));
                el.childNodes.forEach((e) => {
                    console.log(`[ilinkCopy] #TEXT='${el.nodeValue}' calling child`);
                    doIt(e, father);
                });
                break;
        }
    }
    return styleSheet;
}

export async function doIlink(action, transition = "none", durationMs = 1000) {
    let shadow;
    let oldAppStyles = {};
    let widthPixel = 0;
    let heightPixel = 0;
    let styleSrc = "";
    if (!app) app = document.getElementById("app");
    const styleNames = [
        "position",
        "top",
        "left",
        "width",
        "height",
        "overflowX",
        "overflowY",
        "transition",
    ];

    if (transition != "none") {
        // Backup existing app styles
        let oldAppStyles = getStylesWithoutDefaults(app);
        document.body.style.overflow = "hidden";

        // copy actual app to shadow
        shadow = document.createElement("div");
        app.parentElement.appendChild(shadow);
        shadow.style.zIndex = 100000; // put shadow above everything
        shadow.scrollTop = app.scrollTop;
        shadow.style.position = "fixed";
        shadow.style.top = "0px";
        shadow.style.left = "0px";
        shadow.style.width = "100vw";
        shadow.style.height = "100vh";
        shadow.style.margin = "0px";
        shadow.style.overflow = "clip";
        shadow.backgroundColor = "hsla(0,0%,0%,0)";
        shadow.style.opacity = 1;
        shadow.id = "shadowIlink"; // for debug
        let cs = getStylesWithoutDefaults(shadow);
        widthPixel = parseFloat(cs.width);
        heightPixel = parseFloat(cs.height);
        let styleContent = ilinkCopy(app, shadow);
        // Create extra styleSheet needed for pseudo-elements
        // cf. https://stackoverflow.com/questions/15505225/inject-css-stylesheet-as-string-using-javascript
        styleSrc = document.createElement("style");
        styleSrc.type = "text/css"; // W3C says it's ok...
        styleSrc.textContent = styleContent;
        document.head.appendChild(styleSrc);

        // setup start state
        // WARNING app.style["xxx"] does NOT work!
        app.style.position = "fixed";
        app.style.top = "0px";
        app.style.left = "0px";
        app.style.width = "100vw";
        app.style.height = "100vh";
        app.style.overflow = "hidden";
        app.style.transition = "";
        // Move out instantely actual app to the correct margin
        switch (transition) {
            case "down":
                app.style.top = "100vh";
                break;
            case "up":
                app.style.top = "-100vh";
                break;
            case "right":
                app.style.left = "100vw";
                break;
            case "left":
            default:
                app.style.left = "-100vw";
                break;
        }
    }

    // if (transition == "none") action();
    if (1) {
        action(); // perform action
        if (transition != "none") {
            // Do transition
            // Wait for end of previous rendering
            // https://stackoverflow.com/questions/15875128/is-there-element-rendered-event
            await later(0);
            // Prepare transition
            let transStyle = `left ${durationMs}ms, top ${durationMs}ms, ease ease-in-out`;
            shadow.style.transition = transStyle;
            app.style.transition = transStyle;
            await later(0);

            app.style.left = "0vw";
            app.style.top = "0vh";
            app.style.overflow = "scroll";
            // And do it!
            console.log(`doing trans`);
            switch (transition) {
                case "down":
                    shadow.style.top = "-100vh";
                    break;
                case "up":
                    shadow.style.top = "100vh";
                    break;
                case "right":
                    shadow.style.left = "-100vw";
                    break;
                case "left":
                default:
                    shadow.style.left = "100vw";
                    break;
            }
            // Cleanup and restore original stuff
            await later(durationMs);
            app.parentElement.removeChild(shadow);
            document.body.style.overflow = "scroll";
            // for (let key of oldAppStyles) app.style[key] = oldAppStyles[key];
        }
    }
}
