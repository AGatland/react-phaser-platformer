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

    private lastDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' = 'DOWN';

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

        // Start with down idle animation
        this.play(ASSETS.ANIMATIONS.NINJA_IDLE_DOWN);
    }

    public update(): void {
        if (!this.cursors || !this.body) return;

        const { SPEED } = CONSTANTS.HUB;
        let velocityX = 0;
        let velocityY = 0;

        // X Movement
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            velocityX = -SPEED;
            this.lastDirection = 'LEFT';
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            velocityX = SPEED;
            this.lastDirection = 'RIGHT';
        }

        // Y Movement
        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            velocityY = -SPEED;
            this.lastDirection = 'UP';
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            velocityY = SPEED;
            this.lastDirection = 'DOWN';
        }

        this.setVelocity(velocityX, velocityY);

        // Animation logic based on direction
        if (velocityX < 0) {
            this.play(ASSETS.ANIMATIONS.NINJA_WALK_LEFT, true);
        } else if (velocityX > 0) {
            this.play(ASSETS.ANIMATIONS.NINJA_WALK_RIGHT, true);
        } else if (velocityY < 0) {
            this.play(ASSETS.ANIMATIONS.NINJA_WALK_UP, true);
        } else if (velocityY > 0) {
            this.play(ASSETS.ANIMATIONS.NINJA_WALK_DOWN, true);
        } else {
            // Play idle animation based on last direction
            switch (this.lastDirection) {
                case 'UP':
                    this.play(ASSETS.ANIMATIONS.NINJA_IDLE_UP, true);
                    break;
                case 'DOWN':
                    this.play(ASSETS.ANIMATIONS.NINJA_IDLE_DOWN, true);
                    break;
                case 'LEFT':
                    this.play(ASSETS.ANIMATIONS.NINJA_IDLE_LEFT, true);
                    break;
                case 'RIGHT':
                    this.play(ASSETS.ANIMATIONS.NINJA_IDLE_RIGHT, true);
                    break;
            }
        }

        // Normalize diagonal speed
        if (velocityX !== 0 && velocityY !== 0) {
            this.body.velocity.normalize().scale(SPEED);
        }
    }
}
