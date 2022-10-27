/**
 * @Author: tomfarrelly
 * @Date:   2021-01-19T17:16:18+00:00
 * @Last modified by:   tomfarrelly
 * @Last modified time: 2021-04-23T21:45:51+01:00
 */



class Molecule {

// constructor function is called to create an instance of the molecule object
// this instance holds all default paramters associated with the molecule class
  constructor({
      _i,
      px = 200,
      py = 200,
      vx = random(-2.5,2.5),
      vy = random(-2.5,2.5),
      r = random(obj.minMoleculeSize, obj.maxMoleculeSize),
  }) {

    this.position = createVector(px, py);
    this.velocity = createVector(vx, vy);
    this.radius = r;
    this.fillColor = color(0, 0, 255);
    this.index = _i;

  }


// render function - renders each molecule
// every molecule is an ellipse containing an x and y position, and the diameter of each molecule
// with a fill colour and text corresponding to their index value
  render() {
    noStroke()
    fill(this.fillColor);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    fill(0);
    (obj.showText) ? (
      textSize(16),
      textAlign(CENTER),
      text(this.index, this.position.x, this.position.y + 6)) : null;
  }

  // function isIntersecting checks if two Molecules are intersecting
  // take in Molecule as parameter. It measures the distance between two Molecules
  // if their gap is less than or equal to 0 they are overlapping so check is returned as true.

  isIntersecting(_molecule) {

    let distance = dist(this.position.x, this.position.y, _molecule.position.x, _molecule.position.y)
    let gap = distance - this.radius - _molecule.radius;
    let check = (gap <= 0) ? true : false;


    // if check is true...
    if (check) {
      // distance of x values
      let dx = this.position.x - _molecule.position.x;
      // distance of y values
      let dy = this.position.y - _molecule.position.y;

      // normalX = derivitive of x divided by the distance
      let normalX = dx / distance;
      let normalY = dy / distance;


      let dVector = (this.velocity.x - _molecule.velocity.x) * normalX;
      dVector += (this.velocity.y - _molecule.velocity.y) * normalY;

      let dvx = dVector * normalX;
      let dvy = dVector * normalY;

      this.velocity.x -= dvx;
      this.velocity.y -= dvy;

      let indexValue = _molecule.index;

      molecules[indexValue].velocity.x += dvx;
      molecules[indexValue].velocity.y += dvy;

      return check;
    }

  }

// function to decluster molecules if their radius' overlap
  decluster(_otherMolecule) {


    // This is where we want to decluster it to
    let fixedBall = molecules[_otherMolecule.index];

    // track the postion of two vectors and puts the resultant into a new variable
    let resultantV = p5.Vector.sub(this.position, fixedBall.position);

    // declaring a variable to hold the resultant angle of rotation for the vector
    let rHeading = resultantV.heading();
    let rDist = (resultantV.mag() - this.radius - fixedBall.radius) / 2;



    // Here we take away the calculated distance from the current position
    let moveX = cos(rHeading) * rDist;
    let moveY = sin(rHeading) * rDist;


    this.position.x -= moveX;
    this.position.y -= moveY;

    molecules[_otherMolecule.index].position.x += moveX;
    molecules[_otherMolecule.index].position.y += moveY;


  }


// function to move the molecule objects on both x and y axis
// work out conditions for bouncing molecules adding "walls" to the canvas
// if the balls go past the set contraints their velcoity is reverted
  step() {

    (this.position.x > width - this.radius || this.position.x < 0 + this.radius) ?
    this.velocity.x *= -1: null;

    (this.position.y > height - this.radius - graphHeight  || this.position.y < 0 + this.radius ) ?
    this.velocity.y *= -1: null;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;



  }
}
