import { Scene } from 'phaser';
import { ASSETS } from '@/game/core/Assets';
import { NinjaNitroPlayer } from './NinjaNitroPlayer';
import { Enemy } from './Enemy';
import { MutationItem } from './MutationItem';
import { MUTATIONS } from './Mutations';
import { EventBus } from '@/game/core/EventBus';
import { useGameStore } from '@/game/core/store';

export interface INinjaNitroScene extends Scene {
    enemies: Phaser.Physics.Arcade.Group;
    chopWaves: Phaser.Physics.Arcade.Group;
}

export class NinjaNitroScene extends Scene implements INinjaNitroScene {
    private player: NinjaNitroPlayer;
    public enemies: Phaser.Physics.Arcade.Group;
    public chopWaves: Phaser.Physics.Arcade.Group;
    private mutationItems: Phaser.Physics.Arcade.StaticGroup;
    private isSpawningWave: boolean = false;
    private eKey: Phaser.Input.Keyboard.Key;

    constructor() {
        super('NinjaNitroScene');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Reset state for a new game session
        useGameStore.getState().resetGame();

        // Ninja Nitro has no gravity (top-down)
        this.physics.world.gravity.y = 0;

        // Pre-generate Chop Wave Texture
        this.createChopWaveTexture();

        // Background
        this.add
            .image(width / 2, height / 2, ASSETS.IMAGES.BACKGROUND)
            .setDisplaySize(width, height)
            .setTint(0x444444);

        // Groups
        this.enemies = this.physics.add.group();
        this.chopWaves = this.physics.add.group();
        this.mutationItems = this.physics.add.staticGroup();

        // Create player in center
        this.player = new NinjaNitroPlayer(this, width / 2, height / 2);

        if (this.input.keyboard) {
            this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        }

        // Start first wave
        this.startNextWave();

        // Collision: Player vs Enemy
        this.physics.add.overlap(this.player, this.enemies, (p) => {
            (p as NinjaNitroPlayer).takeDamage(10);
        });

        // Collision: ChopWave vs Enemy
        this.physics.add.overlap(this.chopWaves, this.enemies, (w, e) => {
            const levels = useGameStore.getState().mutations;
            const extraDamage = (levels[1] || 0) * 10; // ID 1 = Sharp Edge
            (e as Enemy).takeDamage(15 + extraDamage);
            w.destroy(); // Wave dissipates on hit
        });

        // ESC to go back to Hub
        if (this.input.keyboard) {
            this.input.keyboard.on('keydown-ESC', () => {
                this.scene.start('HubScene');
            });
        }

        EventBus.emit('current-scene-ready', this);
    }

    private startNextWave(): void {
        this.isSpawningWave = true;
        const currentWave = useGameStore.getState().wave;

        // Brief delay before spawning
        this.time.delayedCall(1000, () => {
            for (let i = 0; i < currentWave; i++) {
                this.spawnEnemy();
            }
            this.isSpawningWave = false;
        });
    }

    private spawnEnemy(): void {
        const width = this.scale.width;
        const height = this.scale.height;

        // Spawn randomly on the edges
        let x, y;
        if (Math.random() > 0.5) {
            x = Math.random() > 0.5 ? 50 : width - 50;
            y = Math.random() * height;
        } else {
            x = Math.random() * width;
            y = Math.random() > 0.5 ? 50 : height - 50;
        }

        const enemy = new Enemy(this, x, y, this.player);
        this.enemies.add(enemy);
    }

    private spawnMutations(): void {
        const width = this.scale.width;
        const height = this.scale.height;

        // Use the centralized registry
        const options = MUTATIONS;

        // Spawn 3 mutations in a line
        const startX = width / 2 - 150;
        options.forEach((data, i) => {
            const item = new MutationItem(this, startX + i * 150, height / 2, data);
            this.mutationItems.add(item);
        });
    }

    private createChopWaveTexture(): void {
        const textureKey = 'chop-wave-texture';
        if (this.textures.exists(textureKey)) return;

        const graphics = this.make.graphics({ x: 0, y: 0 });
        graphics.lineStyle(3, 0x00ffff, 1);
        graphics.beginPath();
        graphics.arc(20, 20, 15, Phaser.Math.DegToRad(-60), Phaser.Math.DegToRad(60), false);
        graphics.strokePath();
        graphics.generateTexture(textureKey, 40, 40);
        graphics.destroy();
    }

    update() {
        if (this.player) {
            this.player.update();
        }

        // Update all enemies for AI
        this.enemies.getChildren().forEach((enemy) => {
            (enemy as Enemy).update();
        });

        // Check for wave completion
        if (
            this.enemies.countActive() === 0 &&
            !this.isSpawningWave &&
            this.mutationItems.countActive() === 0
        ) {
            this.spawnMutations();
        }

        // Proximity detection for mutations
        let nearbyItem: MutationItem | null = null;
        const items = this.mutationItems.getChildren() as MutationItem[];

        for (const item of items) {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, item.x, item.y);
            if (dist < 60) {
                item.showInfo(true);
                nearbyItem = item;
            } else {
                item.showInfo(false);
            }
        }

        // Pickup logic
        if (nearbyItem && Phaser.Input.Keyboard.JustDown(this.eKey)) {
            const info = nearbyItem.mutationInfo;
            useGameStore.getState().applyMutation(info.id, info.frame);
            useGameStore.getState().nextWave();

            // Clear all items and start next wave
            this.mutationItems.clear(true, true);
            this.startNextWave();
        }
    }
}
