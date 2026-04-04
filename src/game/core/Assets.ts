/**
 * Centralized Asset Registry.
 */
export const ASSETS = {
    IMAGES: {
        BACKGROUND: 'background',
        GROUND: 'ground',
        STAR: 'star',
    },
    SPRITES: {
        DINO: 'dino',
        NINJA: 'ninja',
        MUTATION_ICONS: 'icons',
    },
    ANIMATIONS: {
        DINO_IDLE: 'dino-idle',
        DINO_RUN: 'dino-run',
        DINO_KICK: 'dino-kick',

        NINJA_WALK_DOWN: 'ninja-walk-down',
        NINJA_WALK_UP: 'ninja-walk-up',
        NINJA_WALK_LEFT: 'ninja-walk-left',
        NINJA_WALK_RIGHT: 'ninja-walk-right',
        NINJA_IDLE_DOWN: 'ninja-idle-down',
        NINJA_IDLE_UP: 'ninja-idle-up',
        NINJA_IDLE_LEFT: 'ninja-idle-left',
        NINJA_IDLE_RIGHT: 'ninja-idle-right',
        NINJA_CHOP_DOWN: 'ninja-chop-down',
        NINJA_CHOP_UP: 'ninja-chop-up',
        NINJA_CHOP_LEFT: 'ninja-chop-left',
        NINJA_CHOP_RIGHT: 'ninja-chop-right',
        NINJA_ROLL_DOWN: 'ninja-roll-down',
        NINJA_ROLL_UP: 'ninja-roll-up',
        NINJA_ROLL_LEFT: 'ninja-roll-left',
        NINJA_ROLL_RIGHT: 'ninja-roll-right',
    },
} as const;
