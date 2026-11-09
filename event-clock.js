"use strict";

// Mirrors GlobalEvents.at and Java SplittableRandom.nextInt(7).
(() => {
  const hourMs = 3600000;
  const dayMs = 24 * hourMs;
  const names = [
    "Quiet hour", "No God Wars or Nex kill count", "Double charm drops", "Double player XP",
    "Chance to double eligible loot", "Double minigame rewards", "Double pet XP"
  ];
  const descriptions = [
    "The hourly rotation is taking a break. Other eligible bonuses can still apply.",
    "Enter eligible God Wars and Nex areas without the normal kill-count gate.",
    "Eligible standard Summoning charm drops are doubled.",
    "Eligible player XP is doubled and can stack with the weekend bonus.",
    "An eligible rolled loot stack has a 10% chance to double.",
    "Earn double Pest Control commendations and Dominion Factor.",
    "Eligible companion training and recorded boss XP are doubled."
  ];
  const newYork = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
  });
  const asLong = value => BigInt.asUintN(64, value);

  function localComponentsAsUtc(instant) {
    const parts = Object.fromEntries(newYork.formatToParts(instant).filter(part => part.type !== "literal").map(part => [part.type, Number(part.value)]));
    return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  }

  function newYorkWallTime(wallTime) {
    let instant = wallTime;
    for (let attempt = 0; attempt < 3; attempt++) {
      const difference = wallTime - localComponentsAsUtc(instant);
      if (!difference) break;
      instant += difference;
    }
    return instant;
  }

  function eventForHour(hourIndex) {
    let seed = BigInt(hourIndex) ^ 0x529b781a2f0df479n;
    for (;;) {
      seed = asLong(seed + 0x9e3779b97f4a7c15n);
      let mixed = asLong((seed ^ (seed >> 33n)) * 0x62a9d9ed799705f5n);
      mixed = asLong((mixed ^ (mixed >> 28n)) * 0xcb24d0a5c88c35b3n);
      const bits = Number(mixed >> 32n) >>> 1;
      const index = bits % names.length;
      if (((bits + names.length - 1 - index) | 0) >= 0) return index;
    }
  }

  function at(now = Date.now()) {
    const localDate = new Date(localComponentsAsUtc(now));
    const localMidnight = Date.UTC(localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate());
    const friday = localMidnight - ((localDate.getUTCDay() + 2) % 7) * dayMs;
    const start = newYorkWallTime(friday + 60000);
    const end = newYorkWallTime(friday + 2 * dayMs + 23 * hourMs + 59 * 60000);
    const weekend = now >= start && now < end;
    const nextWeekend = weekend ? end : now < start ? start : newYorkWallTime(friday + 7 * dayMs + 60000);
    const hour = Math.floor(now / hourMs);
    const event = eventForHour(hour);
    return { event, name: names[event], description: descriptions[event], weekend, nextWeekend, nextHour: (hour + 1) * hourMs,
      playerXp: (weekend ? 2 : 1) * (event === 3 ? 2 : 1), petXp: event === 6 ? 2 : 1 };
  }

  const api = Object.freeze({ at });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else window.aetherEventClock = api;
})();
