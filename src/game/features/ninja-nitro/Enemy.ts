import { Scene, Physics } from 'phaser';
import { ASSETS } from '@/game/core/Assets';

export class Enemy extends Physics.Arcade.Sprite {
    public hp: number = 30;
    private isDead: boolean = false;
    private target: Physics.Arcade.Sprite | null = null;
    private moveSpeed: number = 80;

    constructor(scene: Scene, x: number, y: number, target: Physics.Arcade.Sprite) {
        super(scene, x, y, ASSETS.SPRITES.DINO);

        this.target = target;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setTint(0xff0000);
        this.setCollideWorldBounds(true);
        (this.body as Physics.Arcade.Body).setBounce(0.2, 0.2);
    }

    public takeDamage(amount: number): void {
        if (this.isDead) return;

        this.hp -= amount;

        // Flash white on hit
        this.setTint(0xffffff);
        this.scene.time.delayedCall(100, () => {
            if (this.active) this.setTint(0xff0000);
        });

        if (this.hp <= 0) {
            this.die();
        }
    }

    private die(): void {
        this.isDead = true;

        // Simple shrink-and-destroy effect
        this.scene.tweens.add({
            targets: this,
            scale: 0,
            duration: 200,
            onComplete: () => this.destroy(),
        });
    }

    public update(): void {
        if (this.isDead || !this.target || !this.body) return;

        // Simple follow AI
        this.scene.physics.moveToObject(this, this.target, this.moveSpeed);

        // Flip based on movement
        this.setFlipX(this.body.velocity.x > 0);
    }
}
