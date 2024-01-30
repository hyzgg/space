import Phaser from 'phaser'
export default class SpaceScene extends
    Phaser.Scene {
    constructor() {
        super('space-scene')
    }
    init() {
        this.nav_left = false;
        this.nav_right = false;
        this.shoot = false;
        this.player = undefined;
        this.speed = 100
    }
    preload() {
        this.load.image('background','images/background.png')
        this.load.image('left','images/left.png')
        this.load.image('right','images/right.png')
        this.load.image('shoot','images/shoot.png')
        this.load.spritesheet('player', 'images/ship.png', {
            frameWidth: 66,
            frameHeight: 66
            })
    }
    create() {
        const gameWidht = this.scale.width*0.5;
        const gameHeight = this.scale.height*0.5;
        this.add.image(gameWidht,gameHeight,'background')
        this.createButton()
        this.player = this.createPlayer() 
    }
    update(time){
    
    }
    createButton(){
        this.input.addPointer(3)
        let shoot = this.add.image(320,550, 'shoot')
        .setInteractive().setDepth(0.5).setAlpha(0.8)
        let nav_left = this.add.image(50,550, 'left')
        .setInteractive().setDepth(0.5).setAlpha(0.8)
        let nav_right = this.add.image(nav_left.x +
        nav_left.displayWidth+20, 550,'right')
        .setInteractive().setDepth(0.5).setAlpha(0.8)
        nav_left.on('pointerdown', () => {
            this.nav_left = true
            }, this)
        nav_left.on('pointerout', () => {
            this.nav_left = false
            }, this)
        nav_right.on('pointerdown', () => {
                this.nav_right = true
                }, this)
        nav_right.on('pointerout', () => {
                this.nav_right = false
                }, this)
        shoot.on('pointerdown', () => {
                this.shoot = true
                }, this)
        shoot.on('pointerout', () => {
                this.shoot = false
                }, this)
        }
     createPlayer() {
        const player = this.physics.add.sprite(200, 450,'player')
        player.setCollideWorldBounds(true)
        return player
            }
        }

