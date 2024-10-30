const scriptUrl = "https://cdn.jsdelivr.net/gh/mwarcc/msp2guis/star.js";

const script = document.createElement("script");
script.src = scriptUrl;
script.onload = () => console.log("Script loaded and executed successfully.");
script.onerror = () => console.error("Failed to load the script.");
document.head.appendChild(script);
