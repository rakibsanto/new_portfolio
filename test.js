const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const scriptJS = fs.readFileSync('script.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
dom.window.onerror = function(msg) {
    console.error("DOM Error:", msg);
};
setTimeout(() => {
    console.log("Active swiper slides:", dom.window.document.querySelectorAll('.swiper-slide-active').length);
    console.log("All slides:", dom.window.document.querySelectorAll('.swiper-slide').length);
    
    // Check if Swiper exists
    console.log("Swiper loaded?", typeof dom.window.Swiper !== 'undefined');
    process.exit(0);
}, 5000);
