import { useGameStore } from '@/game/core/store';

export const WaveDisplay = () => {
    const { wave } = useGameStore();

    return <div style={{ fontSize: '24px' }}>WAVE: {wave}</div>;
};
