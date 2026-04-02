# 🕹️ Phaser Arcade Hub

A multi-game arcade experience built with **React 19** and **Phaser 3.90**. Explore various game modes from a central top-down hub!

## 🏰 The Hub (Top-Down Mode)
The central meeting point where you can navigate between different arcade games.
- **Navigation:** Walk into designated zones to launch different game experiences.
- **Perspective:** Top-down movement and interaction.

---

## 🥷 NINJA NITRO (In Progress - Top-Down Combat)
A high-octane survival arcade game featuring fast-paced ninja combat.

### 🕹️ Core Mechanics
1. **Karate Chop (Primary Action - Left Mouse Button)**
   - Aim with your mouse to send a powerful chop-wave through the air.
   - Deals damage to all enemies in its path.
2. **Dodge Roll (Secondary Action - Spacebar)**
   - Perform a high-speed roll in your current movement direction.
   - Primarily used for evasion and repositioning.
3. **The Mutation System (Planned)**
   - Every wave survived will grant a "Mutation" choice to enhance your abilities.
   - *Planned Upgrades:*
     - **Piercing Chop:** Chop-waves pierce through more enemies.
     - **Impact Roll:** The Dodge Roll now deals damage and knockback to enemies you pass through.
     - **Nitro Trail:** Leave a damaging trail behind while rolling.

---

## 🦖 Dino Dash (Temp Platform Game)
A classic side-scrolling platformer currently in place as a temporary game mode.
- **Controls:** Standard platformer movement (Jump, Run, Kick).
- **Future Plans:** This will be expanded or replaced with more polished platformer experiences in future updates.

---

## 🛠️ Technical Architecture
- **Engine:** Phaser 3.90 (Arcade Physics)
- **Framework:** React 19 (for HUD/UI)
- **State:** Zustand (high-performance game-to-react bridge)
- **Maintenance:** Prettier, ESLint v9, Husky, Typed Asset Registry

## 📂 Project Structure
- `@/game/features/hub`: The top-down arcade lobby.
- `@/game/features/ninja-nitro`: The top-down combat game.
- `@/game/features/platformer`: The current platformer implementation.
- `@/game/entities`: Physics-based actors (Player, Enemies).
- `@/game/scenes`: Game worlds and loading logic.
- `@/game/Constants.ts`: Central tuning for physics and balance.
- `@/game/Assets.ts`: Typed registry for all images and animations.
