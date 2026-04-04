import { HealthDisplay } from './HealthDisplay';
import { WaveDisplay } from './WaveDisplay';
import { MutationStackHUD } from './MutationStackHUD';

export const NinjaNitroHUD = () => {
    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    pointerEvents: 'none',
                    fontFamily: 'monospace',
                    color: 'white',
                    textShadow: '2px 2px 2px black',
                    zIndex: 1000,
                }}
            >
                <HealthDisplay />
                <WaveDisplay />
            </div>
            <MutationStackHUD />
        </>
    );
};
