import { useGameStore } from '@/game/core/store';

export const MutationStackHUD = () => {
    const { collectedMutations } = useGameStore();

    return (
        <div
            style={{
                position: 'absolute',
                top: '80px', // Below the health/wave display
                left: '20px',
                display: 'flex',
                gap: '10px',
                pointerEvents: 'none',
                zIndex: 1000,
            }}
        >
            {collectedMutations.map((m) => (
                <div
                    key={m.id}
                    style={{
                        position: 'relative',
                        width: '40px',
                        height: '40px',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'visible',
                    }}
                >
                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            backgroundImage: `url('assets/icons.png')`,
                            backgroundPosition: `-${(m.frame % 16) * 32}px -${Math.floor(m.frame / 16) * 32}px`,
                            backgroundSize: '512px auto', // 16 columns * 16px * 2 (scale) = 512px
                            imageRendering: 'pixelated',
                        }}
                    />
                    {m.count > 1 && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '-5px',
                                right: '-5px',
                                backgroundColor: '#000',
                                color: '#fff',
                                fontSize: '12px',
                                padding: '0 4px',
                                borderRadius: '4px',
                                border: '1px solid #fff',
                                fontWeight: 'bold',
                            }}
                        >
                            {m.count}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
