import { Scene } from 'phaser';
import { ASSETS } from '@/game/core/Assets';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.setPath('assets');

        // Essential assets
        this.load.image(ASSETS.IMAGES.BACKGROUND, 'bg.png');
        this.load.image(ASSETS.IMAGES.GROUND, 'grassblock2.png');

        // Spritesheets
        this.load.spritesheet(ASSETS.SPRITES.DINO, 'dino.png', { frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet(ASSETS.SPRITES.NINJA, 'ninja.png', {
            frameWidth: 32,
            frameHeight: 32,
        });

        // Simple text indicator
        this.add
            .text(512, 384, 'Loading Arcade...', { fontSize: '32px', color: '#fff' })
            .setOrigin(0.5);
    }

    create() {
        // Dino Animations
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

        // Ninja Animations (Column-based layout)
        this.anims.create({
            key: 'ninja-down',
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [32, 40, 48, 56],
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'ninja-up',
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [33, 41, 49, 57],
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'ninja-left',
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [34, 42, 50, 58],
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'ninja-right',
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [35, 43, 51, 59],
            }),
            frameRate: 10,
            repeat: -1,
        });

        // Start in the Hub!
        this.scene.start('HubScene');
    }
}
