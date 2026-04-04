import { Scene, Physics, GameObjects } from 'phaser';
import { ASSETS } from '@/game/core/Assets';
import { MutationData } from './Mutations';

export class MutationItem extends Physics.Arcade.Sprite {
    public mutationInfo: MutationData;
    private infoBox: GameObjects.Container;
    private isPlayerNear: boolean = false;

    constructor(scene: Scene, x: number, y: number, data: MutationData) {
        super(scene, x, y, ASSETS.SPRITES.MUTATION_ICONS, data.frame);
        this.mutationInfo = data;

        scene.add.existing(this);
        scene.physics.add.existing(this, true); // Static body

        this.setScale(2);

        // Floating effect
        scene.tweens.add({
            targets: this,
            y: y - 15,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
        });

        this.createInfoBox();
    }

    private createInfoBox() {
        const { title, desc, color } = this.mutationInfo;

        const bg = this.scene.add.rectangle(0, 0, 180, 80, 0x000000, 0.8).setStrokeStyle(2, color);

        const titleText = this.scene.add
            .text(0, -20, title, {
                fontSize: '18px',
                color: '#' + color.toString(16).padStart(6, '0'),
                fontStyle: 'bold',
            })
            .setOrigin(0.5);

        const descText = this.scene.add
            .text(0, 5, desc, {
                fontSize: '14px',
                color: '#ffffff',
                wordWrap: { width: 160 },
            })
            .setOrigin(0.5);

        const hintText = this.scene.add
            .text(0, 25, '[E] TO PICKUP', {
                fontSize: '12px',
                color: '#aaaaaa',
                fontStyle: 'italic',
            })
            .setOrigin(0.5);

        this.infoBox = this.scene.add.container(this.x, this.y - 80, [
            bg,
            titleText,
            descText,
            hintText,
        ]);
        this.infoBox.setAlpha(0);
        this.infoBox.setDepth(2000);
    }

    public showInfo(show: boolean) {
        if (this.isPlayerNear === show) return;
        this.isPlayerNear = show;

        this.scene.tweens.add({
            targets: this.infoBox,
            alpha: show ? 1 : 0,
            y: show ? this.y - 90 : this.y - 80,
            duration: 200,
            ease: 'Power2',
        });
    }

    public destroy(fromScene?: boolean) {
        if (this.infoBox) this.infoBox.destroy();
        super.destroy(fromScene);
    }
}
