import { Scene } from 'phaser';
import { ASSETS } from '@/game/core/Assets';
import { HubPlayer } from './HubPlayer';
import { EventBus } from '@/game/core/EventBus';

export class HubScene extends Scene {
    private player: HubPlayer;

    constructor() {
        super('HubScene');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Hub has no gravity
        this.physics.world.gravity.y = 0;

        // Background
        this.add
            .image(width / 2, height / 2, ASSETS.IMAGES.BACKGROUND)
            .setDisplaySize(width, height);

        // Welcome Text
        this.add
            .text(width / 2, 100, 'ARCADE HUB', {
                fontSize: '48px',
                color: '#fff',
                fontStyle: 'bold',
            })
            .setOrigin(0.5);

        this.add
            .text(width / 2, 160, 'Walk into a zone to play', {
                fontSize: '24px',
                color: '#fff',
            })
            .setOrigin(0.5);

        // Platformer Zone
        const platformerZone = this.add.rectangle(width * 0.2, height / 2, 200, 200, 0x00ff00, 0.3);
        this.add
            .text(width * 0.2, height / 2 - 120, 'DINO DASH', { fontSize: '24px', color: '#fff' })
            .setOrigin(0.5);
        this.physics.add.existing(platformerZone, true);

        // Ninja Nitro Zone
        const nitroZone = this.add.rectangle(width * 0.8, height / 2, 200, 200, 0xff0000, 0.3);
        this.add
            .text(width * 0.8, height / 2 - 120, 'NINJA NITRO', { fontSize: '24px', color: '#fff' })
            .setOrigin(0.5);
        this.physics.add.existing(nitroZone, true);

        // Create player
        this.player = new HubPlayer(this, width / 2, height / 2);

        // Detection
        this.physics.add.overlap(this.player, platformerZone, () => {
            this.scene.start('PlatformerScene');
        });

        this.physics.add.overlap(this.player, nitroZone, () => {
            this.scene.start('NinjaNitroScene');
        });

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        if (this.player) {
            this.player.update();
        }
    }
}
