class Paddle {
  constructor(x, y, width, height, type) {
    var options = {
      friction: 0,
      frictionAir: 0.01,
      density: 0.001,
    };
    this.body = Bodies.rectangle(x, y, width, height, options);

    this.width = width;
    this.height = height;
    this.type = type;
    if (this.type === "left") {
      this.image = loadImage("images/15.png");
    } else {
      this.image = loadImage("images/16.png");
    }
    World.add(world, this.body);
  }

  display() {
    var pos = this.body.position;

    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    noStroke();
    fill(67, 78, 97);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
