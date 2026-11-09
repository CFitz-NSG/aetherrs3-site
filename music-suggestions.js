"use strict";

(() => {
  const input = document.querySelector("#music-link");
  const title = document.querySelector("#music-title");
  const context = document.querySelector("#music-context");
  const draft = document.querySelector("#music-draft");
  const copy = document.querySelector("#copy-music-suggestion");
  const status = document.querySelector("#music-suggestion-status");
  const youtube = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com"]);

  function videoId(value) {
    try {
      const url = new URL(value.trim());
      if (url.protocol !== "https:" || url.username || url.password || url.port) return "";
      const path = url.pathname.split("/").filter(Boolean);
      let id;
      if (url.hostname === "youtu.be" && path.length === 1) id = path[0];
      else if (youtube.has(url.hostname)) {
        if (url.pathname === "/watch") id = url.searchParams.get("v");
        else if (path.length === 2 && ["shorts", "live"].includes(path[0])) id = path[1];
      }
      return /^[\w-]{11}$/.test(id || "") ? id : "";
    } catch {
      return "";
    }
  }

  document.querySelector("#prepare-music-suggestion").addEventListener("click", () => {
    const id = videoId(input.value);
    input.setAttribute("aria-invalid", String(!id));
    if (!id) {
      status.textContent = "Enter a valid HTTPS YouTube link to an individual video.";
      input.focus();
      return;
    }
    draft.value = ["AetherRS3 music suggestion", "https://www.youtube.com/watch?v=" + id,
      title.value.trim() && "Track and artist: " + title.value.trim(),
      context.value.trim() && "Where it fits: " + context.value.trim()].filter(Boolean).join("\n");
    copy.disabled = false;
    status.textContent = "Suggestion ready. Copy it and post it in Discord for review.";
  });

  for (const field of [input, title, context]) {
    field.addEventListener("input", () => {
      draft.value = "";
      copy.disabled = true;
      input.removeAttribute("aria-invalid");
      status.textContent = "";
    });
  }

  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(draft.value);
      status.textContent = "Copied. Paste your suggestion in Discord.";
    } catch {
      draft.focus();
      draft.select();
      status.textContent = "Clipboard access is unavailable. Copy the selected text, then paste it in Discord.";
    }
  });
})();
