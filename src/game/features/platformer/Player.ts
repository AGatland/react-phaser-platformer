import { Scene, Input, Physics } from 'phaser';
import { ASSETS } from '@/game/core/Assets';
import { CONSTANTS } from '@/game/core/Constants';

export class Player extends Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd: {
        W: Input.Keyboard.Key;
        A: Input.Keyboard.Key;
        S: Input.Keyboard.Key;
        D: Input.Keyboard.Key;
    };
    private spaceKey: Input.Keyboard.Key;
    private isKicking: boolean = false;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, ASSETS.SPRITES.DINO);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(CONSTANTS.PLATFORMER.SCALE);
        this.setCollideWorldBounds(true);

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(16, 16).setOffset(4, 4);

        if (scene.input.keyboard) {
            this.cursors = scene.input.keyboard.createCursorKeys();
            this.wasd = scene.input.keyboard.addKeys('W,A,S,D') as {
                W: Input.Keyboard.Key;
                A: Input.Keyboard.Key;
                S: Input.Keyboard.Key;
                D: Input.Keyboard.Key;
            };
            this.spaceKey = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
        }

        // Listen for kick animation completion
        this.on(`animationcomplete-${ASSETS.ANIMATIONS.DINO_KICK}`, () => {
            this.isKicking = false;
        });
    }

    public update(): void {
        if (!this.cursors || !this.body) return;

        const { SPEED, JUMP_FORCE } = CONSTANTS.PLATFORMER;

        // Kick handling
        if (Input.Keyboard.JustDown(this.spaceKey) && !this.isKicking) {
            this.isKicking = true;
            this.play(ASSETS.ANIMATIONS.DINO_KICK);
        }

        if (this.isKicking) {
            this.setVelocityX(0);
            return;
        }

        // Movement
        const moveLeft = this.cursors.left.isDown || this.wasd.A.isDown;
        const moveRight = this.cursors.right.isDown || this.wasd.D.isDown;
        const moveUp = this.cursors.up.isDown || this.wasd.W.isDown;

        if (moveLeft) {
            this.setVelocityX(-SPEED);
            this.setFlipX(true);
            if (this.body.blocked.down) this.play(ASSETS.ANIMATIONS.DINO_RUN, true);
        } else if (moveRight) {
            this.setVelocityX(SPEED);
            this.setFlipX(false);
            if (this.body.blocked.down) this.play(ASSETS.ANIMATIONS.DINO_RUN, true);
        } else {
            this.setVelocityX(0);
            if (this.body.blocked.down) this.play(ASSETS.ANIMATIONS.DINO_IDLE, true);
        }

        if (moveUp && this.body.blocked.down) {
            this.setVelocityY(JUMP_FORCE);
        }

        if (!this.body.blocked.down) {
            this.stop();
            this.setFrame(12);
        }
    }
}
