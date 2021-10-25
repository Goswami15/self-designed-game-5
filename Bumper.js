class Bumper {
  constructor(x, y) {
    var options = {
      label: "bumper",
      isStatic: true,
    };
    this.body = Bodies.circle(x, y, 25, options);
    this.body.restitution = 1.5;
    World.add(world, this.body);
  }
  display() {
    var pos = this.body.position;
    ellipseMode(RADIUS);
    fill("yellow");
    ellipse(pos.x, pos.y, 25, 25);
  }
}
