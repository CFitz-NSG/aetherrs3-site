"use strict";

(() => {
  const rates = Object.freeze({ Easy: 50, Normal: 25, Hard: 10, Expert: 5, Extreme: 1 });
  const maximumXp = 200000000;

  function xpForLevel(level) {
    let points = 0;
    for (let current = 1; current < level; current++) points += Math.floor(current + 300 * Math.pow(2, current / 7));
    return Math.floor(points / 4);
  }

  function calculate({ base, mode, weekend, hourly, well, quantity, starting, target }) {
    if (!Object.hasOwn(rates, mode) || ![base, quantity, starting, target].every(Number.isFinite)
        || base <= 0 || !Number.isInteger(quantity) || quantity < 0 || starting < 0 || starting > maximumXp || target < 0 || target > maximumXp) return null;
    const multiplier = rates[mode] * (weekend ? 2 : 1) * (hourly ? 2 : 1) * (well ? 1.25 : 1);
    const perAction = base * multiplier;
    if (!Number.isFinite(perAction)) return null;
    const earned = Math.min(maximumXp - starting, perAction * quantity);
    return { multiplier, perAction, earned, final: starting + earned, required: Math.max(0, Math.ceil((target - starting) / perAction)) };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { rates, xpForLevel, calculate };
    return;
  }
  const tool = document.querySelector("#xp-calculator");
  if (!tool) return;
  const field = id => tool.querySelector("#" + id);
  const count = new Intl.NumberFormat("en-US", { maximumFractionDigits: 3 });
  const actions = new Map(window.aetherTrainingActions.map(action => [action.id, action]));
  const picker = field("xp-action");
  const base = field("xp-base");
  const actionDetail = field("xp-action-detail");
  const groups = new Map();
  for (const action of actions.values()) {
    if (!groups.has(action.skill)) {
      const group = document.createElement("optgroup");
      group.label = action.skillName;
      groups.set(action.skill, group);
      picker.append(group);
    }
    const option = new Option(`${action.label} · level ${action.level}`, action.id);
    groups.get(action.skill).append(option);
  }
  function selectAction() {
    const action = actions.get(picker.value);
    actionDetail.hidden = !action;
    if (!action) {
      actionDetail.textContent = "";
      return;
    }
    base.value = String(action.xp);
    actionDetail.textContent = `Level ${action.level} ${action.skillName}. ${count.format(action.xp)} base XP per ${action.unit}. ${action.detail}`;
  }
  const requested = new URLSearchParams(location.search).get("action");
  if (actions.has(requested)) {
    picker.value = requested;
    selectAction();
  }
  picker.addEventListener("change", selectAction);
  base.addEventListener("input", () => {
    picker.value = "";
    selectAction();
  });
  const goal = field("xp-target-level");
  for (let level = 1; level <= 120; level++) {
    const option = document.createElement("option");
    option.value = String(level);
    option.textContent = `Level ${level} · ${count.format(xpForLevel(level))} XP`;
    option.selected = level === 50;
    goal.append(option);
  }
  function render() {
    const automatic = field("xp-schedule").checked;
    const schedule = window.aetherEventClock.at();
    const weekend = field("xp-weekend");
    const hourly = field("xp-hourly");
    weekend.disabled = hourly.disabled = automatic;
    if (automatic) { weekend.checked = schedule.weekend; hourly.checked = schedule.event === 3; }
    const target = xpForLevel(Number(goal.value));
    const result = calculate({ base: base.valueAsNumber, mode: field("xp-mode").value, weekend: weekend.checked,
      hourly: hourly.checked, well: field("xp-well").checked, quantity: field("xp-actions").valueAsNumber, starting: field("xp-start").valueAsNumber, target });
    const outputs = tool.querySelectorAll("[data-xp-result]");
    for (const output of outputs) {
      const value = result?.[output.dataset.xpResult];
      output.textContent = value === undefined ? "—" : count.format(value) + (output.dataset.xpResult === "multiplier" ? "×" : "");
    }
    field("xp-feedback").textContent = result ? `Level ${goal.value} needs ${count.format(target)} XP. The skill cap is ${count.format(maximumXp)} XP.` : "Enter a positive base XP amount, a whole number of actions and valid current XP.";
  }
  tool.addEventListener("input", render);
  tool.addEventListener("change", render);
  render();
  window.setInterval(render, 15000);
})();
