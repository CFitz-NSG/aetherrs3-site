"use strict";

(() => {
  const data = window.aetherWikiData;
  const art = window.aetherWikiArt || {};
  const articles = window.aetherWikiArticles;
  const catalogue = window.aetherWikiRoutes;
  const atlasRouteArt = window.aetherAtlasRouteArt;
  const trainingActions = window.aetherTrainingActions;
  const main = document.querySelector("#wiki-main");
  const sidebar = document.querySelector("#wiki-sidebar");
  const menu = document.querySelector("#wiki-menu-toggle");
  const menuCurrent = document.querySelector("#wiki-menu-current");
  const search = document.querySelector("#archive-search");
  const searchRegion = search.closest(".archive-search");
  const results = document.querySelector("#archive-results");
  const searchStatus = document.querySelector("#archive-search-status");
  let renderedSearch;
  const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 3 });
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const normalize = value => String(value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const path = query => "wiki.html" + (query ? "?" + new URLSearchParams(query) : "");
  const guide = id => path({ guide: id });
  const byId = new Map(articles.map(article => [article.id, article]));
  const talentById = new Map(data.talents.map(talent => [talent.id, talent]));
  // These model IDs are assigned to the custom encounter by World and CustomBossDrops.
  const oracleModels = new Set([15184, 15185, 15186]);
  const maxModels = new Set([15976, 15977, 15978]);
  const branches = [...new Set(data.talents.filter(row => row.branchIndex >= 0).map(row => row.branch))];
  const monsters = data.monsters.map(monster => oracleModels.has(monster.id)
    ? { ...monster, name: "Oracle of Darkness", modelName: monster.name }
    : maxModels.has(monster.id)
      ? { ...monster, name: "Max the Maxed", modelName: monster.name, encounterHp: 20000 }
      : monster.id === 30045 ? { ...monster, encounterHp: 60000 } : monster)
    .sort((a, b) => a.name.localeCompare(b.name) || a.level - b.level || a.id - b.id);
  const monsterById = new Map(monsters.map(monster => [monster.id, monster]));
  const sourcesByTable = data.dropTables.map(() => []);
  for (const monster of monsters) sourcesByTable[monster.table].push(monster);
  const itemById = new Map();
  const tableTerms = data.dropTables.map((table, tableId) => {
    const entriesByItem = new Map();
    for (const row of table) {
      if (!entriesByItem.has(row[0])) entriesByItem.set(row[0], []);
      entriesByItem.get(row[0]).push(row);
    }
    const terms = [];
    for (const [id, entries] of entriesByItem) {
      if (!itemById.has(id)) {
        const name = data.items[id] && data.items[id] !== "null" ? data.items[id] : "Item " + id;
        itemById.set(id, { id, name, terms: normalize(name + " " + id), sourceCount: 0, sources: [] });
      }
      const item = itemById.get(id);
      const npcs = sourcesByTable[tableId];
      item.sources.push({ npcs, entries });
      item.sourceCount += npcs.length;
      terms.push(item.terms);
    }
    return terms;
  });
  const items = [...itemById.values()].sort((a, b) => a.name.localeCompare(b.name) || a.id - b.id);
  const searchable = [
    ...articles.map(article => ({ name: article.title, kind: article.category, href: guide(article.id), terms: normalize(article.title + " " + article.summary) })),
    ...catalogue.quests.filter(quest => !byId.has("quest-" + quest.id)).map(quest => ({
      name: quest.name, kind: "Restored quest", href: path({ view: "quests", q: quest.name }), terms: normalize(quest.name)
    })),
    ...data.pets.map(pet => ({ name: pet.name, kind: "Pet · " + pet.signature, href: path({ view: "pets", q: pet.name, pet: pet.key }), terms: normalize(pet.name + " " + pet.signature + " " + pet.effect) })),
    ...data.talents.filter(talent => talent.branchIndex >= 0).map(talent => ({ name: talent.name, kind: talent.branch + " talent", href: path({ view: "talents", branch: talent.branch, q: talent.name }), terms: normalize(talent.name + " " + talent.branch + " " + talent.effect) })),
    ...data.ascensions.map(ascension => ({ name: ascension.name, kind: "Ascension · " + ascension.branch, href: path({ view: "ascensions", q: ascension.name }), terms: normalize(ascension.name + " " + ascension.effect) })),
    ...monsters.map(monster => ({ name: monster.name, id: monster.id, kind: "Monster · #" + monster.id, href: path({ view: "monsters", npc: monster.id }), terms: normalize([monster.name, monster.modelName, monster.id].join(" ")) })),
    ...items.map(item => ({ name: item.name, id: item.id, kind: "Drop item · #" + item.id, href: path({ view: "items", item: item.id }), terms: item.terms }))
  ].map(row => ({ ...row, searchName: normalize(row.name) }));
  const directory = {
    pets: { title: "Pet signature directory", description: "Every supported pet family, its individual signature and the acquisition routes the game can verify.", eyebrow: "Companion collection", guide: "pet-signatures" },
    talents: { title: "Talent compendium", description: "Read the effects, point costs, level gates and prerequisites for every Foundation and Mastery talent.", eyebrow: "Companion skill trees", guide: "pet-talents" },
    ascensions: { title: "Ascension paths", description: "Compare all eighteen automatic ultimates. Each pet can train one path, up to ten ranks.", eyebrow: "Companion prestige", guide: "pet-ascension" },
    monsters: { title: "Monsters & drops", description: "Search a creature, NPC ID or item name. Open a configured table to see exact base entries and source artwork.", eyebrow: "Bestiary and drop index", guide: "monster-drops" },
    items: { title: "Item drop sources", description: "Find a drop by item name or ID, then see every configured NPC source and its separate base entries.", eyebrow: "Drop index", guide: "monster-drops" },
    levels: { title: "Pet XP and level table", description: "Cumulative pet XP thresholds and level-earned talent points, directly from the game rules.", eyebrow: "Companion progression", guide: "pet-training" },
    skills: { title: "Training guides", description: "Find a starting method, an upgrade path and the actual Atlas routes for every skill.", eyebrow: "Skill training" },
    quests: { title: "Restored quest catalogue", description: "Find starting locations, requirements and walkthroughs. Use the personal journal to keep track as you go.", eyebrow: "Quest restoration" }
  };
  const questByGuide = new Map(catalogue.quests.map(quest => ["quest-" + quest.id, quest]));
  const questStates = [["", "Not started"], ["started", "In progress"], ["complete", "Complete"]];
  const sessionQuestStates = new Map();
  const questStorageKey = id => "aether.quest-journal." + id;
  const questPrivacy = "Mark quests as you go. This browser saves your marks separately from your in-game progress.";
  const bossGuides = [
    { id: "solo-rots", name: "Rise of the Six", focus: "Positioning and a coordinated finish",
      entry: "Search Rise of the Six in the Atlas. Jump into the well and disrupt the portal. Entry uses no Barrows totem.",
      survival: "Lead each brother over his assigned shadow marker. Bring food you can use from your backpack while familiar transfers are restricted.",
      finish: "Bring all six brothers low together. Each disable heals survivors and refreshes the shared revival timer. All six must be down at once.",
      reward: "Claim the chest with room for the full reward, then follow the floor markers to the rope. The earned exit stabilizes your malevolent energy." },
    { id: "solo-vorago", name: "Vorago", focus: "Movement and phase objectives",
      entry: "Search Vorago public entrance in the Atlas. Enter the borehole, cross the lobby gaps and hear his full history before accepting the challenge. The solo challenge deals no entry damage.",
      survival: "Move at least two squares between phase-two bleed pulses, stop attacking during reflection, and shelter at the south-west waterfall in phase four.",
      finish: "Collect three weapon pieces across the phases. Combine them into the Maul of Omens, then complete two eight-step pushes and maul strikes.",
      reward: "Pick up the earned reward piles, then climb the western rope." },
    { id: "solo-araxxor", name: "Araxxor", focus: "Route choice and reactive defence",
      entry: "Search Araxxor in the Atlas. Enter the cave, cross the gap and use the webbed hive entrance. Inside, burn an open web to choose a route.",
      survival: "Stop attacking the reflective web, click to break a cocoon, and react to the spiders, acid or darkness on your chosen path.",
      finish: "Complete your path objective and fight through the phase-three healing. Defeat Araxxi and keep moving off the putrid core's marked squares.",
      reward: "Search Araxxi and choose Take or Bank. The cocooned corpse outside holds any unclaimed reward." }
  ];
  const navigation = [
    ["Explore", [["Archive home", path()], ["All guides", path({ category: "all" })], ["Getting started", path({ category: "Getting started" })]]],
    ["Combat & progression", [["Boss guides", path({ category: "Boss guides" })], ["Monsters & drops", path({ view: "monsters" })], ["Item drop sources", path({ view: "items" })], ["Companions", path({ category: "Companions" })], ["Pet signatures", path({ view: "pets" })], ["Talent compendium", path({ view: "talents" })], ["Ascension paths", path({ view: "ascensions" })], ["Pet XP levels", path({ view: "levels" })]]],
    ["Training & quests", [["Training guides", path({ view: "skills" })], ["Restored quests", path({ view: "quests" })]]],
    ["Around Aether", [["Minigame guides", path({ category: "Minigame guides" })], ["Quality of life", path({ category: "Quality of life" })], ["Event tracker", "events.html"], ["XP calculator", "training.html"], ["Help and commands", "help.html"], ["Music", "music.html"], ["Sources & credits", guide("about")]]]
  ];

  function closeSearch() {
    results.hidden = true;
    searchStatus.textContent = "";
  }

  function scrollToSection() {
    const target = document.getElementById(location.hash.slice(1));
    if (!target || !main.contains(target)) return null;
    target.scrollIntoView({ block: "start" });
    return target;
  }

  function route(query) {
    const url = typeof query === "string" ? query : path(query);
    if (new URL(url, location.href).href !== location.href) history.pushState(null, "", url);
    closeSearch();
    menu.setAttribute("aria-expanded", "false");
    search.value = "";
    render();
    const section = scrollToSection();
    if (!section) window.scrollTo(0, 0);
    (section?.hasAttribute("tabindex") ? section : main).focus({ preventScroll: true });
  }

  function renderSearch() {
    const term = normalize(search.value);
    if (term.length < 2) { closeSearch(); return; }
    const words = term.split(" ");
    const hits = searchable.filter(row => words.every(word => row.terms.includes(word)))
      .map(row => ({ ...row, score: String(row.id) === term ? -1 : row.searchName === term ? 0 : row.searchName.startsWith(term) ? 1 : row.searchName.includes(term) ? 2 : 3 }))
      .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name));
    const shown = hits.slice(0, 9);
    results.innerHTML = shown.length ? shown.map(row => `<a href="${esc(row.href)}">${esc(row.name)}<small>${esc(row.kind)}</small></a>`).join("")
      : `<p>No results matched. Try a shorter name or browse <a href="${path({ view: "items" })}">item drop sources</a>.</p>`;
    results.hidden = false;
    searchStatus.textContent = hits.length ? `Showing ${shown.length} of ${hits.length} search results.` : "No results found.";
  }

  search.addEventListener("input", renderSearch);
  search.addEventListener("focus", renderSearch);
  search.addEventListener("keydown", event => {
    if (event.key === "Escape" && !results.hidden) {
      event.preventDefault();
      closeSearch();
      return;
    }
    if (results.hidden) return;
    const links = results.querySelectorAll("a");
    if (!links.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      links[event.key === "ArrowDown" ? 0 : links.length - 1].focus();
    } else if (event.key === "Enter" && links[0].parentElement === results) {
      event.preventDefault();
      route(links[0].getAttribute("href"));
    }
  });
  results.addEventListener("keydown", event => {
    const links = [...results.querySelectorAll("a")];
    const index = links.indexOf(document.activeElement);
    if (event.key === "Escape") {
      event.preventDefault();
      search.focus();
      closeSearch();
    } else if (index >= 0 && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      event.preventDefault();
      (links[index + (event.key === "ArrowDown" ? 1 : -1)] || search).focus();
    }
  });
  searchRegion.addEventListener("focusout", event => {
    if (!searchRegion.contains(event.relatedTarget)) closeSearch();
  });
  menu.addEventListener("click", () => {
    menu.setAttribute("aria-expanded", String(menu.getAttribute("aria-expanded") === "false"));
  });
  sidebar.addEventListener("keydown", event => {
    if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
      menu.setAttribute("aria-expanded", "false");
      menu.focus();
    }
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".archive-search")) closeSearch();
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target) return;
    const href = link.getAttribute("href");
    if (!/^wiki\.html(?:\?|$)/.test(href)) return;
    event.preventDefault();
    route(href);
  });
  window.addEventListener("popstate", () => {
    if (renderedSearch !== location.search) {
      closeSearch();
      menu.setAttribute("aria-expanded", "false");
      render();
    }
    scrollToSection();
  });

  function card(article) {
    return `<a class="guide-card" href="${guide(article.id)}">
      ${guideCover(article.id)}
      <div class="guide-card-copy"><small>${esc(article.category)}</small><h3>${esc(article.title)}</h3>
      <p>${esc(article.summary)}</p><span class="read-more">Read the guide <span aria-hidden="true">↗</span></span></div></a>`;
  }

  function breadcrumbs(label) {
    return `<div class="article-breadcrumb"><a href="wiki.html">Wiki</a> <span aria-hidden="true">/</span> ${esc(label)}</div>`;
  }

  function title(eyebrow, name, description) {
    return `<p class="article-category">${esc(eyebrow)}</p><h1>${esc(name)}</h1><p class="wiki-intro">${esc(description)}</p>`;
  }

  function compareBossGuides() {
    const checkpoints = [["entry", "Getting in"], ["survival", "Survival check"], ["finish", "How you finish"], ["reward", "Claim and exit"]];
    return `<section class="solo-compare" aria-label="Solo boss comparison">${bossGuides.map(boss => {
      const article = byId.get(boss.id);
      return `<article class="solo-compare-card">${guideCover(boss.id)}
        <div class="solo-compare-copy"><p class="ref-eyebrow">${esc(boss.focus)}</p><h2>${esc(boss.name)}</h2>
          ${coverCredit("guide-" + boss.id)}
          <dl>${checkpoints.map(([key, label]) => `<div><dt>${label}</dt><dd>${esc(boss[key])}</dd></div>`).join("")}</dl>
          <a class="source-link solo-guide-link" href="${guide(boss.id)}" aria-label="Read the full guide: ${esc(article.title)}">Read the full guide <span aria-hidden="true">↗</span></a>
        </div></article>`;
    }).join("")}</section>
      <p class="wiki-intro solo-compare-note">Private instances have a separate coin fee when offered. Check the price at the entrance. These guides describe AetherRS3 encounter rules from the November 2026 review.</p>`;
  }

  function wikiHome() {
    main.innerHTML = `<section class="archive-hero">${artwork("wiki-hero", "wiki-hero-image", true)}
      <div class="hero-copy"><p class="eyebrow"><span class="diamond" aria-hidden="true"></span> The AetherRS3 Wiki</p>
      <h1>Knowledge for<br><em>the road ahead.</em></h1><p>Plan a solo boss, build a companion, look up a drop, or learn the little things that make AetherRS3 your world.</p>
      <a class="hero-link" href="${guide("first-steps")}">Start with your first hour <span aria-hidden="true">↗</span></a></div></section>
      <p class="wiki-hero-credit">${coverCredit("wiki-hero")}</p>
      <div class="wiki-stats"><div><strong>${number.format(data.pets.length)}</strong><small>Pet signatures</small></div><div><strong>${number.format(data.talents.length - 1)}</strong><small>Companion talents</small></div><div><strong>${number.format(data.monsters.length)}</strong><small>Configured NPC tables</small></div></div>
      <div class="wiki-section-title"><h2>Encounters worth preparing for</h2><a href="${path({ category: "Boss guides" })}">Compare solo encounters ↗</a></div>
      <div class="guide-grid">${bossGuides.map(boss => card(byId.get(boss.id))).join("")}</div>
      <div class="wiki-section-title"><h2>Look it up</h2></div>
      <div class="directory-grid">${[["monsters", "◈", "Search by monster or item"], ["items", "✦", number.format(items.length) + " items with configured sources"], ["pets", "✧", "Every individual signature"], ["talents", "◇", "Foundation and Mastery"], ["ascensions", "✦", "All eighteen ultimates"]].map(([view, symbol, label]) => `<a class="directory-tile" href="${path({ view })}"><span class="directory-symbol" aria-hidden="true">${symbol}</span><h3>${esc(directory[view].title)}</h3><p>${esc(directory[view].description)}</p><small>${label} ↗</small></a>`).join("")}</div>
      <div class="wiki-section-title"><h2>Train and explore</h2><a href="training.html">XP calculator ↗</a></div>
      <div class="directory-grid">${[["skills", catalogue.skills.length + " skill guides"], ["quests", catalogue.quests.length + " supported quests"]].map(([view, count]) => `<a class="directory-tile" href="${path({ view })}"><h3>${esc(directory[view].title)}</h3><p>${esc(directory[view].description)}</p><small>${count} ↗</small></a>`).join("")}</div>
      <div class="wiki-section-title"><h2>Make each session count</h2><a href="${path({ category: "all" })}">Browse guides ↗</a></div>
      <div class="guide-grid">${["area-loot", "global-events", "pet-training"].map(id => card(byId.get(id))).join("")}</div>`;
  }

  function renderArticle(article, params) {
    const training = Number.isInteger(article.trainingSkill);
    const quest = questByGuide.get(article.id);
    const examples = trainingActions.filter(action => action.skill === article.trainingSkill);
    const anchors = new Set();
    const sections = article.sections.map((section, index) => {
      const base = "topic-" + (section.anchor || normalize(section.title).replaceAll(" ", "-"));
      const anchor = anchors.has(base) ? base + "-" + (index + 1) : base;
      anchors.add(anchor);
      return { ...section, anchor };
    });
    main.innerHTML = `${breadcrumbs(article.category)}<article><p class="article-category">${esc(article.category)}</p>
      <h1>${esc(article.title)}</h1><p class="article-summary">${esc(article.summary)}</p>
      ${bossGuides.some(boss => boss.id === article.id) ? `<div class="article-links solo-compare-back"><a href="${path({ category: "Boss guides" })}">Compare solo encounters ↗</a></div>` : ""}
      ${article.custom ? '<span class="custom-badge">Custom AetherRS3 mechanics</span>' : ""}
      <figure class="guide-cover">${guideCover(article.id, "article-cover", true)}
        <figcaption>${coverCredit("guide-" + article.id)}</figcaption></figure>
      ${quest ? `<aside class="quest-journal quest-journal-compact" aria-label="Personal quest journal">
        <div><p class="ref-eyebrow">Personal quest journal</p><p>${questPrivacy}</p>
        <a class="source-link" href="${path({ view: "quests" })}">All restored quests ↗</a></div>
        <div>${questStatusControl(quest)}<p class="quest-save-status" role="status"></p></div></aside>` : ""}
      <div class="article-layout"><div class="article-body">${sections.map((section, index) => `<section id="section-${index + 1}">
        <div class="article-section-head"><h2 id="${esc(section.anchor)}" tabindex="-1">${esc(section.title)}</h2>
        <a class="section-permalink" href="#${esc(section.anchor)}" aria-label="Link to ${esc(section.title)}">#</a></div>
        ${section.text ? `<p>${esc(section.text)}</p>` : ""}
        ${section.list ? `<${section.ordered ? "ol" : "ul"}>${section.list.map(item => `<li>${esc(item)}</li>`).join("")}</${section.ordered ? "ol" : "ul"}>` : ""}
        ${section.links ? `<div class="article-links">${section.links.map(([id, label]) => `<a href="${guide(id)}">${esc(label)} ↗</a>`).join("")}</div>` : ""}
        ${section.external?.length ? `<div class="article-links">${section.external.map(([href, label]) => `<a href="${esc(href)}">${esc(label)} ↗</a>`).join("")}</div>` : ""}</section>`).join("")}</div>
        <nav class="article-toc" aria-label="On this page"><strong>On this page</strong>${sections.map(section => `<a href="#${esc(section.anchor)}">${esc(section.title)}</a>`).join("")}${article.reference ? '<a href="#wiki-reference">Reference</a>' : ""}${examples.length ? '<a href="#action-xp">Action XP examples</a>' : ""}${training ? '<a href="#atlas-routes">Atlas routes</a>' : ""}</nav></div>
      ${article.reference ? '<section id="wiki-reference" aria-label="Interactive reference"></section>' : ""}
      ${examples.length ? renderTrainingExamples(examples) : ""}
      ${training ? trainingRoutes(article.trainingSkill) : ""}
      <div class="article-footnote">AetherRS3 guide · November 2026 review snapshot · <a class="source-link" href="${guide("about")}">Sources and credits</a></div></article>`;
    if (article.reference) renderReference(article.reference, main.querySelector("#wiki-reference"), params);
    if (quest) {
      const journal = main.querySelector(".quest-journal");
      journal.querySelector("[data-quest-progress]").addEventListener("change", event => saveQuestStatus(event.target, journal));
    }
  }

  function renderTrainingExamples(examples) {
    return `<section id="action-xp"><div class="wiki-section-title"><h2>Action XP examples</h2></div>
      <p class="wiki-intro">Base XP before difficulty and bonuses. Choose an action to load its value into the calculator.</p>
      <div class="reference-grid">${examples.map(action => `<article class="reference-card">
        <span class="ref-eyebrow">Level ${action.level} · ${number.format(action.xp)} base XP per ${esc(action.unit)}</span>
        <h3>${esc(action.label)}</h3><p>${esc(action.detail)}</p>
        <a class="source-link" href="training.html?action=${encodeURIComponent(action.id)}#xp-calculator" aria-label="Calculate XP for ${esc(action.label)}">Calculate XP ↗</a>
        </article>`).join("")}</div></section>`;
  }

  function trainingRoutes(id) {
    const routes = catalogue.routes.filter(route => route.skill === id).sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
    const combat = [0, 1, 2, 3, 4, 6, 26].includes(id);
    const card = (name, category, hint) => {
      const { src, credit, subject, portrait } = atlasRouteArt[name];
      return `<article class="reference-card atlas-route-card">
        <img class="atlas-route-photo${portrait ? " atlas-route-portrait" : ""}" src="${esc(src)}" alt="" loading="lazy" decoding="async">
        <div class="atlas-route-copy"><span class="ref-eyebrow">${esc(category)}</span><h3>${esc(name)}</h3>
        ${hint ? `<p>${esc(hint)}</p>` : ""}
        <a class="source-link" href="${esc(credit)}">Wiki image · ${esc(subject)} <span aria-hidden="true">↗</span></a></div>
        </article>`;
    };
    return `<section id="atlas-routes"><div class="wiki-section-title"><h2>Atlas routes</h2></div>
      <p class="wiki-intro">Press T in game and open ${combat ? "Combat training" : "Skilling"}. Suggested levels are route guidance. Activity and travel requirements still apply.</p>
      <div class="reference-grid">${combat ? catalogue.combat.map(name => card(name, "Combat training")).join("") : ""}
      ${routes.map(route => card(route.name, route.exploration ? "Exploration route" : "Suggested level " + route.level, route.hint)).join("")}</div>
      <p class="atlas-photo-credit">RuneScape Wiki images show the area, creature or activity associated with each route.</p></section>`;
  }

  function readQuestStatus(id) {
    if (sessionQuestStates.has(id)) return sessionQuestStates.get(id);
    try {
      const status = localStorage.getItem(questStorageKey(id));
      return status === "started" || status === "complete" ? status : "";
    } catch {
      return "";
    }
  }

  function saveQuestStatus(control, container) {
    const id = Number(control.dataset.questProgress);
    const status = control.value;
    const feedback = container.querySelector(".quest-save-status");
    try {
      if (status) localStorage.setItem(questStorageKey(id), status);
      else localStorage.removeItem(questStorageKey(id));
      sessionQuestStates.delete(id);
      feedback.textContent = "Progress saved.";
    } catch {
      sessionQuestStates.set(id, status);
      feedback.textContent = "Browser storage is unavailable. This change lasts until you reload the page.";
    }
  }

  function questStatusControl(quest, current = readQuestStatus(quest.id)) {
    return `<label class="quest-progress-control"><span>My progress</span>
      <select data-quest-progress="${quest.id}" aria-label="Journal status for ${esc(quest.name)}">
      ${questStates.map(([value, label]) => `<option value="${value}"${value === current ? " selected" : ""}>${label}</option>`).join("")}
      </select></label>`;
  }

  function renderCatalogue(view, container, params) {
    const skills = view === "skills";
    const rows = (skills ? catalogue.skills : catalogue.quests).slice().sort((a, b) => a.name.localeCompare(b.name));
    const hasJournalOnly = !skills && rows.some(row => !byId.has("quest-" + row.id));
    container.innerHTML = `${skills ? "" : `<aside class="quest-journal" aria-label="Personal quest journal">
      <div><h2>My quest journal</h2><p>${questPrivacy}</p><p class="quest-save-status" role="status"></p></div>
      <div class="quest-journal-total"><p id="quest-journal-total"></p><progress id="quest-journal-meter" max="${rows.length}" aria-label="Quests marked complete"></progress></div>
      </aside>`}
      <div class="reference-tools"><input type="search" aria-label="Search ${skills ? "skills" : "quests"}" placeholder="Search by name">
      ${skills ? "" : `<select id="quest-status-filter" aria-label="Filter by journal status"><option value="all">All journal statuses</option>
      ${questStates.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select>`}
      ${hasJournalOnly ? '<select id="quest-walkthrough-filter" aria-label="Filter walkthrough availability"><option value="">All supported quests</option><option value="ready">With walkthroughs</option><option value="journal">In-game journal only</option></select>' : ""}</div>
      <p class="reference-count" role="status"></p><div class="reference-grid"></div>
      ${skills ? '<p class="skill-icon-credit"><a class="source-link" href="https://runescape.wiki/w/Skills">Skill icons from RuneScape Wiki ↗</a></p>' : ""}`;
    const input = container.querySelector("input");
    const filter = container.querySelector("#quest-walkthrough-filter");
    const progressFilter = container.querySelector("#quest-status-filter");
    const grid = container.querySelector(".reference-grid");
    input.value = params.get("q") || "";
    function update() {
      const query = normalize(input.value);
      const states = skills ? null : new Map(rows.map(row => [row.id, readQuestStatus(row.id)]));
      const shown = rows.filter(row => {
        if (!normalize(row.name).includes(query)) return false;
        if (progressFilter && progressFilter.value !== "all" && states.get(row.id) !== progressFilter.value) return false;
        if (!filter?.value) return true;
        return byId.has("quest-" + row.id) === (filter.value === "ready");
      });
      if (states) {
        const complete = [...states.values()].filter(status => status === "complete").length;
        container.querySelector("#quest-journal-total").textContent = `${complete} of ${rows.length} marked complete`;
        container.querySelector("#quest-journal-meter").value = complete;
      }
      container.querySelector(".reference-count").textContent = `${shown.length} of ${rows.length} ${skills ? "skills" : "quests"}`;
      grid.innerHTML = shown.map(row => {
        const id = (skills ? "train-" : "quest-") + row.id;
        const available = byId.has(id);
        return `<article class="reference-card"><span class="ref-eyebrow">${skills ? "Skill guide" : row.points + (row.points === 1 ? " quest point" : " quest points")}</span>
          <h3${skills ? ' class="skill-card-title"' : ""}>${skills ? artwork("skill-icon-" + row.id, "skill-card-icon") : ""}<span>${esc(row.name)}</span></h3>${available ? `<a class="source-link" href="${guide(id)}">${skills ? "Training guide" : "AetherRS3 walkthrough"} ↗</a>`
          : '<p>Use the in-game quest journal for the current steps.</p>'}
          ${skills ? "" : questStatusControl(row, states.get(row.id))}</article>`;
      }).join("") || '<p class="empty-reference">No matches found.</p>';
    }
    input.addEventListener("input", update);
    if (filter) filter.addEventListener("change", update);
    if (progressFilter) {
      progressFilter.addEventListener("change", update);
      grid.addEventListener("change", event => {
        const control = event.target;
        if (!control.matches("[data-quest-progress]")) return;
        saveQuestStatus(control, container);
        update();
        (grid.querySelector(`[data-quest-progress="${control.dataset.questProgress}"]`) || progressFilter).focus();
      });
    }
    update();
  }

  function artwork(key, cssClass, eager = false) {
    const image = art[key];
    if (!image || !/^(assets\/wiki\/|https:\/\/(?:oldschool\.)?runescape\.wiki\/images\/)/.test(image.src)) return "";
    return `<img class="${cssClass}" src="${esc(image.src)}" alt="" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  }

  function credit(key, label = "RuneScape Wiki artwork") {
    const url = art[key]?.credit;
    return /^https:\/\/(?:oldschool\.)?runescape\.wiki\/w\//.test(url || "") ? `<a class="source-link" href="${esc(url)}">${esc(label)} ↗</a>` : "";
  }

  function guideCover(id, cssClass = "", eager = false) {
    const key = "guide-" + id;
    return artwork(key, `guide-reference${art[key]?.portrait ? " guide-portrait" : ""} ${cssClass}`.trim(), eager);
  }

  function coverCredit(key) {
    return credit(key, "Wiki illustration · " + art[key]?.subject);
  }

  function portrait(key, cssClass) {
    return artwork(key, cssClass) || '<span class="portrait-placeholder" aria-label="Verified portrait unavailable" role="img">◇</span>';
  }

  function petCard(pet, selected) {
    const key = "pet-" + pet.key.replace(":", "-");
    return `<article class="reference-card">${portrait(key, "reference-art")}<span class="ref-eyebrow">${pet.cosmetic ? "Cosmetic pet" : "Item-based pet"}</span>
      <h3>${esc(pet.name)}</h3><p><strong>${esc(pet.signature)}</strong></p><p class="effect">${esc(pet.effect)}</p>
      ${art[key]?.kind === "family" ? '<p class="monster-meta">Pet family illustration · form colours may differ</p>' : ""}
      <details${selected ? " open" : ""}><summary>How to obtain and unlock the signature</summary><p>${esc(pet.obtain)}</p><p>Pet level 20 · 3 talent points</p>${credit(key)}</details></article>`;
  }

  function talentCard(talent) {
    const parent = talentById.get(talent.prerequisite);
    return `<article class="reference-card"><span class="ref-eyebrow">${esc(talent.branch)} · ${talent.tier >= 5 ? "Mastery" : "Foundation"}</span>
      <h3>${esc(talent.name)}</h3><p class="effect">${esc(talent.effect)}</p><div class="reference-tags"><span>Level ${talent.level}</span><span>${talent.maxRank} ${talent.maxRank === 1 ? "rank" : "ranks"}</span><span>${talent.cost} ${talent.cost === 1 ? "point" : "points"} per rank</span></div>
      ${parent ? `<div class="rank-breakdown">Requires ${esc(parent.name)} rank ${talent.requiredRank}${talent.tier === 5 ? " and the complete Foundation branch" : ""}.</div>` : ""}</article>`;
  }

  function ascensionCard(ascension) {
    return `<article class="reference-card"><span class="ref-eyebrow">${esc(ascension.branch)} · Ascension</span><h3>${esc(ascension.name)}</h3>
      <p class="effect">${esc(ascension.effect)}</p><div class="reference-tags"><span>Prestige 1+</span><span>1 Ascension point per rank</span><span>Up to 10 ranks</span>${ascension.loot ? "<span>Toggleable loot effect</span>" : ""}</div></article>`;
  }

  function monsterCard(monster, query) {
    return `<a class="reference-card monster-card" href="${path({ view: "monsters", npc: monster.id, ...(query ? { q: query } : {}) })}">
      ${portrait("npc-" + monster.id, "monster-thumbnail")}<div><span class="ref-eyebrow">NPC ${monster.id}</span><h3>${esc(monster.name)}</h3>
      <span class="monster-meta">${monster.modelName ? "Custom encounter form · " : monster.level > 0 ? "Combat " + monster.level + " · " : ""}${data.dropTables[monster.table].length} entries</span></div></a>`;
  }

  function itemRow(row) {
    const [id, min, max, chance, pool] = row;
    const key = "item-" + id;
    const name = itemById.get(id).name;
    const image = artwork(key, "item-art");
    return `<tr><td>${image || '<span class="item-placeholder" aria-hidden="true">◇</span>'}
      <span class="item-row-name"><a href="${path({ view: "items", item: id })}">${esc(name)} ↗</a>${credit(key)}</span></td>
      ${entryCells(min, max, chance, pool)}</tr>`;
  }

  function entryCells(min, max, chance, pool) {
    const odds = chance > 0 && chance < .001 ? "<0.001%" : number.format(chance) + "%";
    const quantity = min === max ? number.format(min) : `${number.format(min)}–${number.format(max)}`;
    return `<td>${quantity}</td><td title="${chance}%">${esc(odds)}</td><td class="pool">${esc(pool)}</td>`;
  }

  function itemCard(item, query) {
    return `<a class="reference-card item-source-card" href="${path({ view: "items", item: item.id, ...(query ? { q: query } : {}) })}">
      ${artwork("item-" + item.id, "item-art") || '<span class="item-placeholder" aria-hidden="true">◇</span>'}
      <div><span class="ref-eyebrow">Item ${item.id}</span><h3>${esc(item.name)}</h3>
      <span class="monster-meta">${number.format(item.sourceCount)} configured NPC ${item.sourceCount === 1 ? "ID" : "IDs"}</span></div></a>`;
  }

  function itemDetail(item) {
    const key = "item-" + item.id;
    const oracleWhip = item.id >= 15441 && item.id <= 15444;
    return `<section class="monster-detail item-detail" aria-label="Selected item drop sources">
      ${artwork(key, "item-art") || '<span class="item-placeholder" aria-hidden="true">◇</span>'}
      <p class="article-category">Item ${item.id} · Configured sources</p><h2>${esc(item.name)}</h2>
      <p class="wiki-intro">${number.format(item.sourceCount)} NPC IDs · ${number.format(item.sources.length)} distinct tables</p>
      ${oracleWhip ? '<p class="monster-meta">Coloured abyssal whip variant. The standard abyssal whip is item #4151.</p>' : ""}
      ${credit(key) || '<p class="monster-meta">No verified artwork for this item.</p>'}
      <div class="article-links"><a href="${path({ view: "items" })}">Browse all items ↗</a></div>
      <div class="wiki-note">NPC variants with the same table are grouped. Quantities include the regular resource bonus. Read the pool to see whether odds are per kill, reward pile or chest draw.</div>
      <div class="item-source-groups"></div><div class="wiki-pager">
        <button type="button" data-source-prev>Previous sources</button><span data-source-page role="status"></span><button type="button" data-source-next>Next sources</button>
      </div></section>`;
  }

  function showItemSources(item, element) {
    const groups = element.querySelector(".item-source-groups");
    const previous = element.querySelector("[data-source-prev]");
    const next = element.querySelector("[data-source-next]");
    const status = element.querySelector("[data-source-page]");
    const ordered = item.sources.slice().sort((a, b) => a.npcs[0].name.localeCompare(b.npcs[0].name) || a.npcs[0].id - b.npcs[0].id);
    const pageSize = 6;
    const pages = Math.ceil(ordered.length / pageSize);
    let page = 0;
    function update() {
      groups.innerHTML = ordered.slice(page * pageSize, (page + 1) * pageSize).map(({ npcs, entries }) => {
        const oracle = npcs.every(npc => oracleModels.has(npc.id));
        const singleEncounter = oracle || npcs.every(npc => maxModels.has(npc.id));
        const sourceLinks = npcs.map(npc => `<li><a href="${path({ view: "monsters", npc: npc.id })}">${portrait("npc-" + npc.id, "monster-thumbnail")}<span>${esc(npc.modelName ? npc.modelName + " model" : npc.name)} · #${npc.id} ↗</span></a></li>`).join("");
        return `<article class="item-source-group"><h3>${esc(npcs[0].name)}${!singleEncounter && npcs.length > 1 ? " and " + (npcs.length - 1) + " more" : ""}</h3>
          ${oracle ? '<p class="monster-meta">Custom Oracle rewards. These IDs are the reused phase models.</p>' : ""}
          ${npcs.length > 3 ? `<details><summary>${npcs.length} NPC IDs use this table</summary><ul class="monster-source-links">${sourceLinks}</ul></details>` : `<ul class="monster-source-links">${sourceLinks}</ul>`}
          <div class="table-scroll" tabindex="0" aria-label="Configured entries"><table class="loot-table"><thead><tr><th scope="col">Quantity</th><th scope="col">Base entry</th><th scope="col">Pool</th></tr></thead>
          <tbody>${entries.map(([, min, max, chance, pool]) => `<tr>${entryCells(min, max, chance, pool)}</tr>`).join("")}</tbody></table></div></article>`;
      }).join("");
      status.textContent = `Source page ${page + 1} of ${pages}`;
      watchImages(groups);
      previous.disabled = page === 0;
      next.disabled = page + 1 >= pages;
    }
    previous.addEventListener("click", () => { page--; update(); groups.scrollIntoView({ block: "start" }); });
    next.addEventListener("click", () => { page++; update(); groups.scrollIntoView({ block: "start" }); });
    element.querySelector(".wiki-pager").hidden = pages < 2;
    update();
  }

  function monsterDetail(monster) {
    const key = "npc-" + monster.id;
    const facts = monster.modelName ? "Custom encounter · cache model " + monster.modelName : monster.level > 0 ? "Combat " + monster.level : "";
    const hp = monster.encounterHp ? number.format(monster.encounterHp) + " encounter HP" : monster.modelName ? "" : number.format(monster.hp) + " template HP";
    return `<section class="monster-detail" aria-label="Selected monster drop table">${portrait(key, "monster-art")}
      <p class="article-category">NPC ${monster.id} · ${esc(monster.rewardSource)}</p><h2>${esc(monster.name)}</h2>
      <p class="wiki-intro">${esc([facts, hp, data.dropTables[monster.table].length + " drop entries"].filter(Boolean).join(" · "))}</p>${credit(key)}
      <div class="wiki-note">${monster.rewardSource === "Reward chest"
        ? "Queen Black Dragon awards supplies from the chest. Weighted odds are per draw. Journals depend on which earlier journals you already hold."
        : monster.rewardSource === "Vorago reward pile"
          ? "Vorago rolls this table separately for each of five reward piles. The odds shown are per pile."
          : monster.hp <= 1 && !monster.encounterHp && monster.rewardSource === "Configured table"
            ? "This NPC has a non-combat template. These are configured entries. A scripted encounter may handle its rewards separately."
            : "Base odds exclude account, equipment and event boosts. Quantities include AetherRS3’s regular resource bonus."}
        <a href="${guide("monster-drops")}">How to read the table</a></div>
      <div class="table-scroll" tabindex="0" aria-label="Drop table"><table class="loot-table"><thead><tr><th scope="col">Item</th><th scope="col">Quantity</th><th scope="col">Base entry</th><th scope="col">Pool</th></tr></thead><tbody>${data.dropTables[monster.table].map(itemRow).join("")}</tbody></table></div></section>`;
  }

  function renderReference(view, container, params) {
    if (view === "levels") {
      container.innerHTML = `<div class="wiki-note">Level 99 needs ${number.format(data.levels.at(-1).xp)} XP. Prestige needs ${number.format(data.rules.maxXp)} XP. Prestige points are additional to the level-earned points shown here.</div>
        <div class="table-scroll"><table class="loot-table"><thead><tr><th scope="col">Pet level</th><th scope="col">Cumulative XP</th><th scope="col">Level-earned points</th></tr></thead><tbody>${data.levels.map(level => `<tr><td>${level.level}</td><td>${number.format(level.xp)}</td><td>${level.points}</td></tr>`).join("")}</tbody></table></div>`;
      return;
    }
    const selected = view === "monsters" ? monsterById.get(Number(params.get("npc"))) : null;
    const selectedItem = view === "items" ? itemById.get(Number(params.get("item"))) : null;
    const label = view === "monsters" ? "Search monsters or items" : view === "items" ? "Search items by name or ID" : "Filter reference";
    container.innerHTML = `${selected ? monsterDetail(selected) : selectedItem ? itemDetail(selectedItem) : ""}<div class="reference-tools">
      <input id="reference-search" type="search" aria-label="${label}" placeholder="${label}…" value="${esc(params.get("q") || "")}">
      ${view === "talents" ? `<select id="reference-branch" aria-label="Filter branch"><option value="">All 12 branches</option>${branches.map(branch => `<option>${esc(branch)}</option>`).join("")}</select>` : ""}
      ${view === "pets" ? '<select id="reference-kind" aria-label="Filter pet type"><option value="">All pets</option><option value="cosmetic">Cosmetic pets</option><option value="item">Item-based pets</option></select>' : ""}
      ${view === "monsters" ? '<select id="reference-kind" aria-label="Search by"><option value="">Monster or drop</option><option value="monster">Monster name or ID</option><option value="item">Drop item only</option></select>' : ""}</div>
      <p class="reference-count" role="status"></p><div class="reference-grid${view === "monsters" ? " monster-grid" : ""}"></div>
      <div class="wiki-pager"><button type="button" data-prev>Previous</button><span data-page></span><button type="button" data-next>Next</button></div>`;
    const input = container.querySelector("#reference-search");
    const branch = container.querySelector("#reference-branch");
    const kind = container.querySelector("#reference-kind");
    const grid = container.querySelector(".reference-grid");
    if (selectedItem) showItemSources(selectedItem, container.querySelector(".item-detail"));
    if (branch && branches.includes(params.get("branch"))) branch.value = params.get("branch");
    let page = 0;
    const pageSize = view === "monsters" ? 24 : 12;

    function update() {
      const query = input.value.trim();
      const terms = normalize(query).split(" ").filter(Boolean);
      const matches = value => terms.every(term => normalize(value).includes(term));
      let rows;
      if (view === "pets") rows = data.pets.filter(pet => (!kind.value || (kind.value === "cosmetic") === pet.cosmetic) && matches(`${pet.name} ${pet.signature} ${pet.effect}`));
      else if (view === "talents") rows = data.talents.filter(talent => talent.branchIndex >= 0 && (!branch.value || talent.branch === branch.value) && matches(`${talent.name} ${talent.effect} ${talent.branch}`))
        .sort((a, b) => a.branchIndex - b.branchIndex || a.tier - b.tier);
      else if (view === "ascensions") rows = data.ascensions.filter(ascension => matches(`${ascension.name} ${ascension.branch} ${ascension.effect}`));
      else if (view === "items") rows = items.filter(item => matches(item.terms));
      else rows = monsters.filter(monster => (kind.value !== "item" && matches([monster.name, monster.modelName, monster.id].join(" ")))
        || (kind.value !== "monster" && tableTerms[monster.table].some(matches)));
      const pages = Math.max(1, Math.ceil(rows.length / pageSize));
      page = Math.max(0, Math.min(page, pages - 1));
      const shown = rows.slice(page * pageSize, (page + 1) * pageSize);
      grid.innerHTML = shown.length ? shown.map(row => view === "pets" ? petCard(row, row.key === params.get("pet"))
        : view === "talents" ? talentCard(row) : view === "ascensions" ? ascensionCard(row) : view === "items" ? itemCard(row, query) : monsterCard(row, query)).join("")
        : '<div class="empty-reference">No entries matched. Try a shorter name or clear the filter.</div>';
      container.querySelector(".reference-count").textContent = `${number.format(rows.length)} ${rows.length === 1 ? "entry" : "entries"}${query ? ` matching “${query}”` : ""}`;
      container.querySelector("[data-page]").textContent = `Page ${page + 1} of ${pages}`;
      container.querySelector("[data-prev]").disabled = page === 0;
      container.querySelector("[data-next]").disabled = page + 1 >= pages;
      watchImages(grid);
    }
    for (const control of [input, branch, kind].filter(Boolean)) control.addEventListener(control === input ? "input" : "change", () => { page = 0; update(); });
    container.querySelector("[data-prev]").addEventListener("click", () => { page--; update(); grid.scrollIntoView({ block: "start" }); });
    container.querySelector("[data-next]").addEventListener("click", () => { page++; update(); grid.scrollIntoView({ block: "start" }); });
    update();
  }

  function watchImages(element) {
    for (const image of element.querySelectorAll(".reference-art,.item-art,.monster-art,.monster-thumbnail")) {
      const fallback = () => {
        if (image.classList.contains("item-art")) {
          const symbol = document.createElement("span");
          symbol.className = "item-placeholder";
          symbol.setAttribute("aria-hidden", "true");
          symbol.textContent = "◇";
          image.replaceWith(symbol);
        } else {
          const symbol = document.createElement("span");
          symbol.className = "portrait-placeholder";
          symbol.setAttribute("role", "img");
          symbol.setAttribute("aria-label", "Verified portrait unavailable");
          symbol.textContent = "◇";
          image.replaceWith(symbol);
        }
      };
      if (image.complete && !image.naturalWidth) fallback();
      else image.addEventListener("error", fallback, { once: true });
    }
  }

  function render() {
    renderedSearch = location.search;
    const params = new URLSearchParams(location.search);
    const article = byId.get(params.get("guide"));
    const view = params.get("view");
    const category = params.get("category");
    const info = Object.hasOwn(directory, view) ? directory[view] : null;
    const selected = article ? guide(article.id) : info ? path({ view }) : category ? path({ category }) : path();
    sidebar.innerHTML = navigation.map(([label, links]) => `<p class="sidebar-label">${esc(label)}</p>${links.map(([name, href]) => `<a href="${esc(href)}"${href === selected ? ' aria-current="page"' : ""}>${esc(name)}<small aria-hidden="true">↗</small></a>`).join("")}`).join("")
      + '<p class="sidebar-note">AetherRS3 reference<br>November 2026 review</p>';
    if (article) renderArticle(article, params);
    else if (info) {
      main.innerHTML = breadcrumbs(info.eyebrow) + title(info.eyebrow, info.title, info.description)
        + (info.guide ? `<div class="article-links"><a href="${guide(info.guide)}">Read the guide ↗</a></div>` : "")
        + '<section id="wiki-reference" aria-label="Interactive reference"></section>';
      if (view === "skills" || view === "quests") renderCatalogue(view, main.querySelector("#wiki-reference"), params);
      else renderReference(view, main.querySelector("#wiki-reference"), params);
    } else if (category === "Boss guides") {
      const more = articles.filter(article => article.category === category && !bossGuides.some(boss => boss.id === article.id));
      main.innerHTML = breadcrumbs(category) + title("Boss reference", category, "Compare the restored solo encounters or pick a guide for another boss.") + compareBossGuides()
        + `<div class="wiki-section-title"><h2>More boss guides</h2></div><div class="guide-grid two">${more.map(card).join("")}</div>`;
    } else if (category) {
      const shown = category === "all" ? articles : articles.filter(item => item.category === category);
      main.innerHTML = breadcrumbs(category === "all" ? "All guides" : category) + title("The AetherRS3 Wiki", category === "all" ? "All guides" : category,
        "Browse the archive's practical guides and references for AetherRS3.") + `<div class="guide-grid two">${shown.map(card).join("") || '<p class="empty-reference">This category has no guides yet.</p>'}</div>`;
    } else wikiHome();
    const name = article?.title || info?.title || (category === "all" ? "All guides" : category) || "Archive home";
    menuCurrent.textContent = name;
    document.title = (name === "Archive home" ? "The AetherRS3 Wiki" : name) + " · AetherRS3";
    watchImages(main);
  }

  render();
  scrollToSection();
})();
