import { GameObjects, Scene } from 'phaser';

import { EventBus } from '@/game/core/EventBus';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Sprite;
    title: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.sprite(512, 300, 'dino').setScale(8).play('idle');

        this.title = this.add
            .text(512, 460, 'Arcade', {
                fontFamily: 'Arial Black',
                fontSize: 64,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center',
            })
            .setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.changeScene();
        });

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('Game');
    }
}
