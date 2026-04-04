import { create } from 'zustand';

export interface CollectedMutation {
    id: number;
    frame: number;
    count: number;
}

interface GameState {
    score: number;
    health: number;
    maxHealth: number;
    wave: number;
    mutations: Record<number, number>; // ID -> Level
    collectedMutations: CollectedMutation[];
    isSelectingMutation: boolean;
    addScore: (points: number) => void;
    takeDamage: (amount: number) => void;
    heal: (amount: number) => void;
    setMaxHealth: (amount: number) => void;
    nextWave: () => void;
    setSelectingMutation: (selecting: boolean) => void;
    applyMutation: (id: number, frame: number) => void;
    resetGame: () => void;
}

/**
 * Global state store for HUD and game-wide logic.
 */
export const useGameStore = create<GameState>((set) => ({
    score: 0,
    health: 100,
    maxHealth: 100,
    wave: 1,
    mutations: {},
    collectedMutations: [],
    isSelectingMutation: false,
    addScore: (points) => set((state) => ({ score: state.score + points })),
    takeDamage: (amount) => set((state) => ({ health: Math.max(0, state.health - amount) })),
    heal: (amount) =>
        set((state) => ({ health: Math.min(state.maxHealth, state.health + amount) })),
    setMaxHealth: (amount) =>
        set((state) => ({
            maxHealth: amount,
            health: state.health > amount ? amount : state.health,
        })),
    nextWave: () => set((state) => ({ wave: state.wave + 1 })),
    setSelectingMutation: (selecting) => set({ isSelectingMutation: selecting }),
    applyMutation: (id, frame) =>
        set((state) => {
            const currentLevel = state.mutations[id] || 0;
            const newMutations = { ...state.mutations, [id]: currentLevel + 1 };

            // Update collectedMutations array for HUD
            const existing = state.collectedMutations.find((m) => m.id === id);
            let newCollected;
            if (existing) {
                newCollected = state.collectedMutations.map((m) =>
                    m.id === id ? { ...m, count: m.count + 1 } : m,
                );
            } else {
                newCollected = [...state.collectedMutations, { id, frame, count: 1 }];
            }

            // Apply immediate effects
            if (id === 0) {
                // Vitality
                const newMax = state.maxHealth + 20;
                return {
                    mutations: newMutations,
                    collectedMutations: newCollected,
                    maxHealth: newMax,
                    health: state.health + 20,
                };
            }

            return { mutations: newMutations, collectedMutations: newCollected };
        }),
    resetGame: () =>
        set({
            score: 0,
            health: 100,
            maxHealth: 100,
            wave: 1,
            isSelectingMutation: false,
            collectedMutations: [],
            mutations: {},
        }),
}));
