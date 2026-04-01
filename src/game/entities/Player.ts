import { Scene, Input, Types, Physics } from 'phaser';

export class Player extends Physics.Arcade.Sprite {
    private cursors: Types.Input.Keyboard.CursorKeys;
    private wasd: {
        W: Input.Keyboard.Key;
        A: Input.Keyboard.Key;
        S: Input.Keyboard.Key;
        D: Input.Keyboard.Key;
    };
    private spaceKey: Input.Keyboard.Key;
    private isKicking: boolean = false;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'dino');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(4); // Even bigger dino!
        this.setCollideWorldBounds(true);
        
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(16, 16).setOffset(4, 4);

        if (scene.input.keyboard) {
            this.cursors = scene.input.keyboard.createCursorKeys();
            this.wasd = scene.input.keyboard.addKeys('W,A,S,D') as any;
            this.spaceKey = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
        }

        // Listen for kick animation completion
        this.on('animationcomplete-kick', () => {
            this.isKicking = false;
        });
    }

    public update(): void {
        if (!this.cursors || !this.body) return;

        const velocity = 300;
        const jumpForce = -500;

        // Kick handling (takes priority over other animations)
        if (Input.Keyboard.JustDown(this.spaceKey) && !this.isKicking) {
            this.isKicking = true;
            this.play('kick');
        }

        // If kicking, we don't allow movement or other animations
        if (this.isKicking) {
            this.setVelocityX(0);
            return;
        }

        // Movement
        const moveLeft = this.cursors.left.isDown || this.wasd.A.isDown;
        const moveRight = this.cursors.right.isDown || this.wasd.D.isDown;
        const moveUp = this.cursors.up.isDown || this.wasd.W.isDown;

        if (moveLeft) {
            this.setVelocityX(-velocity);
            this.setFlipX(true);
            if (this.body.blocked.down) this.play('run', true);
        } else if (moveRight) {
            this.setVelocityX(velocity);
            this.setFlipX(false);
            if (this.body.blocked.down) this.play('run', true);
        } else {
            this.setVelocityX(0);
            if (this.body.blocked.down) this.play('idle', true);
        }

        // Jump
        if (moveUp && this.body.blocked.down) {
            this.setVelocityY(jumpForce);
        }

        // Air frame
        if (!this.body.blocked.down) {
            this.stop();
            this.setFrame(12); // The jump frame
        }
    }
}
