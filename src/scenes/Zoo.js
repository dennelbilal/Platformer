class Zoo extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('MH2', 'assets/MH2.png');
        this.load.image('Glaceman', 'assets/Glaceman.jpg');
        this.load.image('clown', 'assets/clown.jpg');
        this.load.image('terry', 'assets/terry.png');
        this.load.image('dragon', 'assets/dragon.png');
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
        /*this.monstre=this.physics.add.sprite(1000,this.sys.canvas.height-70,"MH2");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(70,70);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);


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

        new monster(this,400,100);
        new monster(this,400,100);
        new monster(this,400,100);
        new monster(this,400,100);
        new monster(this,400,100);
    }




}
