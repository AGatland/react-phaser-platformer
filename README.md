# 🕹️ Phaser Arcade Hub (v2.0)

A multi-game arcade experience where you can explore various game modes from a central hub!

## 🏰 The Hub
The central meeting point where you can navigate between different arcade games.
- **Navigation:** Walk into designated zones to launch different game experiences.

## 🛠️ Technical Architecture
- **Engine:** Phaser 3.90 (Arcade Physics)
- **Framework:** React 19 (for HUD/UI)
- **State:** Zustand (high-performance game-to-react bridge)
- **Maintenance:** Prettier, ESLint v9, Husky, Typed Asset Registry

## 📂 Project Structure
- `@/game/features/hub`: The top-down arcade lobby.
- `@/game/features/platformer`: The current platformer implementation.
- `@/game/entities`: Physics-based actors (Player, Enemies).
- `@/game/scenes`: Game worlds and loading logic.
- `@/game/Constants.ts`: Central tuning for physics and balance.
- `@/game/Assets.ts`: Typed registry for all images and animations.

---

# Games

---

## 🦖 Dino Combo-Kicker (In Progress - Top-Down)
*Note: Originally described as a platformer, this game is now being developed as a high-octane top-down survival arcade.*

Survive waves of increasingly chaotic prehistoric (and possibly futuristic) enemies in a scrolling arena. The goal is simple: **Stay Alive, Build Combos, and Mutate.**

### 🕹️ Core Mechanics
1. **The Kick (Primary Action - Spacebar)**
   - The most powerful tool in your kit. Kicking an enemy sends them flying as a physics projectile.
   - **Combos:** If a kicked enemy hits another enemy, they both explode, creating a chain reaction. The more enemies in the chain, the higher the score multiplier.
2. **Seed-Gun (Secondary Action - Mouse Aim & Click)**
   - Aim 360° with your mouse to fire rapid "Fire-Seeds."
   - Used for picking off enemies or "nudging" them into better positions for a massive kick.
3. **The Mutation System (Replayability)**
   - Every wave survived grants a "Mutation" choice (pick 1 of 3).
   - *Examples:*
     - **Bouncy Kicks:** Kicked enemies bounce off walls instead of exploding on impact.
     - **Piercing Seeds:** Seeds pierce through the first enemy they hit.

---

## 🏃 Platform game (in-progress)
