"use strict";

(() => {
  const screenshots = [
    ["prifddinas-gameplay.webp", "Prifddinas", "A bright view of the city's central chamber.", "world"],
    ["harmony-gameplay.webp", "Harmony Home", "Your island base, with the Slayer tracker and Area Loot visible.", "world"],
    ["vorago-gameplay.webp", "The Borehole", "Approaching Vorago's cavern.", "boss"],
    ["araxxor-gameplay.webp", "Araxxor", "A view from the encounter.", "boss"],
    ["rots-gameplay.webp", "Rise of the Six", "The brothers' arena in AetherRS3.", "boss"],
    ["companion-tree.webp", "Companion Foundation", "Choose a pet and inspect a talent's effect.", "interface"],
    ["companion-mastery.webp", "Companion Mastery", "Advanced nodes in the Companion skill tree.", "interface"],
    ["area-loot.webp", "Area Loot", "The Nearby grid, stack counts, filters and Block List.", "interface"],
    ["slayer-tracker.webp", "Slayer tracker", "A movable task panel with travel to the current assignment.", "interface"],
    ["mode-selection.webp", "Choose your adventure", "The difficulty and account-type selection interface.", "interface"],
    ["gnome-glider.webp", "Gnome glider map", "Native glider destinations shown in game.", "interface"],
    ["garden-gameplay.webp", "Garden paths", "A quiet corner of the world.", "world"],
    ["workshop-gameplay.webp", "The workshop", "A warm skilling space with furnaces and benches.", "world"],
    ["level-up-gameplay.webp", "A level earned", "A genuine in-game level-up moment.", "world"],
    ["skilling-gameplay.webp", "Training at Harmony", "Skilling alongside other characters by the island shore.", "world"]
  ];
  const grid = document.querySelector("#archive-gallery");
  const modal = document.querySelector("#gallery-lightbox");
  const image = document.querySelector("#lightbox-image");
  const title = document.querySelector("#lightbox-title");
  const caption = document.querySelector("#lightbox-caption");
  let shown = screenshots;
  let current = 0;
  let opener;

  function display(index) {
    current = (index + shown.length) % shown.length;
    const [file, name, description] = shown[current];
    image.src = "assets/" + file;
    image.alt = name + ". " + description;
    title.textContent = name;
    caption.textContent = `${description} · ${current + 1} of ${shown.length}`;
  }

  function render(filter) {
    shown = filter === "all" ? screenshots : screenshots.filter(item => item[3] === filter);
    grid.replaceChildren(...shown.map(([file, name, description], index) => {
      const button = document.createElement("button");
      button.className = "archive-photo";
      button.type = "button";
      const thumbnail = document.createElement("img");
      thumbnail.src = "assets/" + file;
      thumbnail.alt = "";
      thumbnail.loading = "lazy";
      const heading = document.createElement("strong");
      heading.textContent = name;
      const detail = document.createElement("small");
      detail.textContent = description;
      button.append(thumbnail, heading, detail);
      button.addEventListener("click", () => { opener = button; display(index); modal.showModal(); });
      return button;
    }));
  }

  for (const control of document.querySelectorAll("[data-gallery-filter]")) {
    control.addEventListener("click", () => {
      for (const option of document.querySelectorAll("[data-gallery-filter]")) option.setAttribute("aria-pressed", String(option === control));
      render(control.dataset.galleryFilter);
    });
  }
  document.querySelector("[data-gallery-close]").addEventListener("click", () => modal.close());
  document.querySelector("[data-gallery-prev]").addEventListener("click", () => display(current - 1));
  document.querySelector("[data-gallery-next]").addEventListener("click", () => display(current + 1));
  modal.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      display(current + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
  modal.addEventListener("close", () => opener?.focus());
  render("all");
})();
