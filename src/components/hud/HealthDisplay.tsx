import { useGameStore } from '@/game/core/store';

export const HealthDisplay = () => {
    const { health, maxHealth } = useGameStore();

    return (
        <div style={{ fontSize: '24px', marginBottom: '5px' }}>
            HEALTH: {health} / {maxHealth}
        </div>
    );
};
