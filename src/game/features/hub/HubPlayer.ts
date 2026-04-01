import { Scene, Input, Physics } from 'phaser';
import { ASSETS } from '@/game/core/Assets';
import { CONSTANTS } from '@/game/core/Constants';

/**
 * The player in the Top-Down Arcade Hub.
 */
export class HubPlayer extends Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd: {
        W: Input.Keyboard.Key;
        A: Input.Keyboard.Key;
        S: Input.Keyboard.Key;
        D: Input.Keyboard.Key;
    };

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, ASSETS.SPRITES.NINJA);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(CONSTANTS.HUB.SCALE);
        this.setCollideWorldBounds(true);

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(16, 16);

        if (scene.input.keyboard) {
            this.cursors = scene.input.keyboard.createCursorKeys();
            this.wasd = scene.input.keyboard.addKeys('W,A,S,D') as {
                W: Input.Keyboard.Key;
                A: Input.Keyboard.Key;
                S: Input.Keyboard.Key;
                D: Input.Keyboard.Key;
            };
        }

        // Start with down animation
        this.play('ninja-down');
    }

    public update(): void {
        if (!this.cursors || !this.body) return;

        const { SPEED } = CONSTANTS.HUB;
        let velocityX = 0;
        let velocityY = 0;

        // X Movement
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            velocityX = -SPEED;
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            velocityX = SPEED;
        }

        // Y Movement
        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            velocityY = -SPEED;
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            velocityY = SPEED;
        }

        this.setVelocity(velocityX, velocityY);

        // Animation logic based on direction
        if (velocityX < 0) {
            this.play('ninja-left', true);
        } else if (velocityX > 0) {
            this.play('ninja-right', true);
        } else if (velocityY < 0) {
            this.play('ninja-up', true);
        } else if (velocityY > 0) {
            this.play('ninja-down', true);
        } else {
            // Stop animation on the current frame when idle
            this.stop();
        }

        // Normalize diagonal speed
        if (velocityX !== 0 && velocityY !== 0) {
            this.body.velocity.normalize().scale(SPEED);
        }
    }
}
