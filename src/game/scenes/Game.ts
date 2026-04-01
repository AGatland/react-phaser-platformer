import { Scene } from 'phaser';
import { Player } from '../entities/Player';

export class Game extends Scene {
    private player: Player;
    private platforms: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super('Game');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        const worldWidth = 3000; // This makes the world much wider than the screen

        // Set World and Camera Bounds
        this.physics.world.setBounds(0, 0, worldWidth, height);
        this.cameras.main.setBounds(0, 0, worldWidth, height);

        // Background - We'll tile it across the world width
        for (let x = 0; x < worldWidth; x += width) {
            this.add.image(x + width/2, height / 2, 'background').setDisplaySize(width, height);
        }

        // Platforms
        this.platforms = this.physics.add.staticGroup();
        const groundY = height * 0.9;
        
        // Add a long floor across the entire worldWidth
        const ground = this.add.rectangle(worldWidth / 2, groundY + 32, worldWidth, 64, 0x000000, 0);
        this.physics.add.existing(ground, true);
        this.platforms.add(ground);

        // Visual grass across the whole world
        for (let x = 0; x < worldWidth; x += 64) {
            this.add.image(x, groundY, 'ground').setOrigin(0, 0).setScale(2);
        }

        // Add some floating platforms to test jumping
        this.createPlatform(400, groundY - 150);
        this.createPlatform(700, groundY - 300);
        this.createPlatform(1000, groundY - 150);
        this.createPlatform(1300, groundY - 300);

        // Create player
        this.player = new Player(this, 100, groundY - 100);

        // Camera Follow - Using 1, 1 for instant follow to prevent sub-pixel jitter
        this.cameras.main.startFollow(this.player, true, 1, 1);

        // Collisions
        this.physics.add.collider(this.player, this.platforms);
    }

    private createPlatform(x: number, y: number) {
        // A simple 3-block wide platform
        for (let i = 0; i < 3; i++) {
            const part = this.add.image(x + (i * 64), y, 'ground').setOrigin(0, 0).setScale(2);
            this.platforms.add(part);
        }
    }

    update() {
        if (this.player) {
            this.player.update();
        }
    }
}
