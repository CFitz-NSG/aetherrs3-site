"use strict";
window.aetherWikiArticles = [
  {
    id: "first-steps", title: "Your first hour in AetherRS3", category: "Getting started", image: "harmony-gameplay.webp",
    summary: "Choose your difficulty, find Harmony, meet your companion and learn the shortcuts you will use every day.",
    sections: [
      { title: "Choose the journey you want", text: "Difficulty and combat style are separate choices. Easy, Normal, Hard, Expert and Extreme control progression rates. Regular combat gives you abilities. Legacy gives you an auto-attack combat style. Pick the experience you enjoy, then use the in-game mode information to check your current settings." },
      { title: "Make Harmony your base", text: "Harmony is the Home island. Use Ctrl+H to return, or ;;home when command travel is permitted. Safe time on the public Home surface restores HP, Prayer, Summoning, run energy and your mode's combat resource. Combat and activity restrictions still apply." },
      { title: "Start with your companion", text: "Press Ctrl+S to open Companions. Choose a pet you own and call it. An owned pet in storage earns no progression XP. You can keep a progression pet alongside a Summoning familiar, so choosing a companion does not replace your pack yak.", links: [["pet-training", "Read the complete companion guide"]] },
      { title: "Keep these shortcuts close", list: ["Ctrl+S opens Companions.", "Ctrl+H requests Home travel.", "T opens the Atlas travel interface.", ";;commands opens the command reference.", ";;ref nsg is the referral command highlighted by the new-player introduction.", "Hold either Shift key and left-click a backpack item to use its normal Drop operation."],
        external: [["help.html#shortcuts", "Browse all shortcuts and player commands"]] },
      { title: "Before your first boss", text: "Check the requirements on the destination, equip an appropriate style, bring finite food and potions, and understand the encounter's movement mechanics. A solo version can still require a full encounter and an earned exit. Start with the custom boss notes below.", links: [["solo-rots", "Rise of the Six"], ["solo-vorago", "Vorago"], ["solo-araxxor", "Araxxor"]] }
    ]
  },
  {
    id: "game-modes", title: "Difficulty, account type and combat style", category: "Getting started", image: "mode-selection.webp",
    summary: "Understand which choice changes XP, which controls account restrictions, and where Legacy fits in.",
    sections: [
      { title: "Five progression difficulties", text: "The current selection screen offers Easy at 50× XP, Normal at 25×, Hard at 10×, Expert at 5× and Extreme at 1×. The displayed difficulty drop bonuses are 0%, 2%, 5%, 7% and 10% respectively. Combat and skilling use the same selected difficulty rate." },
      { title: "Three account types", text: "Regular accounts have normal trading. Ironman accounts are self-sufficient and show a 10% account-type drop bonus in the selection screen. Hardcore Ironman shows 25% and has its own dangerous-life rules. Account-type and difficulty drop bonuses add together. Read the confirmation carefully because the chosen account type and difficulty are permanent." },
      { title: "Abilities or Legacy", text: "New-player setup also offers Regular combat with abilities or Legacy combat. This is a combat preference, separate from the progression difficulty. An Extreme character can use abilities, and an Easy character can use Legacy." },
      { title: "Your pet has its own progress", text: "Companion XP uses mode-neutral eligible player awards. A faster player XP difficulty does not give its pet an equivalent difficulty multiplier. Each owned pet keeps its own XP, levels, build and prestige.", links: [["pet-training", "How pet XP works"]] }
    ]
  },
  {
    id: "pet-training", title: "Companions from level 1 to prestige 10", category: "Companions", image: "companion-tree.webp",
    summary: "Following, individual XP, 99 levels, skill points, signatures, prestige and hybrid builds explained together.",
    sections: [
      { title: "One pet, one history", text: "Every supported pet family has an independent progression record. Switching pets lets you train a different companion. You keep the previous pet's progress. Pet ownership is still required before calling or upgrading that companion." },
      { title: "The pet must be following", text: "A pet earns XP and supplies its perks only while it is the current eligible follower. Storage, dismissal, restricted activities and invalid travel contexts pause those benefits. A portrait in the journal is not proof that the pet is currently earning XP." },
      { title: "Earn XP through real play", text: "The base skill-training share is 10% of eligible mode-neutral player XP. Genuine recorded boss kills add a base 500 pet XP. Trained learning perks, the individual signature and a double-pet-XP hourly event can modify eligible awards. Repeated viewing of an existing kill count does not generate new boss credit." },
      { title: "Level 99 and the point budget", text: "Level 99 is reached at 3,800,318 pet XP and grants 98 level-earned talent points. A full Foundation plus Mastery branch costs 47 points. That allows two complete branches, with room for the three-point signature. Level requirements and prerequisite ranks still apply to individual purchases." },
      { title: "Build hybrids", text: "Applicable trained passives work together while the pet follows you. You do not activate a branch heading to enable its bonuses. Choose the pet's attack style separately in My Pet. This lets a combat style work alongside Gathering, Artisan, Support or another trained branch." },
      { title: "Prestige at the XP cap", text: "After level 99, keep training to 15,000,000 pet XP. Prestige returns that pet to level 1, clears its ordinary talents, and adds 10 permanent talent points plus one Ascension point. The maximum is prestige 10. Your Ascension path remains through prestige. Nothing prestiges automatically." },
      { title: "Read the tree before buying", text: "Selecting a talent shows its effect in the bottom panel. Expanded comparison is available for a closer look. The informational tour advances through highlighted clicks without requiring real kills, XP, purchases or deployment.", links: [["pet-talents", "Browse every talent"], ["pet-ascension", "Explore Ascension"], ["pet-resets", "Compare reset choices"]] }
    ]
  },
  {
    id: "pet-talents", title: "Foundation, Mastery and every talent", category: "Companions", image: "companion-mastery.webp",
    summary: "A complete reference for all 12 branches, rank costs, level gates, effects and prerequisites.",
    sections: [
      { title: "Read a branch from top to bottom", text: "Foundation contains five talents in each branch. Mastery adds another five. A Mastery entrance requires the complete Foundation branch, and later nodes require their listed parent rank. The full effect wording, cost per rank and pet level requirement are available in the reference below." },
      { title: "Twelve ways to combine a build", list: ["Skilling, Gathering and Artisan improve supported resource and production actions.", "Melee, Ranged, Magic and Necromancy train the companion's own attack styles.", "Support and Scholar improve pet learning or eligible protection.", "Explorer covers the listed exploration skills.", "Predator adds conditional pet offense.", "Sentinel adds conditional protection against styled NPC damage."] },
      { title: "Effects have conditions", text: "A range condition, Vulnerability requirement, current Residual Soul count, health threshold or proximity rule must actually be satisfied. Pet damage bonuses apply to the companion's attacks. They are not a universal increase to the owner's damage. Combined pet protection is capped at 15% and does not become PvP or environmental protection." }
    ], reference: "talents"
  },
  {
    id: "pet-signatures", title: "Every pet and its signature", category: "Companions", image: "companion-tree.webp",
    summary: "Search the complete supported collection and compare the unique perk assigned to each pet family.",
    sections: [
      { title: "A personal perk for each companion", text: "The signature costs three ordinary talent points and requires pet level 20. Each pet's exact bonuses are listed below. Signatures work only while their companion is following and eligible. Picking a different pet changes the signature available to that pet's build." },
      { title: "Ownership and acquisition", text: "Cosmetic pets use the existing Hero → Pets purchase route, with documented boss pet rolls listed where the game provides them. Item-based pets require their original owned pet item. An entry with an undocumented acquisition route is labelled honestly. This directory does not grant or unlock pets." }
    ], reference: "pets"
  },
  {
    id: "pet-ascension", title: "Ascension and automatic ultimates", category: "Companions", image: "companion-mastery.webp",
    summary: "One permanent direction at a time, ten ranks, eighteen choices and clear automation limits.",
    sections: [
      { title: "Choose one path", text: "Ascension unlocks after the first prestige. Each prestige grants one Ascension point, up to ten. You choose one path and invest one point per rank. The chosen effect triggers automatically when its conditions are met." },
      { title: "A separate commitment", text: "The Ascension path remains through ordinary build resets and prestige. Changing it costs either five Aether tokens or 2 billion GP. Resetting refunds the same earned Ascension points. It does not award new prestige." },
      { title: "Loot paths have a switch", text: "Auto-note, Auto-pickup, Auto-bank, Charming Imp, Bonecrusher and Herbicide are toggleable. All eligible item kinds can qualify while enabled, with at most one eligible rolled stack per rank per ordinary kill. Bonecrusher and Herbicide consume the qualifying items for their supported XP rewards." },
      { title: "Where loot automation works", text: "These paths handle individually awarded ordinary NPC drops while the trained pet follows. PvP, controlled activities and boss-instance drop batches are excluded by the current handler. They do not automatically claim a boss chest. Ownership, item eligibility and available inventory or bank capacity remain relevant." }
    ], reference: "ascensions"
  },
  {
    id: "pet-resets", title: "Resetting, nicknames and your journal", category: "Companions", image: "companion-tree.webp",
    summary: "Keep the progress you intend to keep and know exactly what each reset changes.",
    sections: [
      { title: "Paid build resets", text: "Reset this pet's ordinary build for 50 million GP or 100,000 NSG tokens. These choices refund its ordinary spent points while retaining level, XP and prestige. NSG tokens are distinct from Aether tokens." },
      { title: "Free retraining", text: "The free option returns this pet to level 1 and removes its XP and ordinary talents. Existing prestige and its permanent bonus points remain. This is not a new prestige and gives no new prestige reward." },
      { title: "Names you can recognise", text: "Use Name in the Companion Journal to set a nickname. The owned-pet list and following pet use that name. The owner right-click menu includes its progression level, and examining your pet gives its level and current XP. Reset Name is a direct control near the naming controls." },
      { title: "Useful journal pages", text: "My Pet shows level, points, XP, prestige and attack style. Collection keeps the pet catalogue searchable. Activity includes actual combat receipts and existing hunt progress where it is known. Nicknames and favourites help organise the collection without changing a pet's original identity or signature." }
    ]
  },
  {
    id: "pet-combat", title: "Pet combat and skilling in practice", category: "Companions", image: "skilling-gameplay.webp",
    summary: "Attack style selection, familiar coexistence and the supported gathering and production benefits.",
    sections: [
      { title: "Choose the pet's attack style", text: "Train the first talent in a combat branch to unlock that style. Choose Melee, Ranged, Magic, Necromancy or No attacks in My Pet. If an older build has no explicit selection, the pet defaults to its highest-investment trained combat branch." },
      { title: "The companion makes its own attacks", text: "The companion targets the NPC you are actively fighting and uses its own supported attack path. Its base cadence is four game ticks. Accuracy rolls against the target's NPC defence, and accepted damage is recorded. Pets are not extra player accounts and do not act as unrestricted tanks or PvP attackers." },
      { title: "Gathering and production", text: "Supported ordinary Mining, Woodcutting, Fishing and Farming actions can benefit from double hauls, noting, banking and bait-saving effects. Supported Smithing, Herblore and Fletching recipes can double output or save specified materials. Each talent's wording identifies its supported action or resource. Owning a perk does not make every recipe eligible." },
      { title: "Keep your familiar", text: "A progression pet can accompany a Summoning familiar. A pack yak keeps its original finite stock, pouch cost and Summoning rules. The pet skill system does not refill its storage. Pet followers resume after ordinary death and do not block NPC movement." }
    ]
  },
  {
    id: "solo-rots", title: "Rise of the Six — the custom solo encounter", category: "Boss guides", image: "rots-gameplay.webp", custom: true,
    summary: "The opening shadow trial, six full-health brothers, revivals, chest and earned energy escape.",
    sections: [
      { title: "Enter and prepare", text: "Search Rise of the Six in the Atlas. Jump into the well and disrupt the portal inside to enter AetherRS3's custom solo encounter. Entry is free and uses no Barrows totem. Pack food and potions and set up any allowed familiar supplies before the first attack. All six brothers start at 50,000 HP." },
      { title: "Lead all six across their shadow markers", text: "Your first attack starts the mandatory opening trial. Read the chat assignments and lead each brother across his own marker. Each actual crossing earns progress and removes its arrow. Plan your route past the western and eastern markers in the south, middle and north of the chamber.",
        list: ["Move past the assigned square so the brother following you has a reason to cross it.", "Use permitted food from your backpack. Prayer changes, familiar commands and beast-of-burden transfers are restricted here.", "After the sixth crossing, let the return complete. Combat starts when you and all six brothers are back in the arena."] },
      { title: "Read the melee specials", list: [
        "Dharok absorbs incoming damage during his charge. Stop attacking him until the charge ends. As his life points fall, his attacks can hit harder.",
        "When Guthan's spear wounds you, move next to Guthan to remove it. You can still eat.",
        "When Torag pins you, attack Torag to break his grip. In this solo version the break requires 3,000 accepted damage. Food still works.",
        "When Verac ties your soul, reach the marked tile to stop the Prayer drain.",
        "Run away from a spinning brother. When a leap marks a landing tile, move off it before he lands."
      ] },
      { title: "Leave the marked ground", text: "Ahrim and Karil use custom marked-ground attacks. Follow the chat cue and move clear before the ground activates. The markers provide a three-second warning.",
        list: ["Firehands marks a row and lightning marks a column. Leave the marked tiles.", "For the three-bomb pattern, leave all three marked tiles clear.", "Smoke marks five harmful clouds. The far-east cloud heals nearby living brothers, so draw the fight away from that side.", "Ahrim takes half magic damage during the airborne state. Change attack style if you can do so safely."] },
      { title: "Finish the brothers close together", text: "Each disable heals surviving brothers by up to 5,000 and starts or refreshes a shared 50-tick revival timer. A brother still down when it expires revives at 25,000 HP. Bring the group low together, allowing for the heals, then finish each target while the timer is running. All six must be down at once." },
      { title: "Search the chest before escaping", text: "After the full victory, search the chest. Leave room for the entire roll, including one or two unstable malevolent energies. The chest awards combat XP and one boss record. A full backpack leaves the rolled reward available for a retry." },
      { title: "Follow the escape markers to the rope", text: "Claiming the chest starts the earned escape. Walk or run through the floor markers in order and climb the rope. Debris starts after 60 seconds, so move promptly and keep enough health to survive. Your unstable energy becomes stable after the completed rope exit. Abandoning the passage loses that unstable energy." }
    ]
  },
  {
    id: "solo-vorago", title: "Vorago — movement, relics and the solo finish", category: "Boss guides", image: "vorago-gameplay.webp", custom: true,
    summary: "Understand the custom solo answers to bleed sharing and the final push without expecting a free phase skip.",
    sections: [
      { title: "Hear his history and accept the challenge", text: "Use the Atlas and enter Vorago's borehole. Talk to the head at the northern lobby approach. Hear his full history before accepting the challenge and stay near him during the 20-second preparation. Solo entry costs no life points. Groups share 50,000 entry damage. Leave room for the weapon pieces." },
      { title: "Phase 1 · The wall, ledge and first piece", text: "Once the fight starts, get Vorago's attention. Use Squeeze past on the opening approach gap to reach the western wall. Climb the wall, follow the ledge to the northern gap and jump onto his back. Pick up the weapon piece on the ground. In solo, Vorago can target you during the jump. In a group, a different fighter must hold his attention. Take him down to 1 HP with the piece held to advance." },
      { title: "Phase 2 · Bleeds, reflection and two pulls", text: "When Vorago warns of five bleeding pulses, move at least two squares between each pulse. A still player can take a 6,000 hit per pulse. In Regular, active Freedom can cover pulses. In Legacy, use movement.",
        list: ["Stop attacking when the reflection message appears. Resume once reflection has ended.", "When he stumbles, move close and repeatedly click him. The solo pull requires 25 distinct click ticks. Let the next cycle play out and complete the second pull.", "Collect the second weapon piece and finish reducing this phase to 1 HP."] },
      { title: "Phase 3 · The weekly mechanic", text: "Read the rotation announced at the start of the phase. Scopulus advances by defeating both adds. For the other rotations, damage Vorago while handling the active hazard.",
        list: ["Ceiling collapse. Leave the position marked under the targeted fighter.", "Vitalis. Stand near the orb to suppress emerging Vitali and be ready to take its burst.", "Green bomb. Move away from the marked position.", "Team split. Move to the announced east or west side.", "The End. Move away from the side of Vorago named in the warning."] },
      { title: "Phase 4 · The south-west waterfall", text: "Move into the marked south-west waterfall shelter before each blast. Handle any spawned minion between warnings. After three waterfall blasts, pick up the final piece. Finish the phase with the third piece held and Vorago at 1 HP." },
      { title: "Phase 5 · Two pushes and two maul strikes", text: "Use Combine on a piece from this fight to assemble the Maul of Omens. Every 5,000 accepted damage pushes Vorago one step in solo. Taking damage can push him back. At eight steps, get beside him and use the maul. The first strike resets the push. Repeat the push and use the maul a second time to finish." },
      { title: "Take your loot and use the western rope", text: "Pick up the earned reward piles before climbing the rope at the western end. Practice is for learning the movement and phase objectives. Complete the normal fight for eligible loot and records.", external: [["wiki.html?view=monsters&npc=17182", "View Vorago's configured drop table"]] },
      { title: "If a gap does not work", text: "The approach gap leads to the wall. The northern gap is the jump from the ledge after climbing. Check that the challenge has started, and that Vorago has a valid target before attempting the jump. Record which gap you tried and the exact chat message if it still fails.", links: [["support", "Report an encounter issue"]] }
    ]
  },
  {
    id: "solo-araxxor", title: "Araxxor — paths, acid and surviving the web", category: "Boss guides", image: "araxxor-gameplay.webp",
    summary: "Read the three path objectives and carry unfinished-room consequences into the later phases.",
    sections: [
      { title: "Phase 1 · Burn a web and choose a route", text: "Search Araxxor in the Atlas. Enter the cave, cross the gap and use the webbed hive entrance. Two paths are available and one is closed by the rotation. Start burning the web for the path you want. The burn takes one minute. Use that time to fight and lower Araxxor's HP. Once the web is open, walk out through it to begin the path." },
      { title: "Counter the common specials", list: [
        "When Araxxor covers himself in webbing, stop attacking. The shield reflects damage. Wait until it clears before resuming.",
        "When he raises his legs for a cleave, get out of the area in front. In Regular combat, Anticipation or Freedom can prevent the initial pull.",
        "If caught in a cocoon, click repeatedly to struggle free. Wait for the release message before trying to move again."
      ] },
      { title: "Phase 2 · Minion path", text: "Kill 20 spiders in solo or 40 in duo to advance. Switch off Araxxor when a mirrorback appears because it reflects damage. Prioritize pulsing spiders because they heal him. Finish each wave so the next one can spawn." },
      { title: "Phase 2 · Acid path", text: "Lure Araxxor into the acid pool and keep him there long enough to absorb acid. Lead him straight to the eastern ramp to erode the ledge. Acid drains while he is away from the pool and ramp. Keep clear of approaching acidic spiders. When erosion reaches 50, use the broken ramp to jump down." },
      { title: "Phase 2 · Darkness path", text: "Stay near the light between charges. When the charge is announced, move at least three squares from the position where you were marked before it lands. A full dodge deals 50 damage to the wall. Two full dodges are enough to break it." },
      { title: "Phase 3 · Finish the healing budget", text: "Araxxor starts this phase at full HP and can heal based on the health left in earlier rooms. Fight through that healing and take him to 1 HP. The available paths determine which mechanics can appear, so keep looking for spiders, acidic threats and light warnings. Highly acidic spiders can heal and enrage Araxxor if they reach him." },
      { title: "Phase 4 · Araxxi and the putrid core", text: "Araxxi takes over at full HP. Watch her ranged and magic projectiles and react with the appropriate protection. Stay out of melee range where practical. In the last quarter of her health, move away from each old marked position as the putrid core bounces." },
      { title: "Search the corpse for saved rewards", text: "After a normal win, search Araxxi and choose Take or Bank. If your storage fills, any unclaimed items are saved. You can recover them from the cocooned corpse outside. The route you chose determines which spider-leg part can appear. Each eligible kill adds 20 enrage up to 300 for the current UTC day.",
        external: [["wiki.html?view=monsters&npc=19464", "View Araxxi's configured drop table"]], links: [["support", "Report an encounter issue"]] }
    ]
  },
  {
    id: "area-loot", title: "Area Loot — collect, filter and block", category: "Quality of life", image: "area-loot.webp",
    summary: "A live 10×10 ground-loot view with stacks, keyboard pickup, filters and your own block list.",
    sections: [
      { title: "Use the live window", text: "Open Area Loot through its in-game control. The Nearby view updates as eligible ground drops appear. It can stay open during combat, and you can move it by dragging the title bar. Close it with its close control or Esc." },
      { title: "A 10×10 ground scan", text: "The scan covers ten tiles on each axis, using five tiles on the lower side and four on the upper side of your current tile. This is the ground area being scanned. The window itself does not need a hundred item slots." },
      { title: "Stacked items and keyboard collection", text: "Matching item IDs appear as one stack with a total quantity. Press Space or click Loot All to collect the currently eligible visible loot. Right-click a stack for Take 1, Take 5, Take 10 or Take All. Inventory capacity and the normal pickup checks still apply." },
      { title: "Filter what you see", text: "Changing the active filter updates the visible grid and what Loot All collects. If an item appears to be missing, check the current filter as well as the block list." },
      { title: "Build a personal block list", text: "Right-click an item and choose Block to hide that item ID from Area Loot. Open the separate Block List tab to restore entries. Your block list is saved per character." },
      { title: "Your own drops and death", text: "Normal backpack drops appear when ownership, visibility, range and filter rules allow them. Area Loot is designed to reopen after ordinary death without requiring a relog. If you see a client mismatch, check that the launcher has finished installing the matching current client." }
    ]
  },
  {
    id: "everyday-qol", title: "The little things that change your session", category: "Quality of life", image: "harmony-gameplay.webp",
    summary: "Harmony restoration, Shift-drop, the Slayer tracker, banking and familiar quality of life.",
    sections: [
      { title: "Reset at Harmony", text: "On the public Home surface, safe players regenerate HP, Prayer, Summoning points, run energy and adrenaline or Legacy special energy. Leave combat and allow the normal Home tick to run before heading out again." },
      { title: "Backpack and action bar", text: "Hold either Shift key and left-click to use an item's existing Drop action. Food placed on the action bar uses the normal eating action through a click or its keybind. Normal cooldown and item availability checks remain." },
      { title: "Keep a tidy bank", text: "Move items into your chosen bank tabs and deposit while a tab is selected to keep that organisation. Tab assignments persist when the bank is reopened. Use ordinary bank controls for moving, withdrawing and depositing." },
      { title: "A readable Slayer tracker", text: "Drag the Slayer task panel to a comfortable position. It shows the assigned creature, remaining count and task tier. The lower control requests travel to the assigned task when a supported destination is available. Normal travel restrictions still apply." },
      { title: "Followers that fit the world", text: "Progression pets coexist with Summoning familiars. Following pets return after ordinary death and do not block NPC movement. Familiar Call and Take BoB use the native follower controls, with encounter-specific restrictions still enforced." },
      { title: "A focused session", text: "Use ;;commands to find the supported player commands, T to choose Atlas destinations and Ctrl+S to check your pet's current progress. Keep the current filter visible when looting so a hidden item is easy to diagnose." }
    ]
  },
  {
    id: "global-events", title: "Weekend XP and the hourly event rotation", category: "Events", image: "level-up-gameplay.webp",
    summary: "New York time, stacking XP and a fresh event every hour, including quiet and repeat hours.",
    sections: [
      { title: "The weekend schedule", text: "The recurring XP weekend begins Friday at 12:01 AM and ends Sunday at 11:59 PM in America/New_York time. The schedule follows the timezone's daylight-saving changes." },
      { title: "Hourly events", list: ["No kill count required for God Wars and Nex.", "Double standard charm drops.", "Double player XP.", "A 10% chance to double an eligible loot stack.", "Double Pest Control commendations and Dominion Factor.", "Double pet XP.", "A quiet hour with no hourly bonus."] },
      { title: "Repeats are allowed", text: "The next hourly choice can repeat the previous event or be a quiet hour. An event lasts for its hourly window. Treat the in-game announcement and event information as the authority for the current live hour." },
      { title: "XP can stack", text: "Weekend double XP and the hourly player-XP event multiply together, producing 4× from those two schedules when both apply. Other supported XP bonuses continue through the game's normal award path. A double-pet-XP hour is a separate pet-award effect." }
    ]
  },
  {
    id: "ironman-kit", title: "Ironman kit and an easier first loadout", category: "Getting started", image: "mode-selection.webp",
    summary: "Reclaimable hybrid equipment, level-one wearing and the staff's spell-level boundary.",
    sections: [
      { title: "Claim the missing pieces", text: "Ironman and Hardcore Ironman accounts can use ;;ironkit outside combat and restricted activities. The reclaim checks inventory, equipment and bank, then supplies missing pieces when there is room. It does not give duplicates of pieces you already hold." },
      { title: "A hybrid starter set", text: "The kit includes a sword, off-hand, staff, bow, helm, body and legs. The custom equipment is designed for level-one wearing with tier-40, adamant-equivalent starter strength. It is account-bound starter gear." },
      { title: "The staff and free runes", text: "With the Ironman staff equipped, supported combat and utility spells through level 55 waive their rune costs. You still need the spell's Magic level and other requirements. Higher-level spells retain their normal rune costs. Dungeoneering spellbook casting is excluded." },
      { title: "The bow", text: "The Ironman bow uses its custom ammo-free combat path. It is starter equipment, so upgrade your loadout as your progression and the content demand it." }
    ]
  },
  {
    id: "monster-drops", title: "Monster and drop knowledge base", category: "Knowledge base", image: "araxxor-gameplay.webp",
    summary: "Search monsters, find which configured tables contain an item, and read the server's base entry chances.",
    sections: [
      { title: "Search by creature or item", text: "Search for a monster or open Item drop sources to find an item by name or ID. The item page groups NPC IDs that use the same table and shows each configured entry separately. Select an NPC to inspect its full table.",
        external: [["wiki.html?view=monsters", "Browse monsters"], ["wiki.html?view=items", "Browse item drop sources"]] },
      { title: "What the numbers mean", text: "The reference uses a November 2026 server review snapshot at a base factor of 1, without a Ring of Wealth. The snapshot includes a resource update that doubles eligible crafting materials, ammo, food and potions. Check the patch archive and your game world for the version currently in use. Gear, coins, charms, bones, ashes and special unlocks keep their ordinary quantities. Account bonuses and active events can still affect loot." },
      { title: "Where the drop data comes from", text: "The export reads the server's packed NPC tables after its scripted patches run. The cache supplies names and model IDs. The Oracle of Darkness, for example, uses three TokHaar models and has a custom table with coloured abyssal whips. Those rewards belong to the Oracle encounter.", links: [["boss-oracle", "Oracle of Darkness guide"]] },
      { title: "Configured variants and special rewards", text: "Queen Black Dragon uses her reward chest and Vorago uses five reward piles. Key tokens and clues have separate eligible kill rolls. Frozen key pieces come from eligible God Wars stronghold enemies, and shared crystal triskelion fragments depend on the pieces you own. The index covers ordinary tables and the marked special reward sources. Some configured NPC variants have no public spawn." },
      { title: "Artwork and item identity", text: "Item images come from verified RuneScape Wiki file entries. Select an item's source link to view its wiki artwork page. Custom items without a matching wiki file use a labelled fallback rather than an unrelated item image." }
    ], reference: "monsters"
  },
  {
    id: "support", title: "Get help and report a useful bug", category: "Community", image: "garden-gameplay.webp",
    summary: "Give staff the information that turns an unclear report into a reproducible fix.",
    sections: [
      { title: "Include the action that failed", text: "Say what you clicked, where you were and what you expected. Copy the exact chat or error message. For a boss, include the phase, path and combat mode. For an interface, include the tab and the last control you used.",
        external: [["help.html#report", "Open the bug report template"]] },
      { title: "A screenshot that helps", text: "Include the relevant game area, interface and visible message. Crop unrelated personal information. A short clip is useful when the sequence or timing matters." },
      { title: "Client and connection checks", text: "Let the launcher finish updating and the cache finish loading before judging a fresh login's responsiveness. If an issue survives reconnecting, explain whether it happens before the lobby, after Play Now or inside the world. Report the displayed error rather than only saying that login failed." }
    ]
  },
  {
    id: "about", title: "About this wiki and its sources", category: "Knowledge base", image: "prifddinas-gameplay.webp",
    summary: "AetherRS3 rules, original screenshots, wiki artwork and clear boundaries for reference data.",
    sections: [
      { title: "Written for AetherRS3", text: "Custom encounter notes and companion effects come from this project's game source and metadata. The reference is a snapshot prepared for the current website review. Live worlds can run another release, so report a mismatch with the build and exact in-game behaviour." },
      { title: "Screenshots and verified artwork", text: "Guide covers, Atlas illustrations, item icons and creature portraits use credited RuneScape Wiki artwork. Custom guides can show the related original creature or location. The image caption identifies the Wiki subject. The separate Community gallery contains supplied AetherRS3 screenshots. RuneScape assets and trademarks belong to Jagex Limited." },
      { title: "Read mechanics in their context", text: "An authored solo mechanic is labelled Custom AetherRS3. Base NPC table chances do not replace special chest logic or account-specific bonuses. An undocumented acquisition route stays undocumented until it has a reliable source." }
    ]
  }
];
