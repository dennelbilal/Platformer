/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */
class Tableau extends Phaser.Scene{
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */
    constructor(key) {
        super(key);
    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('spike', 'assets/spike.png');
        this.load.spritesheet('joueur',
            'assets/joueur2.png',
            { frameWidth: 71, frameHeight: 76  }
        );
        this.load.spritesheet('player_stance',
            'assets/joueur3.png',
            { frameWidth: 71, frameHeight: 75  }
        );
        this.load.spritesheet('Laser',
        'assets/laser_spriteSheet.png',
        { frameWidth: 25, frameHeight: 167  }
    );
    }
    create(){
        Tableau.current=this;
        this.sys.scene.scale.lockOrientation("landscape")
        console.log("On est sur "+this.constructor.name+" / "+this.scene.key);
        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.sky=this.add.image(0, 0, 'sky').setOrigin(0,0);
        this.sky.displayWidth=14*64;
        this.sky.setScrollFactor(0,0);
        /**
         * Le joueur
         * @type {Player}
         */
        this.player=new Player(this,125,1800);
        this.boutonTir = this.input.keyboard.addKey('A');

        

    }
    update(){
        super.update();
        this.player.move();
        this.tirPlayer();
    }
    tirPlayer(){
        if (Phaser.Input.Keyboard.JustDown(this.boutonTir)){
            this.player.shoot();
        }   
    }

    Bounding (player, ascenceur)
    {
        // setTimeout(function(){
            player.setVelocityY(-850);
        // },600);
    }

    
    // ui.gagne();

    //     //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
    //     let totalActive=0;
    //     for(let child of this.children.getChildren()){
    //         if(child.texture && child.texture.key==="star"){
    //             if(child.active){
    //                 totalActive++;
    //             }
    //         }
    //     }
    //     if(totalActive===0){
    //         this.win();
    //     }
    //     /*
    //     // this.stars est un groupe (plus tard)
    //     if (this.stars.countActive(true) === 0)
    //     {
    //        this.win();
    //     }
    //      */
    // }

    /**
     * Aïeee ça fait mal
     * @param player
     * @param spike
     */
    hitSpike (player, spike)
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.restart();

    }

    /**
     * Pour reset cette scène proprement
     * @private
     */
    _destroy(){
        this.player.stop();
        this.scene.stop();
    }

    /**
     * Quand on a gagné
     */
    win(){
        Tableau.suivant();
    }

    /**
     * Va au tableau suivant
     */
    static suivant(){
        let ceSeraLaSuivante=false;
        let nextScene=null;
        if(Tableau.current){
            for(let sc of game.scene.scenes){
                if(sc.scene.key !== "ui"){
                    if(!nextScene){
                        if(ceSeraLaSuivante){
                            nextScene=sc;
                        }
                        if(sc.scene.key === Tableau.current.scene.key){
                            ceSeraLaSuivante=true;
                        }
                    }
                }
            }
        }
        if(!nextScene){
            nextScene = game.scene.scenes[0];
        }
        Tableau.goTableau(nextScene);
    }

    static goTableau(tableau){
        if(Tableau.current){
            Tableau.current._destroy();
        }
        game.scene.start(tableau);
    }


}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current=null;