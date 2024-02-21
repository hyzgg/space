import Phaser from 'phaser';
import FallingObject from './ui/FallingObject';
import Laser from './ui/laser';

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
        this.enemies = undefined;
        this.enemySpeed = 50;
        this.lasers = undefined
        this.lastFired = 10
        this.scoreLabel = undefined
        this.score = 0
        this.lifeLabel = undefined;
        this.life = 3


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
        this.load.image('enemy','images/enemy.png',)
        this.load.image('laser','images/projectile.png')
    }
    create() {
        const gameWidht = this.scale.width*0.5;
        const gameHeight = this.scale.height*0.5;
        this.add.image(gameWidht,gameHeight,'background')
        this.createButton()
        this.player = this.createPlayer()
        this.enemies = this.physics.add.group({
            classType: FallingObject,
            maxSize: 10,
            runChildUpdate: true
            }) 
        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000),
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        })
        this.lasers = this.physics.add.group({
            classType: Laser,
            maxSize: 10,
            runChildUpdate: true
        })
        this.scoreLabel = this.add.text(10,10,'Score', {
            fontSize: '16px',
            backgroundColor: 'black'
            }).setDepth(1)
            this.lifeLabel = this.add.text(10,30,'Score', {
                fontSize: '16px',
                backgroundColor: 'black'
                }).setDepth(1)

        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.decreaseLife,
            null,
            this
        )
        this.physics.add.overlap(
            this.lasers,
            this.enemies,
            this.hitEnemy,
            null,
            this
        )
    }
    update(time){
        this.movePlayer(this.player, time)
        this.scoreLabel.setText('Score : ' + this.score);
        this.lifeLabel.setText('life : ' + this.life);
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
    movePlayer(player, time) {
            if (this.nav_left ){ this.player.setVelocityX(this.speed * -1)
            this.player.anims.play('left', true)
            this.player.setFlipX(false)
            } else if (this.nav_right){
            this.player.setVelocityX(this.speed)
            this.player.anims.play('right', true)
            this.player.setFlipX(true)
            } else {
            this.player.setVelocityX(0)
            this.player.anims.play('turn')
            }
            this.anims.create({
                key: 'turn',
                frames: [{
                key: 'player',frame: 0}],
                })
                this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('player', {
                start: 1, end: 2 }),
                })
                this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('player', {
                start: 1,end: 2 })
                })
        
            
            //above there's codes for moving player
        if ((this.shoot) && time > this.lastFired) {
            const laser = this.lasers.get(0, 0, 'laser')
            if (laser) {
            laser.fire(this.player.x, this.player.y)
            this.lastFired = time + 150
                }
            }



        return player
        }
        spawnEnemy() {
            const config = {
            speed: 30,
            rotation: 0.1
            }
            // @ts-ignore
            const enemy = this.enemies.get(0,0,'enemy',config)
            const positionX = Phaser.Math.Between(50, 350)
            if (enemy) {
            enemy.spawn(positionX)
            }
            }
        hitEnemy(laser, enemy) {
            laser.die()
            enemy.die()
            this.score += 10;
        }
        decreaseLife(player, enemy){
            enemy.die()
            this.life--
            if (this.life == 2){
            player.setTint(0xff0000)
            }else if (this.life == 1){
            player.setTint(0xff0000).setAlpha(0.2)
            }else if (this.life == 0) {
            this.scene.start('over-scene',{score:this.score})
            }
            }
}

