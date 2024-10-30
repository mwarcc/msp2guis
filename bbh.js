const scriptUrl = "https://cdn.jsdelivr.net/gh/mwarcc/msp2guis/star.js";

fetch(scriptUrl)
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
    return response.text();
  })
  .then(scriptContent => {
    const script = document.createElement("script");
    script.textContent = scriptContent;
    document.head.appendChild(script);
  })
  .catch(error => console.error("Error loading script:", error));
