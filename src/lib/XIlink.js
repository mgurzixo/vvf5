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

// let styles = window.getComputedStyle(el);
// let bounding = el.getBoundingClientRect();

function toCopy(src, dest) {
    let first = true;
    doIt(src);
    function doIt(el) {
        if (!el) return;
        if (el == dest) return;
        let copy = document.createElement("div");
        // dest.appendChild(copy);
        copy.style.position = "absolute";
        copy.innerHTML = el.outerHTML;
        let cs = window.getComputedStyle(el);
        console.log(`[toCopy] el=${copy} cs=${cs}`);
        if (first) {
            for (let k of cs) {
                console.log(`   cs[${k}]:'${cs[k]}'`);
            }
        }
        first = false;

        for (let ex of copy.children) {
            // console.log(`[toCopy] child=${ex} ${ex.children.length} sons`);
            for (let ey of ex.children) {
                // console.log(`[toCopy] grandChild=${ex} ${ex.children.length} sons`);
                ey.remove();
            }
            ex.style = cs;
            let bounding = el.getBoundingClientRect();
            ex.style.top = bounding.top;
            ex.style.left = bounding.left;
            ex.style.width = bounding.width;
            ex.style.height = bounding.height;
            ex.style.position = "absolute";
        }
        dest.appendChild(copy);

        for (let e of el.children) doIt(e);
    }
    return dest;
}

export function doIlink(action, transition = "none", durationMs = 3000) {
    let shadow;
    let oldAppStyles = {};
    if (!app) app = document.getElementById("app");

    if (transition != "none") {
        // Backup existing app styles
        for (var key of styleNames) oldAppStyles[key] = app.style[key];

        // copy actual app to shadow
        shadow = document.createElement("div");
        shadow = app.parentElement.appendChild(shadow);
        shadow.style.zIndex = -100000; // put shadow behind everything
        // shadow.innerHTML = app.innerHTML; // Copy actual display
        shadow.scrollTop = app.scrollTop; // Done only when scrolling becomes possible
        shadow.style.position = "fixed";
        shadow.style.top = "0px";
        shadow.style.left = "0px";
        shadow.style.width = "100vw";
        shadow.style.height = "100vh";
        shadow.id = "shadowIlink"; // for debug
        toCopy(app, shadow);

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
}
