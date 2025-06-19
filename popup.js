document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("selectedText", (data) => {
    const text = data.selectedText && data.selectedText.trim();
    const defaultText = "None Selected";
    
    document.getElementById("original").textContent = text || defaultText;
    document.getElementById("translate").textContent = (text || defaultText) + " :D";
  });
});
