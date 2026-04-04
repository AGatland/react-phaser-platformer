import { useRef, useState, useCallback } from 'react';
import { IRefPhaserGame, PhaserGame } from './game/PhaserGame';
import { NinjaNitroHUD } from './components/hud/NinjaNitroHUD';

function App() {
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [currentScene, setCurrentScene] = useState<string>('');

    const onSceneReady = useCallback((scene: Phaser.Scene) => {
        setCurrentScene(scene.sys.settings.key || '');
    }, []);

    return (
        <div id="app">
            {currentScene === 'NinjaNitroScene' && <NinjaNitroHUD />}
            <PhaserGame ref={phaserRef} currentActiveScene={onSceneReady} />
        </div>
    );
}

export default App;
