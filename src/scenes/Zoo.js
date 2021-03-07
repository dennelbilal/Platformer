class Zoo extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('MH2', 'assets/MH2.png');
        this.load.image('sky-2', 'assets/sky-2.png');
    }
    create() {
        super.create();
        
        //quelques étoiles
        let largeur=64*2;
        this.stars=this.physics.add.group();
        this.stars.create( 600,0,"star");
        
        this.stars.children.iterate(function (child) {
            child.setBounce(1);
            child.setGravity(1);
            child.setCollideWorldBounds(true);
            child.setVelocity( 0,Phaser.Math.Between(-100, 100));
            child.setMaxVelocity(0,500);
        });
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        //notre monstre
        this.monstre=this.physics.add.sprite(1000,this.sys.canvas.height-70,"MH2");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(70,70);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

            //on définit la taille du tableau
            let largeurDuTableau=4000;
            let hauteurDuTableau=600; //la hauteur est identique au cadre du jeu
            this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
            this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
    
            this.cameras.main.startFollow(this.player, false, 0.05, 0.05);
    
            //quelques étoiles et plateformes qui vont avec
            this.stars=this.physics.add.group();
            this.platforms=this.physics.add.staticGroup();
            for(let posX=20;posX<largeurDuTableau;posX+=100){
                let etoileY=350+Math.sin(posX)*100;
                let star=this.stars.create(posX ,etoileY,"star");
                star.body.allowGravity=false;
                let plate=this.platforms.create(posX ,etoileY+50,"ground");
                plate.setDisplaySize(60,10);
                plate.refreshBody();
            }
            this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
            this.physics.add.collider(this.player,this.platforms);
    

        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        //on ajoute une deuxième couche de ciel
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky2.setScrollFactor(0);
        this.sky2.setOrigin(0,0);
        this.sky2.alpha=0.2;
        //this.sky.tileScaleX=this.sky.tileScaleY=0.8;


        //fait passer les éléments devant le ciel
        this.stars.setDepth(10)
        this.player.setDepth(10)
    }





/*
        //notre monstre 2
        this.monstre=this.physics.add.sprite(600,this.sys.canvas.height-150,"Glaceman");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(70,70);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        //notre monstre 3
        this.monstre=this.physics.add.sprite(500,this.sys.canvas.height-500,"clown");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(70,70);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(0);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        //notre monstre 4
        this.monstre=this.physics.add.sprite(800,this.sys.canvas.height-0,"terry");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(70,70);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(0);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        //notre monstre 5
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-100,"dragon");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(70,70);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);**/
/*
        //MH2
        new Monster(this,700,100);

        //Glaceman
        new Monster2(this,800,100);

        //Clown
        new Monster3(this,300,100);

        //Terry
        new Monster4(this,500,100);

        //Dragon
        new MonsterFly2(this,600,100);
**/
    }





