class Path {
  constructor(x, y, path) {
    console.log(path);
    var vertices = Matter.Vertices.fromPath(path);
    console.log(vertices);
    this.body = Matter.Bodies.fromVertices(x, y, vertices, { isStatic: true });
    World.add(world, this.body);
  }

  display() {
    fill("red");
    beginShape();
    for (var i; i < PATHS.DOME.length; i + 2) {
      vertex(PATHS.DOME[i], PATHS.DOME[i + 1]);
    }
    endShape();
  }
}
