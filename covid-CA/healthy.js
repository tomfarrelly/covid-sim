/**
 * @Author: tomfarrelly
 * @Date:   2021-01-19T17:16:18+00:00
 * @Last modified by:   tomfarrelly
 * @Last modified time: 2021-04-22T17:07:17+01:00
 */



class Healthy extends Molecule {
  constructor({
    _i,
    px = 200,
    py = 200,
    vx = random(-2.5,2.5),
    vy = random(-2.5,2.5),
    r = random(obj.minMoleculeSize, obj.maxMoleculeSize)
  }){
    super({
      _i,
      px,
      py,
      vx,
      vy,
      r
    });
    this.fillColor = color(73,162,142);
    this.healthy = "Healthy";

  }

}
