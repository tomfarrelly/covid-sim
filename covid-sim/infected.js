/**
 * @Author: tomfarrelly
 * @Date:   2021-01-19T17:16:18+00:00
 * @Last modified by:   tomfarrelly
 * @Last modified time: 2021-04-23T18:52:50+01:00
 */



class Infected extends Molecule {


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
    this.fillColor = color(248,129,149);
    this.infected = "Infected";
    this.birth = frameCount; //frameCount is a variable used to count the frameRate() of the sketch
    this.lifeLength = 1000; //Life length of 10 seconds

  }

}
