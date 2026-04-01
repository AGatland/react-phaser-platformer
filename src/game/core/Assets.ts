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
    },
    ANIMATIONS: {
        DINO_IDLE: 'dino-idle',
        DINO_RUN: 'dino-run',
        DINO_KICK: 'dino-kick',

        NINJA_IDLE: 'ninja-idle',
        NINJA_WALK: 'ninja-walk',
    },
} as const;
