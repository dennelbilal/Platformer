class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.0);
        this.setGravityY(600)
        this.setFriction(1,1);
        this.setDisplaySize(30,43)
        this.setBodySize(this.body.width,this.body.height+39);
        this.setOffset(20, 5);
        this.rechargeSonTir = false; //bool pour le rechargement


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('joueur', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('joueur', { start: 5, end: 10 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'tir left',
            frames: this.anims.generateFrameNumbers('tir', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'tir right',
            frames: this.anims.generateFrameNumbers('tir', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'stance',
            frames: this.anims.generateFrameNumbers('player_stance', { start: 1, end: 1  }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers('player_stance', { start: 0, end: 0  }),
            frameRate: 5,
            repeat: -1
        });

        this._directionX=0;
        this._directionY=0;


    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move(){

        switch (true){
            case this._directionX<0:
                this.sens=-1;
                this.setVelocityX(-250);
                this.anims.play('left', true);
                break;
            case this._directionX>0:
                this.sens=1;
                this.setVelocityX(250);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                this.anims.play('stance', true);
                this.anims.play(this.sens===-1 ? 'back' : 'stance' ,true);
        }
        // switch (true){
        //     case this._directionX<0:
        //         this.setVelocityX(-180);
        //         this.anims.play('left', true);
        //         break;
        //     case this._directionX>0:

        //         this.setVelocityX(180);
        //         this.anims.play('right', true);
        //         break;
        //     default:
        //         this.setVelocityX(0);
        //         this.anims.play('turn');
        // }

        if(this._directionY<0){
            if(this.body.blocked.down || this.body.touching.down){
                this.setVelocityY(-500);
            }
        }


    }
    shoot()
    {
        if(this.rechargeSonTir === false) { //on vérifie si on a recharger le coup
            
            this.rechargeSonTir = true; //lance la recharge
            var bullet = new Tir(this.scene,this.x, this.y);
            console.log("Tir");
            setTimeout(function(){
                bullet.destroy();
            },800);
            setTimeout(function () {
                Tableau.current.player.rechargeSonTir = false;
            }, 1100);
        }
    }
}