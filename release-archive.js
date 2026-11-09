"use strict";

(() => {
  const filters = document.querySelector(".release-filters");
  const search = filters.querySelector("input");
  const topic = filters.querySelector("select");
  const count = document.querySelector(".release-count");
  const cards = [...document.querySelectorAll(".release-card")].map(card => ({
    card,
    text: card.textContent.toLowerCase(),
    tags: [...card.querySelectorAll(".release-tags > span")].map(tag => tag.textContent),
    jump: document.querySelector(`.release-jumps a[href="#${card.id}"]`)
  }));

  function update() {
    const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const { card, text, tags, jump } of cards) {
      const matches = (!topic.value || tags.includes(topic.value)) && terms.every(term => text.includes(term));
      card.hidden = !matches;
      jump.hidden = !matches;
      if (matches) visible++;
    }
    count.textContent = visible ? `${visible} of ${cards.length} releases` : "No releases match your search.";
  }

  search.addEventListener("input", update);
  topic.addEventListener("change", update);
  window.addEventListener("hashchange", () => {
    const match = cards.find(({ card }) => location.hash === "#" + card.id);
    if (!match?.card.hidden) return;
    search.value = "";
    topic.value = "";
    update();
    match.card.scrollIntoView();
  });
  filters.hidden = false;
  update();
})();
