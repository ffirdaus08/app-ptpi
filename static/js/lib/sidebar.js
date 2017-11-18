/**
 * Created by hiwijaya on 2/16/2017.
 */

'use strict';

// #sidebar
var sidebar = document.getElementById("sidebar");

function openNav() {
    if (screen.width > 480) {
        sidebar.style.width = "350px";
    }
    else {
        sidebar.style.width = "300px";
    }
}

function closeNav() {
    if (screen.width < 900) {
        sidebar.style.width = "0px";
    }
}

// media query change
function WidthChange(mq) {
    if (mq.matches) {
        // bigger
        sidebar.style.width = "350px";
    }
    else {
        // smaller
        sidebar.style.width = "0px";
    }
}

// media query event handler
if (matchMedia) {
    var mq = window.matchMedia("(min-width: 900px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
}
// media query event handler
if (matchMedia) {
    var mq = window.matchMedia("(min-width: 480px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
}
