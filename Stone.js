class Stone {
constructor(x,y,w,h){

let options={
restitution:0.01
}

this.body = Bodies.rectangle(x,y,w,h,options);
this.w = w;
this.h = h;
this.image = loadImage("stone.png");

World.add(world,this.body);
}
show(){

let pos = this.body.position;
push();
translate(pos.x, pos.y);
fill("white");
imageMode(CENTER);
image(this.image,0,0,this.w,this.h);
pop();
}
}
//image(this.image, 0, 0, this.r, this.r);