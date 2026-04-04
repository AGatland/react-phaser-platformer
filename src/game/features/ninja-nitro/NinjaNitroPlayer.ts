import { INinjaNitroScene } from './NinjaNitroScene';
import { Scene, Input, Physics } from 'phaser';
import { ASSETS } from '@/game/core/Assets';
import { CONSTANTS } from '@/game/core/Constants';
import { ChopWave } from './ChopWave';
import { useGameStore } from '@/game/core/store';
import { Enemy } from './Enemy';

/**
 * The ninja player in Ninja Nitro.
 */
export class NinjaNitroPlayer extends Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd: {
        W: Input.Keyboard.Key;
        A: Input.Keyboard.Key;
        S: Input.Keyboard.Key;
        D: Input.Keyboard.Key;
    };

    private lastDirection: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' = 'DOWN';
    private isRolling: boolean = false;
    private isAttacking: boolean = false;
    private rollDuration: number = 400; // ms
    private rollSpeedMultiplier: number = 2.5;

    private spaceKey: Input.Keyboard.Key;
    private isInvulnerable: boolean = false;

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
            this.spaceKey = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
        }

        // Setup Mouse Listeners - Only LMB for Chop
        scene.input.on('pointerdown', (pointer: Input.Pointer) => {
            if (pointer.leftButtonDown()) {
                this.performChop(pointer);
            }
        });

        // Start with down idle animation
        this.play(ASSETS.ANIMATIONS.NINJA_IDLE_DOWN);
    }

    public takeDamage(amount: number): void {
        if (this.isInvulnerable || this.isRolling) return;

        useGameStore.getState().takeDamage(amount);

        // Visual Feedback
        this.setTint(0xff0000);
        this.isInvulnerable = true;

        this.scene.time.delayedCall(500, () => {
            this.clearTint();
            this.isInvulnerable = false;
        });

        // Check if dead
        if (useGameStore.getState().health <= 0) {
            this.die();
        }
    }

    private die(): void {
        // Simple death for now - restart scene
        this.scene.scene.restart();
        useGameStore.getState().resetGame();
    }

    private performChop(pointer: Input.Pointer): void {
        if (this.isAttacking || this.isRolling) return;

        this.isAttacking = true;

        // Calculate angle to mouse
        const angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY);
        const deg = Phaser.Math.RadToDeg(angle);

        // Snap to direction for animation
        let dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' = 'DOWN';
        if (deg >= -45 && deg <= 45) dir = 'RIGHT';
        else if (deg > 45 && deg <= 135) dir = 'DOWN';
        else if (deg < -45 && deg >= -135) dir = 'UP';
        else dir = 'LEFT';

        this.lastDirection = dir;

        // Play chop animation
        const animKey =
            dir === 'UP'
                ? ASSETS.ANIMATIONS.NINJA_CHOP_UP
                : dir === 'DOWN'
                  ? ASSETS.ANIMATIONS.NINJA_CHOP_DOWN
                  : dir === 'LEFT'
                    ? ASSETS.ANIMATIONS.NINJA_CHOP_LEFT
                    : ASSETS.ANIMATIONS.NINJA_CHOP_RIGHT;

        this.play(animKey);

        // Spawn Chop Wave and add to physics group BEFORE setting velocity
        const wave = new ChopWave(this.scene, this.x, this.y, deg);
        const scene = this.scene as INinjaNitroScene;
        if (scene.chopWaves) {
            scene.chopWaves.add(wave);

            // Set velocity after adding to group to ensure body is initialized
            const speed = 400;
            const vx = Math.cos(Phaser.Math.DegToRad(deg)) * speed;
            const vy = Math.sin(Phaser.Math.DegToRad(deg)) * speed;
            (wave.body as Physics.Arcade.Body).setVelocity(vx, vy);
        }

        this.once('animationcomplete', () => {
            this.isAttacking = false;
        });
    }

    private performRoll(): void {
        if (this.isRolling || this.isAttacking) return;

        this.isRolling = true;

        // Play roll animation based on current direction
        const animKey =
            this.lastDirection === 'UP'
                ? ASSETS.ANIMATIONS.NINJA_ROLL_UP
                : this.lastDirection === 'DOWN'
                  ? ASSETS.ANIMATIONS.NINJA_ROLL_DOWN
                  : this.lastDirection === 'LEFT'
                    ? ASSETS.ANIMATIONS.NINJA_ROLL_LEFT
                    : ASSETS.ANIMATIONS.NINJA_ROLL_RIGHT;

        this.play(animKey);

        this.scene.time.delayedCall(this.rollDuration, () => {
            this.isRolling = false;
        });
    }

    public update(): void {
        if (!this.cursors || !this.body) return;

        // Roll Check (Spacebar)
        if (Input.Keyboard.JustDown(this.spaceKey)) {
            this.performRoll();
        }

        if (this.isAttacking) {
            this.setVelocity(0, 0);
            return;
        }

        const { SPEED } = CONSTANTS.HUB;
        let velocityX = 0;
        let velocityY = 0;

        // Normal movement input (only if not rolling or can we steer roll? Let's allow steering roll for now but with speed boost)
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            velocityX = -SPEED;
            if (!this.isRolling) this.lastDirection = 'LEFT';
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            velocityX = SPEED;
            if (!this.isRolling) this.lastDirection = 'RIGHT';
        }

        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            velocityY = -SPEED;
            if (!this.isRolling) this.lastDirection = 'UP';
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            velocityY = SPEED;
            if (!this.isRolling) this.lastDirection = 'DOWN';
        }

        const currentSpeed = this.isRolling ? SPEED * this.rollSpeedMultiplier : SPEED;

        this.setVelocity(velocityX, velocityY);

        if (velocityX !== 0 || velocityY !== 0) {
            this.body.velocity.normalize().scale(currentSpeed);
        }

        // Impact Roll Logic
        const levels = useGameStore.getState().mutations;
        const impactLevel = levels[2] || 0; // ID 2 = Impact Roll
        if (this.isRolling && impactLevel > 0) {
            const scene = this.scene as INinjaNitroScene;
            if (scene.enemies) {
                this.scene.physics.overlap(this, scene.enemies, (_, e) => {
                    const damage = impactLevel * 20;
                    (e as Enemy).takeDamage(damage);
                });
            }
        }

        // Animation logic
        if (!this.isRolling) {
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
        }
    }
}
