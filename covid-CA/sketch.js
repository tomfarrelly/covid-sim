/**
 * @Author: tomfarrelly
 * @Date:   2021-01-19T17:18:37+00:00
 * @Last modified by:   tomfarrelly
 * @Last modified time: 2021-04-23T22:01:54+01:00
 */

// Dublin Population = 1,100,000 ÷ 10,000 = 110 Molecules
// January 2021 infection rate = 100,000 ÷ 10,000 new cases over a 30 day period
// Infection rate = 1,100,000 ÷ 100,000 = 11 ÷ Dublin Population ( 110 ) = 0.1
// Population wearing masks = 90%




let molecules = [];
let grid = [];
let graphArray = [];
let graphHeight = 200;
let colWidth, rowHeight;
let checkNum = 0;
let healthy;
let infected;
let recovered;
let countHealthy;
let countInfected;
let countRecovered;
let recoveredHeight;


function setup() {
    createCanvas(1000, 1000);
    colWidth = width / obj.numCols;
    rowHeight = height / obj.numRows;
    molecules = [];




// Pushing each molecule into array with their respective index value
// in a for loop with nested if statements to iterated through to assign
// each object to the respective class
    for (let i = 0; i < obj.numOfMolecules; i++) {
      let randomNum = random();

      if (randomNum < obj.percentOfInfected){
        molecules.push(new Infected({_i: i}));

      } else {
        molecules.push(new Healthy({_i: i}));

      }


    }
    gridify();
    checkLoop();

}

function draw() {

    background(255);

// for each loop, passing in the molecule parameter, for each individual molecule
// and calling the reset function to return each molecule to its original colour


    //calling check infected fucntion turning infected balls into recovered
    checkInfected();
    splitObjectIntoGrid();



    // if statement to  call toggle drawGrid() in GUI
    obj.gridState ? drawGrid() : null;



// Calling render() and step() functions from molecules.js for each molecule
    molecules.forEach((molecule) => {

      molecule.render();
      molecule.step();



    });


    drawGraphCount();
}



// Function for each molecule to check the distance of each other molecule within their zone.
// _collection parameter is passed in from splitObjectIntoGrid().
// Nested for loop iterating thorugh every second molecule (molecule B) within molecule A
// using the length property to return the number of elements (molecules) in the array.
// Assigning molecule A + B to the molecules array with the collection parameter paassed in
// making it a 3D array.
// A - if statement to toggle the line being drawn between molecules.
// B - if statement - if molecule A interesecting molecule B to call change color else dont.
// C - if statement - if an infected molecule A intersects a healthy molecule B and the random number genreated
// is less than the infection rate, an infected moleule is created storing the same values as the healthy
// molecule in a temporary object which is then added to the molecules array

function checkIntersections(_collection) {

    for (let a = 0; a < _collection.length; a++) {
        for (let b = a + 1; b < _collection.length; b++) {
            let moleculeA = molecules[_collection[a]];
            let moleculeB = molecules[_collection[b]];
           if (obj.lineState) {  // A //
                stroke(125, 100);
                line(moleculeA.position.x, moleculeA.position.y, moleculeB.position.x, moleculeB.position.y);
            };

            if (moleculeA.isIntersecting(moleculeB))  // B //
            {
              moleculeA.decluster(moleculeB);
              if(moleculeA.constructor.name == "Infected" && moleculeB.constructor.name == "Healthy") // C //
              {
                let randNum = random();

                if(randNum < obj.infectionRate)
                {
                  let tempObject = new Infected({
                    _i: moleculeB.index,
                    px: moleculeB.position.x,
                    py: moleculeB.position.y,
                    vx: moleculeB.velocity.x,
                    vy: moleculeB.velocity.y,
                  });

                molecules[moleculeB.index] = tempObject;
                }
              }else if(moleculeB.constructor.name == "Infected" && moleculeA.constructor.name == "Healthy")
              {
                let randNum = random();
                if(randNum < obj.infectionRate)
                {
                  let tempObject = new Infected({
                    _i: moleculeA.index,
                    px: moleculeA.position.x,
                    py: moleculeA.position.y,
                    vx: moleculeA.velocity.x,
                    vy: moleculeA.velocity.y,
                  });

                molecules[moleculeA.index] = tempObject;
                }
            }

        }
    }
}
}







// Function to populate the 3D array based on the molecules
// position within the canvas.
// Uses a nested loop iterating through columns(i) within rows(j).
// moleculeCollection = filtering the molecules array to check each molecule in cell
// making a collection of position of x and y is within each segment of the grid.
// Storing the indexs of the molecules to the filtered array using map().
// Passes the moleculeCollection to checkIntersections().


function splitObjectIntoGrid() {
 checkNum = 0;
// console.timeEnd("timer");
    for (let j = 0; j < obj.numRows; j++) {
        for (let i = 0; i < obj.numCols; i++) {

            let moleculeCollection = molecules.filter(molecule =>
                molecule.position.x > (i * colWidth) &&
                molecule.position.x < ((i + 1) * colWidth) &&
                molecule.position.y > j * rowHeight &&
                molecule.position.y < (j + 1) * rowHeight
            ).map(molecule => molecule.index);


            checkIntersections(moleculeCollection);
        }
    }

}

// Function to space molecules equally apart within the canvas.
// Declare 2 variables numDivisions and spacing.
// numDivision = no. of molecules sqr'd and rounded up to a whole number
// spacing = canvas width - 40px / the numDivisions above.
// Loop that iterates through each moleculeindex in the molecules array.
// Defines colPos by finding the remainder of index % numDivisions
// and then multiplying by the spacing variable.
// Defines rowPos by dividing the index and numDivision, rounding down
// and then multiplying by the spacing variable.
// Assign moleculepos X and moleculepos Y to the colPos and rowPos variables and adding 20px.

function gridify() {
    let numDivision = ceil(Math.sqrt(obj.numOfMolecules));
    let spacingY = (width - (obj.minMoleculeSize*2)) / numDivision;
    let spaceX = (height - graphHeight - (obj.minMoleculeSize*2)) / numDivision;

    molecules.forEach((molecule, _i) => {

        let colPos = (_i % numDivision) * spacingY;
        let rowPos = floor(_i / numDivision) * spaceX;
        //console.log(`The col pos ${colPos} and the row pos ${rowPos}`);
        molecule.position.x = colPos + (obj.maxMoleculeSize*2);
        molecule.position.y = rowPos + (obj.maxMoleculeSize*2);

    });
}



//Function to draw a graph based on the corresponding data of the molecules

function drawGraphCount() {
  {

    //for loop itterating through the numOfMolecules
    //if the health of the molecule is healthy count the molecules;
    //if the health of the molecule is infected count the molecules;
    //if the health of the molecule is recovered count the molecules;
    for (let i = 0; i < obj.numOfMolecules; i++) {
      if (molecules[i].healthy == "Healthy") {
        countHealthy++;
      }

      if (molecules[i].infected == "Infected") {
        countInfected++;
      }

      if (molecules[i].recovered == "Recovered") {
        countRecovered++;
      }
    }



    fill(74,74,74);
    rect(0,800,1000,200);
    //setting text size and placement

    textAlign(LEFT);
    textSize(25);

    textFont("Open+Sans");
    fill(73,162,142);
    ellipse(25,842,20,20) + text(" Healthy: " + countHealthy, 35, 850);

    fill(248,129,149);
    ellipse(25,892,20,20) + text("Infected: " + countInfected, 42, 900);

    fill(254,184,234);
    ellipse(25,942,20,20) + text("Recovered: " + countRecovered, 40, 950)

    fill(254,184,234);
    text("Masks: " + ( 100 - (  obj.infectionRate * 100)) + "%", 800, 850)


    //mapping the graph heights repsective of the amount of molecules for each variable
    let iHeight = map(countInfected, 0, obj.numOfMolecules, 0, graphHeight);
    let hHeight = map(countHealthy, 0, obj.numOfMolecules, 0, graphHeight);
    let recoveredHeight = map(countRecovered, 0, obj.numOfMolecules, 0, graphHeight);

    // setting counters to 0
    countHealthy = 0;
    countInfected = 0;
    countRecovered = 0;


    // length of graph set to a max of 500 pixels
    if (graphArray.length >= 500) {
      graphArray.shift();
    }



    //pushing into graphArray with the amount of molecules of each graph and their corresponding graph heights
    graphArray.push({
      countInfected: countInfected,
      countHealthy: countHealthy,
      countInfected: countInfected,
      iHeight: iHeight,
      hHeight: hHeight,
      recoveredHeight: recoveredHeight
    })
    //console.log(graphArray);



    push();
    translate(250, 1000);
    graphArray.forEach(function(data, index) {

      //setting the colour and shape of the graph
      noStroke();
      fill(248,129,149);
      rect(index, 0, 1, -data.iHeight);
      //healthy graph
      fill(73,162,142);
      rect(index, -data.iHeight, 1, - data.hHeight);
      //recovered graph
      fill(254,184,234);
      rect(index, -data.iHeight - data.hHeight, 1, -data.recoveredHeight);

    })
    pop();



  }
}

// function to turn infected balls into recovered after their life cycle
// each infected molecule will become recovered when the sum of
// each infected lifecycle and when they became infected is less
// than the frame count. A temporary object is created holding the index,
// x position and y position values followed by a splice function to insert
// the recovered molecule into molecules array

function checkInfected() {
  molecules.forEach((molecule) => {
    if (frameCount > molecule.birth + molecule.lifeLength) {

        let tempObject = {
          _i: molecule.index,
          px: molecule.position.x,
          py: molecule.position.y
        }
        molecules.splice(tempObject._i, 1, new Recovered(tempObject));
    }
  });
}



// The function drawGrid draws a grid using a nested loop iterating columns(i)
// within rows(j). colWidth and rowWidth are calculated in the setup(). The style
// of grid is defined by fill, stroke and strokeWeight. There
// are no parameters required to fulfil the function and no returns

function drawGrid()
{
    noFill();
    stroke(155, 155, 155, 50);
    strokeWeight(1);

    for (let j = 0; j < obj.numRows; j++) {
        for (let i = 0; i < obj.numCols; i++) {
            //
            rect(i * colWidth, j * rowHeight, colWidth, rowHeight)
        }
    }
}

function checkLoop()
{
    if (obj.loopState) {
        loop();
    }
    else {
        noLoop();
    }
}
