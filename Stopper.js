class Stopper {
  constructor(x, y, side, position) {
    var options = {
      isStatic: true,
    };
    this.body = Bodies.circle(x, y, 40, options);
    World.add(world, this.body);
  }
}
