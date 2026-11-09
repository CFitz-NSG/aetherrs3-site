"use strict";

(() => {
  const activities = {
    training: {
      name: "Skilling session", guide: "wiki.html?view=skills",
      prep: ["Choose a training route and bring the required tools and supplies.", "Use the XP calculator to estimate your batch."]
    },
    quests: {
      name: "Quest session", guide: "wiki.html?view=quests",
      prep: ["Check the prerequisite quests and skill requirements.", "Pack the items listed in the walkthrough before travelling."]
    },
    vorago: {
      name: "Vorago", guide: "wiki.html?guide=solo-vorago",
      prep: ["Hear Vorago’s history at the borehole lobby.", "For a group, agree who will hold his attention for the phase-one jump.", "Keep room for the weapon pieces and Maul of Omens."]
    },
    araxxor: {
      name: "Araxxor", guide: "wiki.html?guide=solo-araxxor",
      prep: ["Choose an available path and agree who will start the burn.", "Bring food, potions and the supplies for your chosen combat style.", "Read the web, cleave and cocoon cues before entering."]
    },
    rots: {
      name: "Rise of the Six solo", guide: "wiki.html?guide=solo-rots",
      prep: ["Prepare food, potions and familiar supplies before the opening trial.", "Read the six shadow assignments in chat.", "Leave room for the chest and follow the escape markers to the rope."]
    },
    companions: {
      name: "Companion training", guide: "wiki.html?guide=pet-training",
      prep: ["Call the owned companion you want to train.", "Choose eligible skill actions or boss clears for XP."]
    }
  };
  const activity = document.querySelector("#session-activity");
  const time = document.querySelector("#session-time");
  const summary = document.querySelector("#session-summary");
  const copy = document.querySelector("#session-copy");
  const status = document.querySelector("#session-copy-status");
  const dateOptions = {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", timeZoneName: "short"
  };
  const local = new Intl.DateTimeFormat("en-US", dateOptions);
  const newYork = new Intl.DateTimeFormat("en-US", { ...dateOptions, timeZone: "America/New_York" });
  document.querySelector("#session-zone").textContent = local.resolvedOptions().timeZone.replaceAll("_", " ");

  function wallTime(date) {
    const pad = value => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function update() {
    const selection = activities[activity.value];
    document.querySelector("#session-guide").href = selection.guide;
    document.querySelector("#session-prep").replaceChildren(...selection.prep.map(text => {
      const item = document.createElement("li");
      item.textContent = text;
      return item;
    }));
    const date = new Date(time.value);
    const valid = time.validity.valid && Number.isFinite(date.getTime()) && wallTime(date) === time.value;
    const events = valid ? window.aetherEventClock.at(date.getTime()) : null;
    document.querySelector("#session-time-note").textContent = valid
      ? "Local start · " + local.format(date)
      : "Enter a valid local time. During a clock change, choose an hour that exists in your time zone.";
    document.querySelector("#session-new-york").textContent = valid ? newYork.format(date) : "—";
    document.querySelector("#session-event").textContent = events?.name || "—";
    document.querySelector("#session-weekend").textContent = events ? (events.weekend ? "Active" : "Off") : "—";
    document.querySelector("#session-xp").textContent = events ? `${events.playerXp}× player · ${events.petXp}× pet` : "—";
    summary.value = events ? [
      `AetherRS3 · ${selection.name}`,
      `Start: ${newYork.format(date)} (New York)`,
      `UTC: ${date.toISOString().slice(0, 16).replace("T", " ")} UTC`,
      `Scheduled: ${events.name} · ${events.playerXp}× player XP · ${events.petXp}× pet XP`,
      `Weekend Double XP: ${events.weekend ? "active" : "off"}`,
      ...selection.prep.map(text => "• " + text)
    ].join("\n") : "";
    copy.disabled = !events;
    status.textContent = "";
  }

  activity.addEventListener("change", update);
  time.addEventListener("input", update);
  copy.addEventListener("click", async () => {
    const plan = summary.value;
    try {
      await navigator.clipboard.writeText(plan);
      if (summary.value === plan) status.textContent = "Session plan copied.";
    } catch {
      if (summary.value !== plan) return;
      summary.focus();
      summary.select();
      status.textContent = "Plan selected. Press Ctrl+C to copy.";
    }
  });
  time.value = wallTime(new Date(Date.now() + 60 * 60 * 1000));
  update();
})();
