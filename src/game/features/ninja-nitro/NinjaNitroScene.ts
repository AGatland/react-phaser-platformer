import { Scene } from 'phaser';
import { ASSETS } from '@/game/core/Assets';
import { NinjaNitroPlayer } from './NinjaNitroPlayer';
import { EventBus } from '@/game/core/EventBus';

export class NinjaNitroScene extends Scene {
    private player: NinjaNitroPlayer;

    constructor() {
        super('NinjaNitroScene');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Ninja Nitro has no gravity (top-down)
        this.physics.world.gravity.y = 0;

        // Pre-generate Chop Wave Texture
        this.createChopWaveTexture();

        // Background (reusing for now)
        this.add
            .image(width / 2, height / 2, ASSETS.IMAGES.BACKGROUND)
            .setDisplaySize(width, height)
            .setTint(0x444444); // Darker tint for "Nitro" feel

        // Game Title
        this.add
            .text(width / 2, 50, 'NINJA NITRO', {
                fontSize: '48px',
                color: '#ff0000',
                fontStyle: 'bold',
            })
            .setOrigin(0.5);

        // Simple Instruction
        this.add
            .text(width / 2, height - 50, 'Press ESC to return to Hub', {
                fontSize: '18px',
                color: '#fff',
            })
            .setOrigin(0.5);

        // Create player
        this.player = new NinjaNitroPlayer(this, width / 2, height / 2);

        // ESC to go back to Hub
        if (this.input.keyboard) {
            this.input.keyboard.on('keydown-ESC', () => {
                this.scene.start('HubScene');
            });
        }

        EventBus.emit('current-scene-ready', this);
    }

    private createChopWaveTexture(): void {
        const textureKey = 'chop-wave-texture';
        if (this.textures.exists(textureKey)) return;

        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.lineStyle(3, 0x00ffff, 1);
        graphics.beginPath();
        // Draw a crescent shape
        graphics.arc(20, 20, 15, Phaser.Math.DegToRad(-60), Phaser.Math.DegToRad(60), false);
        graphics.strokePath();
        graphics.generateTexture(textureKey, 40, 40);
        graphics.destroy();
    }

    update() {
        if (this.player) {
            this.player.update();
        }
    }
}
