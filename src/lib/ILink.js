"use strict";

export default function doILink(action, transition = "none", durationMs = 300) {
    let shadow;
    let app = document.getElementById("app");
    let styles = [
        "position",
        "top",
        "left",
        "width",
        "height",
        "height",
        "overflowX",
        "transition",
    ];
    let oldAppStyles = {};

    if (transition != "none") {
        // Backup existing styles
        for (var key of styles) oldAppStyles[key] = app.style[key];

        // setup start state
        app.style.position = "fixed";
        app.style.top = "0vh";
        app.style.left = "0vw";
        app.style.width = "100vw";
        app.style.height = "100vh";
        app.style.overflowX = "hidden";
        app.style.transition = undefined;

        // Replace actual app by an identical shadow copy
        shadow = document.createElement("div");
        shadow = app.parentElement.appendChild(shadow);
        shadow.style.zindex = -100000; // put shadow behind everything
        for (var key of styles) shadow.style[key] = app.style[key];
        shadow.innerHTML = app.innerHTML; // Copy actual display
        shadow.scrollTop = app.scrollTop; // Only when scrolling is possible
        shadow.id = "shadowIlink";

        // Move out instantely actual app to the correct margin
        switch (transition) {
            case "down":
                app.style.left = "0vw";
                app.style.top = "100vh";
                break;
            case "up":
                app.style.left = "0vw";
                app.style.top = "-100vh";
                break;
            case "right":
                app.style.left = "100vw";
                app.style.top = "0vh";
                break;
            case "left":
            default:
                app.style.left = "-100vw";
                app.style.top = "0vh";
                break;
        }
    }
    action(); // perform action

    if (transition != "none") {
        // Do transition
        if (1) {
            // for tests
            setTimeout(() => {
                // Wait for end of previous rendering
                // https://stackoverflow.com/questions/15875128/is-there-element-rendered-event

                // Prepare transition
                shadow.style.transition = `left ${durationMs}ms, top ${durationMs}ms, ease ease-in-out`;
                app.style.transition = `left ${durationMs}ms, top ${durationMs}ms, ease ease-in-out`;
                // shadow.style.transitionDelay = "0.1s";
                // app.style.transitionDelay = "0.1s";
                // And do it!
                switch (transition) {
                    case "down":
                        shadow.style.left = "0vw";
                        shadow.style.top = "-100vh";
                        break;
                    case "up":
                        shadow.style.left = "0vw";
                        shadow.style.top = "100vh";
                        break;
                    case "right":
                        shadow.style.left = "-100vw";
                        shadow.style.top = "0vh";
                        break;
                    case "left":
                    default:
                        shadow.style.left = "100vw";
                        shadow.style.top = "0vh";
                        break;
                }
                app.style.top = "0vh";
                app.style.left = "0vw";
                setTimeout(() => {
                    shadow.remove(); // Cleanup
                }, durationMs);
            }, 0);
        }
    } else {
    }
}
