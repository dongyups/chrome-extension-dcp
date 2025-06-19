let icon = null;
let selectedText = "";
let isDragging = false;

document.addEventListener("mousedown", () => {
  isDragging = false;
});

document.addEventListener("mousemove", () => {
  isDragging = true;
});

document.addEventListener("mouseup", (event) => {
  if (!isDragging) return;

  const selected = window.getSelection().toString().trim();

  if (selected.length > 1) {
    selectedText = selected;
    removeExistingUI();

    icon = document.createElement("img");
    icon.src = chrome.runtime.getURL("images/icon_32.png");
    icon.className = "text-select-icon";
    icon.style.position = "absolute";
    icon.style.left = `${event.pageX + 10}px`;
    icon.style.top = `${event.pageY + 10}px`;
    icon.style.width = "32px";
    icon.style.height = "32px";
    icon.style.zIndex = 10000;

    icon.addEventListener("click", () => {
      chrome.storage.local.set({ selectedText }); // 저장
      showTextPopup(event.pageX + 10, event.pageY + 50);
      removeIconOnly();
    });

    document.body.appendChild(icon);
  } else {
    // 선택된 텍스트가 없으면 초기화
    clearSelectionData();
    removeExistingUI();
  }
});

document.addEventListener("mousedown", (event) => {
  if (
    event.target.closest(".text-output-box") ||
    (icon && event.target === icon)
  ) return;

  clearSelectionData(); // 외부 클릭 시 선택 내용 초기화
  removeExistingUI();
});

function showTextPopup(x, y) {
  const box = document.createElement("div");
  box.className = "text-output-box";
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;
  box.innerText = `Original: ${selectedText}\nTranslate: ${selectedText} :D`;
  document.body.appendChild(box);
}

function removeExistingUI() {
  if (icon) icon.remove();
  icon = null;
  document.querySelectorAll(".text-output-box").forEach(el => el.remove());
}

function removeIconOnly() {
  if (icon) icon.remove();
  icon = null;
}

function clearSelectionData() {
  selectedText = "";
  chrome.storage.local.remove("selectedText");
}
