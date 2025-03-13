import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Player } from '../entities/Player';

export class Game extends Scene
{
    private player: Player;
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private debugText: Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        // Set world bounds explicitly
        this.physics.world.setBounds(0, 0, 2048, 1536); // Double the camera view

        // Create platform group
        this.platforms = this.physics.add.staticGroup();

        // Create ground platform - using a static body instead of rectangle
        const ground = this.add.rectangle(512, 700, 800, 32, 0x00ff00);
        this.platforms.add(ground, true); // true enables static body optimization

        // Create player
        this.player = new Player(this, 512, 600);

        // Set up collisions once
        this.physics.add.collider(this.player, this.platforms);

        // Camera setup with bounds
        this.cameras.main.setBounds(0, 0, 2048, 1536);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setBackgroundColor(0x87ceeb);

        // Create debug text once
        this.debugText = this.add.text(16, 16, '', {
            fontSize: '18px',
            color: '#000',
            backgroundColor: '#fff'
        }).setScrollFactor(0).setDepth(1000);

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        if (!this.player?.body) return;

        this.player.update();

        // Update debug text only if visible
        if (this.debugText.visible) {
            this.debugText.setText(
                `Position: (${Math.floor(this.player.x)}, ${Math.floor(this.player.y)})\n` +
                `Velocity: (${Math.floor(this.player.body.velocity.x)}, ${Math.floor(this.player.body.velocity.y)})\n` +
                `On Ground: ${this.player.body.touching.down}`
            );
        }
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
