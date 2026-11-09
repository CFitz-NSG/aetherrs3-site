"use strict";

(() => {
  const articles = window.aetherWikiArticles;
  const bosses = [
    ["kbd", "King Black Dragon", "Prepare for several kinds of dragonfire, including poison, freezing and stat drain.", "Use the King Black Dragon destination in the Atlas and follow the lair entrance. Equip dragonfire protection and bring food and an antipoison.",
      ["Keep your dragonfire protection active before committing to the fight.", "The poisonous, freezing and shocking breaths have separate effects. Keep room to heal if movement is interrupted, and watch for reduced stats.", "Collect your drops before leaving the lair."], 50],
    ["chaos", "Chaos Elemental", "Prepare for equipment removal and displacement in the Wilderness.", "Reach the Chaos Elemental in the deep Wilderness. Take only equipment you are prepared to risk and check your route out.",
      ["The Chaos Elemental can send equipped items to free backpack slots. Check your weapon and armour after its special.", "It can teleport you to a nearby tile. Recheck where you landed and move back only when it is safe.", "Bring healing for its mixed damage and check the area before collecting drops."], 3200],
    ["jad", "TzTok-Jad", "Use the attack animation to switch protection while handling the healers.", "Reach the final wave of the Fight Cave. Practise switching ranged and magic protection before Jad spawns.",
      ["Watch for the quick front-leg stomp for ranged, and the slower raised posture for magic. Switch before the hit resolves.", "Draw the healers away or defeat them while continuing to read the next attack.", "Finish Jad and leave the cave through its completion sequence."], 15208],
    ["graardor", "General Graardor", "Prepare for melee pressure and Graardor’s ranged attack while his bodyguards stay active.", "Reach Bandos’ Stronghold through the God Wars Dungeon. The stronghold gate requires level 70 Strength. Check your Bandos kill count at the boss door.",
      ["Prioritize protection against the damage you are taking most often. Graardor uses melee and a separate ranged attack.", "Keep the bodyguards in view so you can clear them or leave without being pinned after the kill.", "Claim the ground drops before the next spawn."], 6260],
    ["kree", "Kree’arra", "Use a ranged or magic loadout and plan for airborne attacks.", "Cross the Armadyl chasm with 70 Ranged. Bring the equipment needed for the grapple and check your Armadyl kill count before the boss door.",
      ["Choose an attack style that can reach the airborne boss.", "Prepare for ranged and magic pressure. Keep a clear route around the room and watch your Prayer while the bodyguards are active.", "Check the loot before deciding whether to clear the bodyguards and stay."], 6222],
    ["zilyana", "Commander Zilyana", "Make space from the commander and track the melee and magic attacks.", "Use the Saradomin access route and its level 70 Agility obstacles. Check the faction kill count before entering.",
      ["Zilyana uses fast melee attacks in reach and a separate magic attack.", "Keep moving where your combat setup lets you attack safely, and heal before the commander closes the distance.", "Handle the bodyguards before starting another kill if they are still threatening you."], 6247],
    ["kril", "K’ril Tsutsaroth", "Bring antipoison and enough supplies to handle his Prayer-draining attack.", "Cross into Zamorak’s Fortress with level 70 Constitution. Check Zamorak kill count at the boss door.",
      ["Watch for melee and magic pressure.", "Keep a Prayer restore ready. K’ril’s special can drain Prayer when it punishes melee protection.", "Treat poison and watch the bodyguards when collecting loot."], 6203],
    ["nex", "Nex", "Advance through Smoke, Shadow, Blood, Ice and Zaros while watching the active mage.", "Use the Ancient Prison route in God Wars. Prepare the Frozen key for entry and check the current kill-count requirement before committing.",
      ["Finish the active mage when Nex calls for it. The phase does not advance just because she has reached her current HP threshold.", "Move away from the marked shadows. Stop feeding the Blood siphon with attacks and react to the sacrifice message.", "Watch for the Ice prison and nearby ice attacks. Keep healing available for Zaros and collect rewards after the finish."], 13447],
    ["corp", "Corporeal Beast", "A melee spear avoids the encounter’s normal half-damage rule for player attacks.", "Enter the Corporeal Beast cave or create an instance at its entrance. Bring a melee spear, food and restores.",
      ["Other player combat hits are halved. Keep an eye on which weapon is credited on your attacks.", "Spread out from damaging magic and be prepared for Prayer or skill drains.", "Move away from the dark energy core or deal with it promptly. Collect drops after Corporeal Beast dies."], 8133],
    ["kq", "Kalphite Queen", "Complete both forms and switch combat styles when the armour changes.", "Reach the Kalphite lair and follow its entrance route. Bring supplies for both forms and a second attack style.",
      ["Use melee against the first form, which blocks ranged and magic hits in this encounter.", "Switch to ranged or magic for the second form, which blocks melee.", "Protection Prayers help with incoming attacks. The encounter awards loot after the second form."], 1158],
    ["dks", "Dagannoth Kings", "Bring multiple combat styles and keep the three kings from piling onto you.", "Follow the Waterbirth Island dungeon route or use the entrance options for the kings.",
      ["Use melee against the ranged Supreme, ranged against the magic Prime, and magic against the melee Rex.", "Plan your first target and maintain the matching protection as more kings enter combat.", "Pick up each king’s drops and check your supplies before the next spawn."], 2881],
    ["qbd", "Queen Black Dragon", "Earn each phase, activate its artefact, and claim the finished chest.", "Use the Queen Black Dragon Atlas entry. The local portal requires level 60 Summoning.",
      ["Bring dragonfire protection and food. Move through safe openings in the fire walls.", "When a phase is defeated, activate its artefact to advance. Do this for each of the four phases.", "Watch for tortured souls and stronger late-phase attacks. Open the reward chest after completing the final phase."]],
    ["mole", "Giant Mole", "Follow the mole between chambers and react to the rocks and unstable ground.", "Use the Giant Mole entrance in Falador Park and pick the mode offered by the entrance.",
      ["Follow it through the chamber passages. Respond to the next warning before chasing damage.", "Move clear of unstable ground. Use Freedom where available, or move away when rocks are announced.", "Deal with summoned moles when they disrupt your attacks. Check the reward interface after finishing the encounter."], 3340],
    ["oracle", "Oracle of Darkness", "A custom four-phase encounter that reuses three TokHaar models.", "Use the custom Oracle of Darkness instance route. Bring food and protection for melee, ranged and magic.",
      ["The first phase uses melee. Expect ranged attacks after the first transformation and magic in the last two phases.", "The Oracle speeds up as its current health falls and can return part of incoming damage. Heal early and clear spawned minions.", "Finish all four phases for the custom reward table. Coloured whips and staves belong to this encounter’s reward pool."], 15186],
    ["exiled-kq", "Exiled Kalphite Queen", "Prepare two styles for the same armour change in the Exiled lair.", "Use the Exiled Kalphite Queen route in the Kalphite area. Bring a melee setup and a ranged or magic setup.",
      ["Use melee against the first form. Ranged, magic and familiar hits are blocked there.", "Switch when the Queen changes form. Melee stops working on the second form.", "Collect after the final form. The first form is a phase, so wait for the complete kill."], 16707],
    ["kk", "Kalphite King", "Watch the King’s current form, movement specials and control effects.", "Use the Kalphite King Atlas route and create or join an instance. Bring protection for more than one combat style.",
      ["Read the attack form when the King changes colour. Reposition when he commits to a charge.", "Keep food available for control effects and follow-up damage. Stuns can work, but he can break out of a stun or bind.", "Wait for the actual defeat and claim the drops before leaving the instance."], 16697],
    ["lucien", "Lucien", "Fight the custom encounter for a separate magic-oriented reward pool.", "Use the Lucien custom instance route. Bring combat supplies and check the encounter prompts when you arrive.",
      ["Keep space for movement and enough food for a sustained fight.", "Handle the current attack and clear remaining threats before collecting.", "The custom table includes rune supplies, magic equipment and separate rare entries. Use the linked table for the configured values."], 14256],
    ["max", "Max the Maxed", "React to a three-style opponent who changes equipment and uses protection prayers.", "Use the Max the Maxed custom instance route. Bring more than one attack style if you can switch safely.",
      ["Watch Max’s visible equipment and prayer. Switch your damage style when the current prayer is reducing your attacks.", "Prepare for a committed three-style combo followed by recovery. He also eats and can use Vengeance.", "Finish the encounter to access its own supply and equipment table."], 15976],
    ["karmathulu", "Karmathulu", "A custom squid fight with three styles, a marked surge and a faster final quarter.", "Use the Karmathulu custom instance route. The encounter has 60,000 HP. Bring food and room to move.",
      ["React to the current style. Its melee opener can switch to magic if you are out of reach.", "When the chat says a surge is gathering beneath your feet, move at least two squares from the marked tile before it lands.", "Keep your healing ready as attacks speed up in the final quarter. Check the custom table for rewards."], 30045],
  ];
  const activities = [
    ["barrows", "Barrows", "Plan your crypt order and open the tunnel chest after defeating brothers.", "Travel to the Barrows mounds. Bring Prayer restores, food, a spade and a way out. The original Barrows run is separate from Rise of the Six.",
      ["Dig on each mound, open the sarcophagus and defeat its brother. A hidden brother identifies the tunnel route.", "Enter the tunnel when ready. Keep track of the remaining brother and reach the centre chest through the tunnel doors.", "Open the chest after your kills. In the custom alpha rewards, equipment can come only from brothers you defeated. Extra tunnel creatures contribute up to a cap."]],
    ["plunder", "Pyramid Plunder", "Use the active entrance, pass each spear trap and loot before the timer ends.", "Try the outside doors of the pyramid in Sophanem to reach the Guardian mummy. Start the minigame through his menu. The first room requires 21 Thieving, and each later room adds 10 levels.",
      ["Pass the spear trap before searching that room. Check or charm snakes where appropriate, then search the urns you have time for.", "Pick locks to find the next room. Aim to reach the highest room you can handle instead of spending the whole timer in the first one.", "Opening the chest or sarcophagus can bring out a hazard. Leave room for treasure and use an exit before the timer runs out."]],
    ["pest", "Pest Control", "Protect the Void Knight and destroy the four portals while earning enough zeal.", "Board the matching Void Knight outpost boat. Novice requires combat 40, Intermediate 70 and Veteran 100.",
      ["Keep the Void Knight alive and contribute damage. Watch the portal shields and attack a portal when it opens.", "Clear enemies threatening the knight and stop Spinners from repairing the portals.", "Finish all four portals with the knight alive and at least 5,000 zeal. The double-minigame event can multiply the commendations."]],
    ["dominion", "Dominion Tower", "Pick a restored challenge, finish the run and claim from the reward chest.", "Visit the Dominion Tower and open its challenge interface. Climber, Endurance and the supported Specials have different unlocks and objectives.",
      ["In Climber, check the offered handicap before the next floor. In Endurance, prepare for consecutive fights.", "In Specials, read the individual objective. Some fights supply their own gear or impose a mode restriction.", "Claim earned rewards from the Tower chest before starting another run when the interface asks. The scheduled minigame bonus can double Dominion Factor."]],
    ["caves", "TzHaar Fight Cave", "Work through the waves and use Jad’s attack cues to switch protection.", "Enter the Fight Cave in the TzHaar city. Pack food, Prayer restoration and a ranged setup if you plan to fight from a distance.",
      ["Use obstacles to separate enemies and replenish Prayer between waves. Logging out before the wave ends can make you repeat it.", "At Jad, change between ranged and magic protection using the attack animations. Draw the healers off him without losing track of his next attack.", "Finish Jad to earn the completion rewards. Exiting or dying before the finish gives a partial run."]],
    ["kiln", "Fight Kiln", "Handle waves, save crystals for difficult sections and finish Har-Aken.", "Speak to the entrance NPC and follow the admission dialogue. Bring supplies and equipment for a long fight.",
      ["Use the arena to split up attackers. Save helpful crystals for waves where their effect matters.", "Pay attention to your Prayer during Jad waves and keep enough healing for the final wave.", "On wave 37, wait for Har-Aken to surface and attack the head when it is available. Claim the completion reward after defeating it."]],
    ["castle-wars", "Castle Wars", "Capture the opposing flag and defend your own before the timer runs out.", "Use a team portal in the Castle Wars lobby and wait for a match. Bring gear for either defending or carrying the flag.",
      ["Reach the opposing flag stand, then bring the flag back to score.", "Defend your carrier and recover your own flag when the opposing team drops it.", "Check the scoreboard when the timer ends. Spend earned tickets at the Castle Wars reward shop."]],
  ];
  for (const [entries, prefix, category, entryTitle, finishTitle] of [
    [bosses, "boss", "Boss guides", "Getting to the fight", "Fight and claim rewards"],
    [activities, "activity", "Minigame guides", "Getting started", "Play and claim rewards"],
  ]) {
    for (const [slug, title, summary, entry, steps, npc] of entries) {
      const hasTable = npc && window.aetherWikiData.monsters.some(row => row.id === npc);
      articles.push({
        id: prefix + "-" + slug, title, summary, category, image: "prifddinas-gameplay.webp",
        custom: ["oracle", "lucien", "max", "karmathulu"].includes(slug),
        sections: [
          { title: entryTitle, text: entry },
          { title: finishTitle, list: steps, ordered: true },
          { title: "More references", links: [["support", "Report an issue"]],
            external: hasTable ? [["wiki.html?view=monsters&npc=" + npc, "View the configured drop table"]] : [] }
        ]
      });
    }
  }
  articles.push(
    {
      id: "client-troubleshooting", category: "Player help", title: "Troubleshoot the AetherRS3 client", image: "mode-selection.webp",
      summary: "Work out whether an issue starts in the launcher, the lobby, or after joining the world.",
      sections: [
        { title: "Launcher or cache loading", list: [
          "Start with the launcher linked on this site and let Update and play finish. The Windows launcher uses 64-bit Java 8.",
          "On a first visit to an area, wait for the client to finish loading before comparing movement or reconnect times.",
          "If the update fails, copy the displayed error and note your launcher version. Keep your saves and cache in place while diagnosing."
        ], ordered: true, external: [["index.html#play", "Open the download instructions"]] },
        { title: "Lobby, Play Now or disconnect", text: "Record the last stage that worked. If the lobby loads but Play Now returns you to login, report the exact message and whether a normal reconnect reproduces it. If movement alone is delayed, compare it with turning the camera while standing still." },
        { title: "Interface or keyboard issue", text: "Close large panels, leave the chat entry idle and try again. If Area Loot reports a client mismatch, relaunch through Update and play. Include the interface name, exact error, combat layout and the action immediately before it.",
          links: [["area-loot", "Area Loot guide"]], external: [["help.html#report", "Copy the bug report template"]] },
        { title: "Isolate graphics or audio", links: [["graphics-settings", "Graphics settings"], ["music-audio", "Music and audio"]] },
      ]
    }, {
      id: "graphics-settings", category: "Player help", title: "Graphics settings and performance", image: "prifddinas-gameplay.webp",
      summary: "Use the client’s graphics options to distinguish a rendering issue from loading or input delay.",
      sections: [
        { title: "Get a baseline", text: "Open Settings and find the graphics controls. Note your current renderer, display mode and preset. Once the area has loaded, turn the camera in place and try walking a short route." },
        { title: "Reduce one thing at a time", list: [
          "Start with a lower preset or turn down shadows, scenery detail and anti-aliasing where the client offers those controls.",
          "Test the same area after each change. Use a smaller window if full-screen rendering is slow.",
          "If one renderer produces a black screen, try another renderer offered by your client. For a persistent startup failure, include your Java version and renderer in the report."
        ], ordered: true },
        { title: "Separate graphics from loading", text: "A smooth camera with delayed clicks can point to loading, routing or a connection issue. If the whole view stutters even when standing still, report the graphics settings and area.", links: [["client-troubleshooting", "Client troubleshooting"]] }
      ]
    }, {
      id: "music-audio", category: "Player help", title: "Music player and custom soundtrack", image: "harmony-gameplay.webp",
      summary: "Choose a track, adjust music volume and identify whether silent playback affects custom tracks or all game audio.",
      sections: [
        { title: "Play an available track", text: "Open the Music Player in game and select a track from the list. Use the Music volume slider under audio settings. Effects and ambient sound use separate controls." },
        { title: "Check silent playback", list: [
          "Raise the game’s Music slider and check the Windows volume mixer and selected output device.",
          "Try a custom track from the Music Player. If it is silent but ordinary game music plays, note the track name and update through the AetherRS3 launcher.",
          "If it still happens, tell staff whether the login music is also silent and which client build you used."
        ], ordered: true },
        { title: "Suggest a track", external: [["music.html#suggest-track", "Open Music suggestions"]] }
      ]
    }
  );
})();
