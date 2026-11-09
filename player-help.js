"use strict";

(() => {
  const filters = document.querySelector(".help-filters");
  const search = filters.querySelector("input");
  const topic = filters.querySelector("select");
  const count = document.querySelector(".command-count");
  const cards = [...document.querySelectorAll(".command-card")].map(card => ({
    card,
    text: card.textContent.toLowerCase()
  }));
  const status = document.querySelector(".help-copy-status");
  const template = document.querySelector("#report-template");

  function update() {
    const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const { card, text } of cards) {
      const match = (!topic.value || card.dataset.topic === topic.value) && terms.every(term => text.includes(term));
      card.hidden = !match;
      if (match) visible++;
    }
    count.textContent = visible ? `${visible} of ${cards.length} commands` : "No commands match your search.";
  }

  for (const button of document.querySelectorAll("[data-copy-command], [data-copy-template]")) {
    const source = button.hasAttribute("data-copy-template") ? template : button.closest(".command-card").querySelector("code");
    const original = button.textContent;
    button.addEventListener("click", async () => {
      const text = source === template ? template.value : source.textContent;
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied";
        status.textContent = source === template ? "Bug report template copied." : `${text} copied.`;
      } catch {
        if (source === template) {
          template.focus();
          template.select();
        } else {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(source);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        button.textContent = "Selected · Ctrl+C";
        status.textContent = "Text selected. Press Ctrl+C to copy.";
      }
      window.setTimeout(() => { button.textContent = original; }, 2000);
    });
    button.hidden = false;
  }
  search.addEventListener("input", update);
  topic.addEventListener("change", update);
  filters.hidden = false;
  update();
})();
