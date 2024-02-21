import Phaser from 'phaser'
export default class MainMenuScene extends Phaser.Scene {
constructor() {
super('main-scene')
}
init(data) {
this.startButton = undefined
}
preload() {
this.load.image('main-menu','images/mainbackground.png')
this.load.image('start-button','images/mainstart.png')
}
create() {
this.add.image(200, 320, 'main-menu')


this.startButton = this.add.image(200, 350, 'start-button')
.setInteractive().setScale(1)
this.startButton.once('pointerup', () => {
    this.scene.start('space-scene')
},this)
}
}



//git init, git add ., git commit -m "(message)", git push master local-Space => to push
//ctrl + c => after npm run start 