/**
 * @Author: tomfarrelly
 * @Date:   2021-01-19T17:16:18+00:00
 * @Last modified by:   tomfarrelly
 * @Last modified time: 2021-04-23T21:56:43+01:00
 */



class Recovered extends Molecule {


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

    this.fillColor = color(254,184,234);
    this.recovered = "Recovered";


  }

}
