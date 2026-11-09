"use strict";

(() => {
  const fields = [...document.querySelectorAll("[data-event-value]")];
  if (!fields.length) return;
  const forecast = document.querySelector("#event-forecast");
  const rowTemplate = document.querySelector("#event-forecast-row");
  const date = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "short", hour: "numeric", minute: "2-digit", timeZoneName: "short" });
  let firstForecastHour;

  function updateForecast(nextHour) {
    if (!forecast || nextHour === firstForecastHour) return;
    const rows = [];
    let start = nextHour;
    for (let slot = 0; slot < 6; slot++) {
      const schedule = window.aetherEventClock.at(start);
      const row = rowTemplate.content.firstElementChild.cloneNode(true);
      const time = row.querySelector(".forecast-time");
      time.dateTime = new Date(start).toISOString();
      time.textContent = date.format(start);
      row.querySelector(".forecast-name").textContent = schedule.name;
      row.querySelector(".forecast-player").textContent = "Player XP " + schedule.playerXp + "×";
      row.querySelector(".forecast-pet").textContent = "Pet XP " + schedule.petXp + "×";
      if (schedule.nextWeekend < schedule.nextHour) {
        const change = row.querySelector(".forecast-change");
        const updated = window.aetherEventClock.at(schedule.nextWeekend);
        const action = updated.weekend ? "starts" : "ends";
        change.textContent = `Weekend Double XP ${action} ${date.format(schedule.nextWeekend)}. Player XP changes to ${updated.playerXp}×.`;
        change.hidden = false;
      }
      rows.push(row);
      start = schedule.nextHour;
    }
    forecast.replaceChildren(...rows);
    firstForecastHour = nextHour;
  }

  function remaining(millis) {
    const seconds = Math.max(0, Math.ceil(millis / 1000));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) % 60;
    return (hours > 23 ? `${Math.floor(hours / 24)}d ${hours % 24}h ` : hours ? `${hours}h ` : "") + `${minutes}m ${seconds % 60}s`;
  }
  function update() {
    const now = Date.now();
    const schedule = window.aetherEventClock.at(now);
    const values = {
      name: schedule.name, description: schedule.description,
      weekend: schedule.weekend ? "Weekend Double XP is active" : "Weekend Double XP is off",
      weekendShort: schedule.weekend ? "Weekend Double XP: On" : "Weekend Double XP: Off",
      nextHour: date.format(schedule.nextHour), nextWeekend: date.format(schedule.nextWeekend),
      hourCountdown: remaining(schedule.nextHour - now), weekendCountdown: remaining(schedule.nextWeekend - now),
      weekendChange: schedule.weekend ? "Ends" : "Starts",
      playerXp: schedule.playerXp + "×", petXp: schedule.petXp + "×"
    };
    for (const field of fields) {
      const next = values[field.dataset.eventValue];
      if (next !== undefined && field.textContent !== next) field.textContent = next;
      if (field.hasAttribute("data-weekend-status")) {
        field.classList.toggle("is-active", schedule.weekend);
      }
    }
    updateForecast(schedule.nextHour);
  }
  update();
  window.setInterval(update, 1000);
  window.addEventListener("pageshow", update);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) update();
  });
})();
