import { Scene, Input, Types, Physics } from 'phaser';

export class Player extends Physics.Arcade.Sprite {
    private cursors: Types.Input.Keyboard.CursorKeys;
    private jumpKey: Input.Keyboard.Key;
    private dashKey: Input.Keyboard.Key;
    private leftKey: Input.Keyboard.Key;
    private rightKey: Input.Keyboard.Key;

    // Movement properties
    private readonly config = {
        moveSpeed: 400,
        jumpForce: -400,
        dashDistance: 200,
        normalGravity: 800,
        dashCooldown: 1000, // milliseconds
        coyoteTime: 100,    // milliseconds
        jumpBufferTime: 150, // milliseconds
        attackRange: 60,
        attackDuration: 200,
        health: 100
    };

    private canJump = true;
    private isDashing = false;
    private canDash = true;
    private isAttacking = false;
    private isInvulnerable = false;
    private lastGroundedTime = 0;
    private lastJumpPressedTime = 0;
    private attackHitbox?: Phaser.GameObjects.Arc;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'player');
        this.scene = scene;
        this.setupPlayer();
        this.setupInput();
    }

    private setupPlayer() {
        this.scene.physics.world.enable(this);
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true).setSize(32, 48).setGravityY(this.config.normalGravity);
        this.setDisplaySize(32, 48).setTint(0xff0000);
        this.scene.add.existing(this);

        // Single reused attack hitbox
        this.attackHitbox = this.scene.add.circle(this.x, this.y, this.config.attackRange, 0xffffff, 0);
        this.scene.physics.add.existing(this.attackHitbox, true);
        this.attackHitbox.setVisible(false);
    }

    private setupInput() {
        this.cursors = this.scene.input.keyboard!.createCursorKeys();
        this.jumpKey = this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.SPACE);
        this.dashKey = this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.SHIFT);
        this.leftKey = this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.A);
        this.rightKey = this.scene.input.keyboard!.addKey(Input.Keyboard.KeyCodes.D);
    }

    public update(): void {
        if (!this.body) return;

        this.handleHorizontalMovement();
        this.handleJump();
        if (!this.isDashing) this.handleDash();
        if (!this.isAttacking) this.handleAttack();
    }

    private handleHorizontalMovement(): void {
        const velocityX = (this.leftKey.isDown || this.cursors.left.isDown) ? -this.config.moveSpeed
                         : (this.rightKey.isDown || this.cursors.right.isDown) ? this.config.moveSpeed
                         : 0;
        this.setVelocityX(velocityX);
        this.setFlipX(velocityX < 0);
    }

    private handleJump(): void {
        const body = this.body as Phaser.Physics.Arcade.Body;
        const isGrounded = body.blocked.down;

        if (isGrounded) this.lastGroundedTime = this.scene.time.now;
        if (Phaser.Input.Keyboard.JustDown(this.jumpKey)) this.lastJumpPressedTime = this.scene.time.now;

        if ((this.scene.time.now - this.lastGroundedTime) < this.config.coyoteTime &&
            (this.scene.time.now - this.lastJumpPressedTime) < this.config.jumpBufferTime &&
            this.canJump) {
            this.setVelocityY(this.config.jumpForce);
            this.canJump = false;
        }

        if (isGrounded) this.canJump = true;
    }

    private handleDash(): void {
        if (Phaser.Input.Keyboard.JustDown(this.dashKey) && this.canDash) {
            this.canDash = false;
            this.isInvulnerable = true;

            const pointer = this.scene.input.activePointer;
            const angle = Phaser.Math.Angle.Between(
                this.x, this.y,
                pointer.worldX, pointer.worldY
            );

            // Instant teleport dash without extra operations
            this.setPosition(
                this.x + Math.cos(angle) * this.config.dashDistance,
                this.y + Math.sin(angle) * this.config.dashDistance
            );

            this.isInvulnerable = false;
            this.scene.time.delayedCall(this.config.dashCooldown, () => this.canDash = true);
        }
    }

    // TODO: MIGHT ADD SHIELDING ABILITY LATER
    private handleAttack(): void {
        if (this.scene.input.activePointer.isDown) {
            this.isAttacking = true;

            // TODO: REMOVE WHEN ANIMATION IS IN PLACE
            // Visualize attack with a gray circle
            const attackVisual = this.scene.add.circle(this.x, this.y, this.config.attackRange, 0x808080, 0.5);
            this.scene.time.delayedCall(this.config.attackDuration, () => {
                attackVisual.destroy();
                this.isAttacking = false;
            });
            // Update position of the circle during the attack
            this.scene.events.on('update', () => {
                attackVisual.setPosition(this.x, this.y);
            });

            if (this.attackHitbox) {
                this.attackHitbox.setPosition(this.x, this.y).setVisible(true);
                this.scene.time.delayedCall(this.config.attackDuration, () => {
                    if (this.attackHitbox) this.attackHitbox.setVisible(false);
                    this.isAttacking = false;
                });
            }
        }
    }

    public takeDamage(amount: number): void {
        if (this.isInvulnerable) return;
        this.config.health -= amount;
        this.isInvulnerable = true;

        this.scene.tweens.add({
            targets: this,
            alpha: 0.5,
            duration: 100,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                this.isInvulnerable = false;
                this.alpha = 1;
            }
        });
    }
}
