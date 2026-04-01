import { create } from 'zustand';

interface GameState {
    score: number;
    health: number;
    addScore: (points: number) => void;
    takeDamage: (amount: number) => void;
    resetGame: () => void;
}

/**
 * Global state store for HUD and game-wide logic.
 */
export const useGameStore = create<GameState>((set) => ({
    score: 0,
    health: 100,
    addScore: (points) => set((state) => ({ score: state.score + points })),
    takeDamage: (amount) => set((state) => ({ health: Math.max(0, state.health - amount) })),
    resetGame: () => set({ score: 0, health: 100 }),
}));
