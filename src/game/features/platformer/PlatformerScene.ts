import { Scene } from 'phaser';
import { Player } from './Player';
import { ASSETS } from '@/game/core/Assets';
import { CONSTANTS } from '@/game/core/Constants';

export class PlatformerScene extends Scene {
    private player: Player;
    private platforms: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super('PlatformerScene');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        const worldWidth = CONSTANTS.WORLD.WIDTH;

        // Explicitly set gravity for this scene
        this.physics.world.gravity.y = CONSTANTS.PLATFORMER.GRAVITY;

        // Set World and Camera Bounds
        this.physics.world.setBounds(0, 0, worldWidth, height);
        this.cameras.main.setBounds(0, 0, worldWidth, height);

        // Background
        for (let x = 0; x < worldWidth; x += width) {
            this.add
                .image(x + width / 2, height / 2, ASSETS.IMAGES.BACKGROUND)
                .setDisplaySize(width, height);
        }

        // Platforms
        this.platforms = this.physics.add.staticGroup();
        const groundY = height * 0.9;

        const ground = this.add.rectangle(
            worldWidth / 2,
            groundY + 32,
            worldWidth,
            64,
            0x000000,
            0,
        );
        this.physics.add.existing(ground, true);
        this.platforms.add(ground);

        for (let x = 0; x < worldWidth; x += 64) {
            this.add.image(x, groundY, ASSETS.IMAGES.GROUND).setOrigin(0, 0).setScale(2);
        }

        this.createPlatform(400, groundY - 150);
        this.createPlatform(700, groundY - 300);
        this.createPlatform(1000, groundY - 150);
        this.createPlatform(1300, groundY - 300);

        // Create player
        this.player = new Player(this, 100, groundY - 100);

        this.cameras.main.startFollow(this.player, true, 1, 1);
        this.physics.add.collider(this.player, this.platforms);

        // Escape to Hub
        this.add
            .text(16, 16, 'ESC to return to Hub', { fontSize: '18px', color: '#fff' })
            .setScrollFactor(0);
        this.input.keyboard?.addKey('ESC').on('down', () => {
            this.scene.start('HubScene');
        });
    }

    private createPlatform(x: number, y: number) {
        for (let i = 0; i < 3; i++) {
            const part = this.add
                .image(x + i * 64, y, ASSETS.IMAGES.GROUND)
                .setOrigin(0, 0)
                .setScale(2);
            this.platforms.add(part);
        }
    }

    update() {
        if (this.player) {
            this.player.update();
        }
    }
}
