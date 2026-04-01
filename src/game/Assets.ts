/**
 * Centralized Asset Registry.
 * Avoids magic strings and typos.
 */
export const ASSETS = {
    IMAGES: {
        BACKGROUND: 'background',
        GROUND: 'ground',
        STAR: 'star',
    },
    SPRITES: {
        DINO: 'dino',
    },
    ANIMATIONS: {
        DINO_IDLE: 'idle',
        DINO_RUN: 'run',
        DINO_KICK: 'kick',
        DINO_HURT: 'hurt',
    },
} as const;
