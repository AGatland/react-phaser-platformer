import { Scene, Physics } from 'phaser';

export class ChopWave extends Physics.Arcade.Sprite {
    constructor(scene: Scene, x: number, y: number, angle: number) {
        super(scene, x, y, 'chop-wave-texture');

        scene.add.existing(this);
        // We don't call scene.physics.add.existing(this) here because
        // the group.add() in NinjaNitroPlayer will handle it correctly.

        this.setAngle(angle);

        // Set velocity based on angle
        const speed = 400;
        const vx = Math.cos(Phaser.Math.DegToRad(angle)) * speed;
        const vy = Math.sin(Phaser.Math.DegToRad(angle)) * speed;

        // We'll set the velocity in a delayed call or after it's added to the group
        // to ensure the body exists.
        scene.events.once('update', () => {
            if (this.body) {
                this.setVelocity(vx, vy);
                (this.body as Physics.Arcade.Body).setAllowGravity(false);
            }
        });

        // Self-destruct after some time (increased to reach edge of screen)
        scene.time.delayedCall(2000, () => {
            if (this.active) this.destroy();
        });
    }
}
