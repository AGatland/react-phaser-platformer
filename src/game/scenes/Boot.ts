import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/bg.png');

        // Create a temporary player texture
        const graphics = this.add.graphics();
        graphics.fillStyle(0xff0000);
        graphics.fillRect(0, 0, 32, 48);
        graphics.generateTexture('player', 32, 48);
        graphics.destroy();
    }

    create ()
    {
        console.log('Boot scene started');
        this.scene.start('Game');
    }
}
