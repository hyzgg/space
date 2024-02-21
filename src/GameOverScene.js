import Phaser from 'phaser'
export default class GameOverScene extends Phaser.Scene {
constructor() {
super('over-scene')
}
init(data) {
this.replayButton = undefined
this.homeButton = undefined
this.score = data.score
}
preload() {
this.load.image('background', 'images/bg_layer1.png')
this.load.image('gameover', 'images/pngegg.png')
this.load.image('replay-button', 'images/replay.png')
this.load.image('home-button','images/homebutton.png')
}
create() {
this.add.image(200, 320, 'background')
this.add.image(200, 200, 'gameover')
this.add.text(100, 300, 'Score: ' + this.score, {
fontSize: '32px', })
this.replayButton = this.add.image(200, 400, 'replay-button')
.setInteractive().setScale(0.5)
this.replayButton.once('pointerup', () => {
    this.scene.start('space-scene')
    
    }, this)

this.homeButton = this.add.image(200, 440, 'home-button')
.setInteractive().setScale(0.025)
this.homeButton.once('pointerup', () => {
    this.scene.start('main-scene')
        
    }, this)
}
}



//git init, git add ., git commit -m "(message)", git push master local-Space => to push
//ctrl + c => after npm run start 