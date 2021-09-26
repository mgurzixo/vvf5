"use strict";

let app;

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

// Returns all the descendents of el having CSS position="fixed"
function areFixed(el) {
    let res = [];
    function doIt(el) {
        if (!el) return;
        let children = el.children;
        if (!children.length) return;
        for (let e of children) {
            let style = getComputedStyle(e);
            if (style.position && style.position == "fixed") {
                res.push(e);
            }
            doIt(e);
        }
    }
    doIt(el);
    return res;
}

function createShadowFrame() {
    let shadowFrame = document.createElement("div");
    shadowFrame.style.position = "fixed";
    shadowFrame.style.top = "0vh";
    shadowFrame.style.left = "0vw";
    shadowFrame.style.width = "100vw";
    shadowFrame.style.height = "100vh";
    shadowFrame.style.overflowX = "hidden";
    shadowFrame.style.overflowY = "hidden";
    shadowFrame.style.transition = undefined;
    shadowFrame.style.backgroundColor = "hsla(0,0%,0%,0)";
    shadowFrame.id = "shadowFrame"; // For debug

    let firstChild = app.parentElement.firstChild;
    app.parentElement.insertBefore(shadowFrame, firstChild);
    return shadowFrame;
}

function toshadowFrame(div, shadowFrame) {
    console.log(`[toshadowFrame] Entering`);
    let fixed = areFixed(div);
    console.log(`[toshadowFrame] got ${fixed.length} fixed elems`);
    for (let e of fixed) {
        // Transform a fixed element from div to a relative element in shadowframe
        // if (e === div) continue;
        let copy = document.createElement("div");
        shadowFrame.appendChild(copy);
        // copy.outerHTML = e.outerHTML;
        copy.innerHTML = e.outerHTML;
        let styles = window.getComputedStyle(e);
        copy.style.top = styles.top;
        copy.style.left = styles.left;
        copy.style.width = styles.width;
        copy.style.height = styles.height;
        copy.style.zIndex = styles.zIndex;
        copy.className = e.className;
        copy.classList.add(`id-${e.id}`);
        copy.style.position = "absolute";
        copy.firstChild.style.position = "absolute";
        // console.log(`[toshadowFrame] e: id=${e.id ? e.id : "!NONE!"} V='${e.outerHTML}'`);
        console.log(
            `[toshadowFrame] copy: id=${copy.id ? copy.id : "!NONE!"} V='${copy.outerHTML}'`
        );
        // Remove element from div
        e.classList.add(`toshadowFrame`);
        e.style.display = "none";
        // div.removeChild(e);
    }
}

export function doIlink(action, transition = "none", durationMs = 3000) {
    let shadow;
    let oldAppStyles = {};
    if (!app) app = document.getElementById("app");

    if (transition != "none") {
        // Backup existing app styles
        for (var key of styleNames) oldAppStyles[key] = app.style[key];

        // setup start state
        // WARNING app.style["xxx"] does NOT work!
        app.style.position = "fixed";
        app.style.top = "0px";
        app.style.left = "0px";
        app.style.width = "100vw";
        app.style.height = "100vh";
        app.style.overflowX = "hidden";
        app.style.overflowY = "hidden";
        app.style.transition = undefined;
        if (1) {
            // Replace actual app by an identical shadow copy
            shadow = document.createElement("div");
            shadow = app.parentElement.appendChild(shadow);
            shadow.style.zIndex = -100000; // put shadow behind everything
            // shadow.innerHTML = app.innerHTML; // Copy actual display
            shadow.innerHTML = app.outerHTML; // Copy actual display
            shadow.scrollTop = app.scrollTop; // Done only when scrolling becomes possible
            shadow.style.position = "fixed";
            shadow.style.top = "0px";
            shadow.style.left = "0px";
            shadow.style.width = "100vw";
            shadow.style.height = "100vh";
            shadow.id = "shadowIlink"; // for debug
            // shadow.style.display = "fixed";
            let shadowFrame = createShadowFrame();

            // Transform fixed elems of shadow to elems relative of shadow
            toshadowFrame(shadow, shadowFrame);

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
    }

    if (transition == "none") action();
    if (0) {
        if (1) action(); // perform action

        if (transition != "none") {
            // Do transition
            if (1) {
                setTimeout(() => {
                    // Wait for end of previous rendering
                    // https://stackoverflow.com/questions/15875128/is-there-element-rendered-event

                    let newFixed = areFixed(app);
                    let newDisplay = [];
                    for (let e of newFixed) {
                        newDisplay.push(e.style.display);
                        e.style.display = "none";
                    }
                    if (1) {
                        // Prepare transition
                        shadow.style.transition = `left ${durationMs}ms, top ${durationMs}ms, ease ease-in-out`;
                        shadowFrame.style.transition = `left ${durationMs}ms, top ${durationMs}ms, ease ease-in-out`;
                        app.style.transition = `left ${durationMs}ms, top ${durationMs}ms, ease ease-in-out`;
                        // shadow.style.transitionDelay = "0.1s";
                        // app.style.transitionDelay = "0.1s";

                        // And do it!
                        console.log(`doing trans`);
                        switch (transition) {
                            case "down":
                                shadow.style.top = "-100vh";
                                shadowFrame.style.top = "-100vh";
                                break;
                            case "up":
                                shadow.style.top = "100vh";
                                shadowFrame.style.top = "100vh";
                                break;
                            case "right":
                                shadow.style.left = "-100vw";
                                shadowFrame.style.left = "-100vw";
                                break;
                            case "left":
                            default:
                                shadow.style.left = "100vw";
                                shadowFrame.style.left = "100vw";
                                break;
                        }
                        app.style.top = "0vh";
                        app.style.left = "0vw";

                        // Cleanup and restore original stuff
                        setTimeout(() => {
                            app.parentElement.removeChild(shadow);
                            app.parentElement.removeChild(shadowFrame);
                            for (let key of styleNames) app.style[key] = oldAppStyles[key];
                            for (let i in newFixed) {
                                newFixed[i].style.display = newDisplay[i];
                            }
                        }, durationMs);
                    }
                }, 0);
            }
        }
    }
}
