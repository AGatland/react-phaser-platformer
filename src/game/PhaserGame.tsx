import { useLayoutEffect, useRef, useImperativeHandle } from 'react';
import StartGame from './main';
import { EventBus } from '@/game/core/EventBus';

export interface IRefPhaserGame {
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface IProps {
    currentActiveScene?: (scene_instance: Phaser.Scene) => void;
    ref?: React.Ref<IRefPhaserGame>;
}

export const PhaserGame = ({ currentActiveScene, ref }: IProps) => {
    const game = useRef<Phaser.Game | null>(null);

    useImperativeHandle(ref, () => ({
        game: game.current,
        scene: null,
    }));

    useLayoutEffect(() => {
        if (game.current === null) {
            game.current = StartGame('game-container');
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
        };
    }, []);

    useLayoutEffect(() => {
        const handleSceneReady = (scene_instance: Phaser.Scene) => {
            if (currentActiveScene) {
                currentActiveScene(scene_instance);
            }

            if (ref && 'current' in ref && ref.current) {
                ref.current.scene = scene_instance;
            }
        };

        EventBus.on('current-scene-ready', handleSceneReady);

        return () => {
            EventBus.removeListener('current-scene-ready', handleSceneReady);
        };
    }, [currentActiveScene, ref]);

    return <div id="game-container"></div>;
};
