class Tir extends ObjetPhysique{
    constructor(scene, x, y){
       super(scene, x, y, "tir");
       scene.add.existing(this);
       scene.physics.add.existing(this);
 
       this.body.allowGravity=false;
       this.setDisplaySize(30,10);
       this.setBodySize(this.body.width,this.body.height);
 
       this.setVelocityX(450*scene.player.sens);
       this.setBounce(1);
       this.setDepth(1000);
       let tir =this;
      scene.monstersContainer.iterate(monster=>{
         scene.physics.add.overlap(this, monster, function(){monster.Tmortlol(); tir.destroy()}, null, scene);
      })
      scene.physics.add.collider(this, scene.sol, function(){
         tir.destroy()
      });
      // scene.monstersContainer.iterate(monster2=>{
      //    scene.physics.add.overlap(this, monster2, function(){monster2.Tmortlol()}, null, scene);
      // })
      // scene.monstersContainer.iterate(monster3=>{
      //    scene.physics.add.overlap(this, monster3, function(){monster3.Tmortlol()}, null, scene);
      // })
      // scene.monstersContainer.iterate(monster4=>{
      //    scene.physics.add.overlap(this, monster4, function(){monster4.Tmortlol()}, null, scene);
      // })
      // scene.monstersContainer.iterate(monster5=>{
      //    scene.physics.add.overlap(this, monster5, function(){monster5.Tmortlol()}, null, scene);
      // })
      // scene.monstersContainer.iterate(monster6=>{
      //    scene.physics.add.overlap(this, monster6, function(){monster6.Tmortlol()}, null, scene);
      // })
      // scene.monstersContainer.iterate(monster7=>{
      //    scene.physics.add.overlap(this, monster7, function(){monster7.Tmortlol()}, null, scene);
      // })
    }
 }