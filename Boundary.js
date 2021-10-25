class Boundary {
  constructor(x, y, width, height) {
    var options = { isStatic: true };
    this.boundary = Bodies.rectangle(x, y, width, height, options);
    World.add(world, this.boundary);
    this.width = width;
    this.height = height;
  }
  display() {
    var pos = this.boundary.position;
    rect(pos.x, pos.y, this.width, this.height);
  }
}
