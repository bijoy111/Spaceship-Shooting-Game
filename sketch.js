let blackjet;
let whitejet;
let blackjetimage;
let whitejetimage;
function preload(){
 blackjetimage=loadImage("blackjet.png");
 whitejetimage=loadImage("whitejet.png");
}
function setup() {
  createCanvas(400,400);
  blackjet=new jet(blackjetimage);
  whitejet=new jet(whitejetimage);
}

function draw() {
  background(220);
  blackjet.display();
  whitejet.display();
  blackjet.update();
  whitejet.update();
}
function keyPressed(){
 if(keyCode==RIGHT_ARROW)
   blackjet.rotateamount=-0.05;
  else if(keyCode==LEFT_ARROW)
    blackjet.rotateamount=0.05;
  if(keyCode==87)
    whitejet.rotateamount=0.05;
  else if(keyCode==83)
    whitejet.rotateamount=-0.05;
  if(keyCode==UP_ARROW){
    whitejet.s=1;
    whitejet.iswhite=1;
  }
  else if(keyCode==DOWN_ARROW){
    blackjet.s=1;
    whitejet.iswhite=0;
  }
}
function keyReleased(){
  if(keyCode==RIGHT_ARROW||keyCode==LEFT_ARROW)
    blackjet.rotateamount=0;
  if(keyCode==87||keyCode==83)
    whitejet.rotateamount=0;
  if(keyCode==UP_ARROW)
    whitejet.p=1;
  else if(keyCode==DOWN_ARROW)
    blackjet.p=1;
    
}
class Bullet{
  constructor(x,y,angle,iswhite)
  {
   this.x=x;
    this.y=y;
    this.angle=angle;
    this.iswhite=iswhite;
    this.speed=2;
    this.r=1.5;
    this.s=0;
    this.p=0;
  }
  display(){
   if(this.iswhite){
    push();
     fill(255,0,100);
     ellipse(this.x,this.y,this.r*2,this.r*2);
     pop();
   }
    else{
      push();
     fill(0);
     ellipse(this.x,this.y,this.r*2,this.r*2);
     pop();
    }
  }
  update(jet){
    if(dist(jet.x,jet.y,this.x,this.y)<=this.r+jet.r)
    {
     console.log('game over');
      if(this.iswhite)
        console.log('whitejet is win');
      else
        console.log('blackjet is win');
      blackjet.reset();
      whitejet.reset();
    }
     this.x+=this.speed * sin(this.angle);
    this.y-=this.speed * cos(this.angle);
  }
}
class jet{
 constructor(image){
  this.image=image;
   this.reset();
 }
  reset(){
    this.x=random(width);
   this.y=random(height);
   this.speed=0.7;
   this.angle=0;
   this.rotateamount=0;
   this.bullets=[];
   this.r=10;
  }
   update(){
   this.gothewayfacing();
   this.constraintoscreen();
    this.angle+=this.rotateamount;
  }
  gothewayfacing(){
    this.x+=this.speed * sin(this.angle);
    this.y-=this.speed * cos(this.angle);
  }
   constraintoscreen(){
    if(this.x<-this.image.width)
      this.x=width;
     else if(this.x>width)
       this.x=0;
     if(this.y<-this.image.height)
       this.y=height;
     else if(this.y>height)
       this.y=0;
   }
  display(){
    push();
    translate(this.x,this.y);
    imageMode(CENTER);
    rotate(this.angle);
    image(this.image,0,0);
  pop();
  if(this.s==1&&this.p==1)
    {
      this.shoot();
      this.s=0;
      this.p=0;
    }
    this.displaybullets();
  }
shoot(){
   let bullet = new Bullet(this.x, this.y, this.angle, this.iswhite);
    this.bullets.push(bullet); 
}
  displaybullets(){
  for(let i=this.bullets.length-1;i>=0;i--){
    if(this.iswhite)
   this.bullets[i].update(blackjet);
    if(!this.iswhite)
      this.bullets[i].update(whitejet);
  this.bullets[i].display();
  }
}
}