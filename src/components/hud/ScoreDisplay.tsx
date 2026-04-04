import { useGameStore } from '@/game/core/store';

export const ScoreDisplay = () => {
    const { score } = useGameStore();

    return <div style={{ fontSize: '24px' }}>SCORE: {score}</div>;
};
