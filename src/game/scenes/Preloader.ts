import { Scene } from 'phaser';
import { ASSETS } from '@/game/Assets';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.setPath('assets');

        // Essential assets using Registry
        this.load.image(ASSETS.IMAGES.BACKGROUND, 'bg.png');
        this.load.image(ASSETS.IMAGES.GROUND, 'grassblock2.png');
        this.load.spritesheet(ASSETS.SPRITES.DINO, 'dino.png', { frameWidth: 24, frameHeight: 24 });

        // Simple text indicator
        this.add.text(512, 384, 'Loading...', { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    }

    create() {
        this.anims.create({
            key: ASSETS.ANIMATIONS.DINO_IDLE,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.DINO, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.DINO_RUN,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.DINO, { start: 4, end: 10 }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.DINO_KICK,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.DINO, { start: 11, end: 13 }),
            frameRate: 10,
            repeat: 0,
        });

        this.scene.start('Game');
    }
}
