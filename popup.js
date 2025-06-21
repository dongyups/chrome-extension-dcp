document.addEventListener("DOMContentLoaded", () => {
  const serverInput = document.getElementById("Server");
  const saveButton = document.getElementById("URL");
  const display = document.getElementById("displayServer");

  if (!serverInput || !saveButton || !display) {
    console.error("Some elements (#Server, #URL, #displayServer) not found.");
    return;
  }

  // 기존 저장된 (마지막) 서버 주소 표시
  chrome.storage.local.get("serverAddress", (data) => {
    const saved = data.serverAddress || "None";
    serverInput.value = saved;
    display.textContent = saved;
  });

  // 버튼 클릭 시 저장하고 UI에 반영
  saveButton.addEventListener("click", () => {
    const value = serverInput.value.trim() || "None";
    chrome.storage.local.set({ serverAddress: value }, () => {
      display.textContent = value;
      // console.log("Server address saved:", value);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("selectedText", (data) => {
    const text = data.selectedText && data.selectedText.trim();
    const defaultText = "None Selected";
    
    document.getElementById("original").textContent = text || defaultText;
    document.getElementById("translate").textContent = (text || defaultText) + " :D";
  });
});
