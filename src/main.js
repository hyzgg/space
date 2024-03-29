import Phaser from 'phaser'
import spaceScene from './spaceScene'
import GameOverScene from './GameOverScene'
import MainMenuScene from './MainMenuScene'


const config = {
	type: Phaser.AUTO,
	
	width: 400,
	height: 620,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [MainMenuScene,spaceScene,GameOverScene],
	scale : {
		mode :Phaser.Scale.FIT,
		autoCenter : Phaser.Scale.CENTER_BOTH
		},
}

export default new Phaser.Game(config)
