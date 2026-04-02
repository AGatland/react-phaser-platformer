import { Scene, Physics } from 'phaser';

export class ChopWave extends Physics.Arcade.Sprite {
    constructor(scene: Scene, x: number, y: number, angle: number) {
        super(scene, x, y, 'chop-wave-texture');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setAngle(angle);

        // Set velocity based on angle
        const speed = 400;
        const vx = Math.cos(Phaser.Math.DegToRad(angle)) * speed;
        const vy = Math.sin(Phaser.Math.DegToRad(angle)) * speed;
        this.setVelocity(vx, vy);

        // Self-destruct after some time or distance
        scene.time.delayedCall(500, () => {
            if (this.active) this.destroy();
        });
    }
}
