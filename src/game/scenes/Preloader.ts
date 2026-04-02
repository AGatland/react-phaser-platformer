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

        // Ninja Walk Animations (Column-based layout)
        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_WALK_DOWN,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [32, 40, 48, 56],
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_WALK_UP,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [33, 41, 49, 57],
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_WALK_LEFT,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [34, 42, 50, 58],
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_WALK_RIGHT,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [35, 43, 51, 59],
            }),
            frameRate: 10,
            repeat: -1,
        });

        // Ninja Idle Animations (Placeholders - user will update frames)
        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_IDLE_DOWN,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [0, 8, 16, 24],
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_IDLE_UP,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [1, 9, 17, 25],
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_IDLE_LEFT,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [2, 10, 18, 26],
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_IDLE_RIGHT,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [3, 11, 19, 27],
            }),
            frameRate: 10,
            repeat: -1,
        });

        // Ninja Chop Animations (Column 4-7, Rows 0-3)
        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_CHOP_DOWN,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [4, 12, 20, 28],
            }),
            frameRate: 15,
            repeat: 0,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_CHOP_UP,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [5, 13, 21, 29],
            }),
            frameRate: 15,
            repeat: 0,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_CHOP_LEFT,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [6, 14, 22, 30],
            }),
            frameRate: 15,
            repeat: 0,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_CHOP_RIGHT,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [7, 15, 23, 31],
            }),
            frameRate: 15,
            repeat: 0,
        });

        // Ninja Roll Animations (Column 4-7, Rows 6-8)
        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_ROLL_DOWN,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [52, 60, 68],
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_ROLL_UP,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [53, 61, 69],
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_ROLL_LEFT,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [54, 62, 70],
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: ASSETS.ANIMATIONS.NINJA_ROLL_RIGHT,
            frames: this.anims.generateFrameNumbers(ASSETS.SPRITES.NINJA, {
                frames: [55, 63, 71],
            }),
            frameRate: 12,
            repeat: -1,
        });

        // Start in the Hub!
        this.scene.start('HubScene');
    }
}
