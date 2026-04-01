import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.setPath('assets');
        
        // Essential assets only
        this.load.image('background', 'bg.png');
        this.load.image('ground', 'grassblock2.png');
        this.load.spritesheet('dino', 'dino.png', { frameWidth: 24, frameHeight: 24 });

        // Simple text indicator
        this.add.text(512, 384, 'Loading...', { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
    }

    create() {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('dino', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('dino', { start: 4, end: 10 }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'kick',
            frames: this.anims.generateFrameNumbers('dino', { start: 11, end: 13 }),
            frameRate: 10,
            repeat: 0
        });

        this.scene.start('Game');
    }
}
