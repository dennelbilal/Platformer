class TableauTiled extends Tableau{
    constructor(){
        super("jeu");
      }
    preload() {
        super.preload();
        // ------pour TILED-------------
        // nos images
        this.load.image('tiles', 'assets/tilet/Sol grotte 2.png');
        this.load.image('tiles1', 'assets/tilet/bakabaka.png');
        this.load.image('tiles2', 'assets/tilet/rien.png');
        
        //les données du tableau qu'on a créé dans TILED
        this.load.image('tir', 'assets/fleche.png');
        this.load.image('Ascenceur', 'assets/boi.png');
        this.load.image('Plat', 'assets/tilet/BOIs.png');
        this.load.image('Mob', 'assets/Mob.png');

        this.load.tilemapTiledJSON('map', 'assets/tilet/Tiled4.json');
        this.load.tilemapTiledJSON('map1', 'assets/tilet/tileddebug.json');
        this.load.tilemapTiledJSON('map2', 'assets/tilet/tt.json');
    }
    create() {
        super.create();

        //on en aura besoin...
        let ici=this;

        //--------chargement de la tile map & configuration de la scène-----------------------

        //notre map
        this.map = this.make.tilemap({ key: 'map' });
        this.map1 = this.make.tilemap({ key: 'map1' });
        this.map2 = this.make.tilemap({ key: 'map2' });

        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('base', 'tiles');
        this.tileset1 = this.map1.addTilesetImage('baka', 'tiles1');
        this.tileset2 = this.map2.addTilesetImage('rien', 'tiles2');

        //on agrandit le champ de la caméra du coup
        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);

        //---- ajoute les plateformes simples ----------------------------

        this.sol = this.map.createLayer('sol', this.tileset, 0, 0);
        this.fond = this.map1.createLayer('fond', this.tileset1, 0, 0);
        this.fond2 = this.map2.createLayer('fond2', this.tileset2, 0, 0);
        //this.derriere = this.map.createLayer('derriere', this.tileset, 0, 0);
        //this.lave = this.map.createLayer('lave', this.tileset, 0, 0);
        //this.devant = this.map.createLayer('devant', this.tileset, 0, 0);

        //on définit les collisions, plusieurs méthodes existent:

        // 1 La méthode que je préconise (il faut définir une propriété dans tiled pour que ça marche)
        //permet de travailler sur un seul layer dans tiled et des définir les collisions en fonction des graphiques
        //exemple ici https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
        this.sol.setCollisionByExclusion(-1, true );
        //this.lave.setCollisionByProperty({ collides: true });

        //this.physicsaddcoll
        // 2 manière la plus simple (là où il y a des tiles ça collide et sinon non)
        //this.solides.setCollisionByExclusion(-1, true);
        //this.lave.setCollisionByExclusion(-1, true);

        // 3 Permet d'utiliser l'éditeur de collision de Tiled...mais ne semble pas marcher pas avec le moteur de physique ARCADE, donc oubliez cette option :(
        //this.map.setCollisionFromCollisionGroup(true,true,this.plateformesSimples);

        //----------les étoiles (objets) ---------------------

        // c'est un peu plus compliqué, mais ça permet de maîtriser plus de choses...
        /*this.stars = this.physics.add.group({
            allowGravity: true,
            immovable: false,
            bounceY:1
        });
        this.starsObjects = this.map.getObjectLayer('stars')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.starsObjects.forEach(starObject => {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let star = this.stars.create(starObject.x+32, starObject.y+32 , 'particles','star');
        });*/

        let ascenceurContainer=this.add.container();
        ici.ascenceurObjects = ici.map.getObjectLayer('as')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        ici.ascenceurObjects.forEach(ascenceurObject => {
            let ascenceur=new Ascenceur(this,ascenceurObject.x,ascenceurObject.y);
            ascenceurContainer.add(ascenceur);
            ici.physics.add.collider(ascenceur, this.player,this.Bounding,null,this);
        });

        //----------les monstres volants (objets tiled) ---------------------

        this.monstersContainer=this.add.container();
        this.modMonstersObjects = this.map.getObjectLayer('mod')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        this.modMonstersObjects.forEach(monsterObject => {
            let monster=new Monster(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster);
            ici.physics.add.collider(monster, this.sol);
        });

        let platformContainer=this.add.container();
        ici.platformObjects = ici.map.getObjectLayer('plat')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        ici.platformObjects.forEach(platformObject => {
            let plat=new Plat(this,platformObject.x,platformObject.y);
            platformContainer.add(plat);
            ici.physics.add.collider(plat, this.player);
        });

        //--------effet sur la lave------------------------

        /*this.laveFxContainer=this.add.container();
        this.lave.forEachTile(function(tile){ //on boucle sur TOUTES les tiles de lave pour générer des particules
            if(tile.index !== -1){ //uniquement pour les tiles remplies

                /*
                //dé-commenter pour mieux comprendre ce qui se passe
                console.log("lave tile",tile.index,tile);
                let g=ici.add.graphics();
                laveFxContainer.add(g);
                g.setPosition(tile.pixelX,tile.pixelY)
                g.lineStyle(1,0xFF0000);
                g.strokeRect(0, 0, 64, 64);
                */

                //on va créer des particules
                /*let props={
                    frame: [
                        //'star', //pour afficher aussi des étoiles
                        'death-white'
                    ],
                    frequency:200,
                    lifespan: 2000,
                    quantity:2,
                    x:{min:-32,max:32},
                    y:{min:-12,max:52},
                    tint:[  0xC11A05,0x883333,0xBB5500,0xFF7F27 ],
                    rotate: {min:-10,max:10},
                    speedX: { min: -10, max: 10 },
                    speedY: { min: -20, max: -30 },
                    scale: {start: 0, end: 1},
                    alpha: { start: 1, end: 0 },
                    blendMode: Phaser.BlendModes.ADD,
                };
                let props2={...props}; //copie props sans props 2
                props2.blendMode=Phaser.BlendModes.MULTIPLY; // un autre blend mode plus sombre

                //ok tout est prêt...ajoute notre objet graphique
                let laveParticles = ici.add.particles('particles');

                //ajoute le premier émetteur de particules
                laveParticles.createEmitter(props);
                //on ne va pas ajouter le second effet émetteur mobile car il consomme trop de ressources
                if(!ici.isMobile) {
                    laveParticles.createEmitter(props2); // ajoute le second
                }
                // positionne le tout au niveau de la tile
                laveParticles.x=tile.pixelX+32;
                laveParticles.y=tile.pixelY+32;
                ici.laveFxContainer.add(laveParticles);

                //optimisation (les particules sont invisibles et désactivées par défaut)
                //elles seront activées via update() et optimizeDisplay()
                laveParticles.pause();
                laveParticles.visible=false;
                //on définit un rectangle pour notre tile de particules qui nous servira plus tard
                laveParticles.rectangle=new Phaser.Geom.Rectangle(tile.pixelX,tile.pixelY,64,64);

            }

        })*/

        //--------allez on se fait un peu la même en plus simple mais avec les étoiles----------

        /*let starsFxContainer=ici.add.container();
        this.stars.children.iterate(function(etoile) {
            let particles=ici.add.particles("particles","star");
            let emmiter=particles.createEmitter({
                tint:[  0xFF8800,0xFFFF00,0x88FF00,0x8800FF ],
                rotate: {min:0,max:360},
                scale: {start: 0.8, end: 0.5},
                alpha: { start: 1, end: 0 },
                blendMode: Phaser.BlendModes.ADD,
                speed:40
            });
            etoile.on("disabled",function(){
                emmiter.on=false;
            })
            emmiter.startFollow(etoile);
            starsFxContainer.add(particles);
        });*/




        //----------débug---------------------
        
        //pour débugger les collisions sur chaque layer
        let debug=this.add.graphics().setAlpha(this.game.config.physics.arcade.debug?0.75:0);
        if(this.game.config.physics.arcade.debug === false){
            debug.visible=false;
        }
        //débug solides en vers
        this.sol.renderDebug(debug,{
            tileColor: null, // Couleur des tiles qui ne collident pas
            collidingTileColor: new Phaser.Display.Color(0, 255, 0, 255), //Couleur des tiles qui collident
            faceColor: null // Color of colliding face edges
        });
        /*debug lave en rouge
        //this.lave.renderDebug(debug,{
            tileColor: null, // Couleur des tiles qui ne collident pas
            collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255), //Couleur des tiles qui collident
            faceColor: null // Color of colliding face edges
        });*/


        //---------- parallax ciel (rien de nouveau) -------------

       /* //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'night'
        );
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'night'
        );
        this.sky.setOrigin(0,0);
        this.sky2.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        this.sky2.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        this.sky2.blendMode=Phaser.BlendModes.ADD;*/

        //----------collisions---------------------

        //quoi collide avec quoi?
        this.physics.add.collider(this.player, this.sol);
        //this.physics.add.collider(this.stars, this.sol);
        //si le joueur touche une étoile dans le groupe...
        //this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        //quand on touche la lave, on meurt
        //this.physics.add.collider(this.player, this.lave,this.playerDie,null,this);

        //--------- Z order -----------------------

        //on définit les z à la fin
        let z=1000; //niveau Z qui a chaque fois est décrémenté.
        //debug.setDepth(z--);
        //this.blood.setDepth(z--);
        ascenceurContainer.setDepth(z--);
        this.monstersContainer.setDepth(z--);
        //this.stars.setDepth(z--);
        //starsFxContainer.setDepth(z--);
        //this.devant.setDepth(z--);
        platformContainer.setDepth(z--);
        this.sol.setDepth(z--);
        this.player.setDepth(z--);
        this.fond2.setDepth(z--); 
        this.fond.setDepth(z--); 
        
        //this.derriere.setDepth(z--);
        //this.sky.setDepth(z--);

    }

    /**
     * Permet d'activer, désactiver des éléments en fonction de leur visibilité dans l'écran ou non
     */
    /*optimizeDisplay(){
        //return;
        let world=this.cameras.main.worldView; // le rectagle de la caméra, (les coordonnées de la zone visible)

        // on va activer / désactiver les particules de lave
        for( let particule of this.laveFxContainer.getAll()){ // parcours toutes les particules de lave
            if(Phaser.Geom.Rectangle.Overlaps(world,particule.rectangle)){
                //si le rectangle de la particule est dans le rectangle de la caméra
                if(!particule.visible){
                    //on active les particules
                    particule.resume();
                    particule.visible=true;
                }
            }else{
                //si le rectangle de la particule n'est PAS dans le rectangle de la caméra
                if(particule.visible){
                    //on désactive les particules
                    particule.pause();
                    particule.visible=false;
                }
            }
        }

        // ici vous pouvez appliquer le même principe pour des monstres, des étoiles etc...
    }

    
     Fait se déplacer certains éléments en parallax*/
     
    moveParallax(){
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.6;
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.7+100;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.7+100;
    }


    /*update(){
        super.update();
        this.moveParallax();

        //optimisation
        //teste si la caméra a bougé
        let actualPosition=JSON.stringify(this.cameras.main.worldView);
        if(
            !this.previousPosition
            || this.previousPosition !== actualPosition
        ){
            this.previousPosition=actualPosition;
            this.optimizeDisplay();
        }
    }*/

}