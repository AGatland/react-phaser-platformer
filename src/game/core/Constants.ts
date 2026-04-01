/**
 * Game constants for easy tuning.
 */
export const CONSTANTS = {
    PLATFORMER: {
        GRAVITY: 1600,
        SPEED: 350,
        JUMP_FORCE: -800,
        SCALE: 4,
    },
    HUB: {
        SPEED: 250,
        SCALE: 3,
    },
    WORLD: {
        WIDTH: 3000,
        HEIGHT: 768,
    },
} as const;
