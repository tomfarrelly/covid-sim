/**
 * @Author: tomfarrelly
 * @Date:   2021-01-19T17:15:34+00:00
 * @Last modified by:   tomfarrelly
 * @Last modified time: 2021-04-23T21:11:21+01:00
 */



let obj = {
    numOfMolecules: 110
    , numRows: 10
    , numCols: 10
    , showText: false
    , loopState: false
    , playButton: false
    , gridState: false
    , lineState: false
    , minMoleculeSize: 10
    , maxMoleculeSize: 10
    , infectionRate: 0.1
    , percentOfInfected: 0.1
};

var gui = new dat.gui.GUI();

gui.remember(obj);

section01 = gui.addFolder('Layout');
section01.add(obj, 'numOfMolecules').min(0).max(1000).step(1).onChange(function () {
    setup();
    draw();
});
section01.add(obj, 'numRows').min(1).max(20).step(1).onChange(function () {
    setup();
    draw();
});
section01.add(obj, 'numCols').min(1).max(20).step(1).onChange(function () {
    setup();
    draw();
});
section01.add(obj, 'showText').onChange(function () {
    draw()
});
section01.add(obj, 'loopState').onChange(function () {
    checkLoop()
});
section01.add(obj, 'playButton').onChange(function () {
    checkLoop()
});
section01.add(obj, 'gridState').onChange(function () {
    draw()
});
section01.add(obj, 'lineState').onChange(function () {
    draw()
});

section02 = gui.addFolder('Design');
// section02.addColor(obj, 'moleculeColor').onChange(function () {
//     draw()
// });
// section02.addColor(obj, 'intersectingColor').onChange(function () {
//     draw()
// });
section02.add(obj, 'minMoleculeSize').min(1).max(50).step(1).onChange(function () {
    setup();
    draw()
});
section02.add(obj, 'maxMoleculeSize').min(1).max(50).step(1).onChange(function () {
    setup();
    draw()
});


section03 = gui.addFolder('Covid');

section03.add(obj, 'infectionRate').min(0.1).max(1).step(0.1).onChange(function () {
    setup();
    draw()
});

section03.add(obj, 'percentOfInfected').min(0.01).max(1).step(0.01).onChange(function () {
    setup();
    draw()
});
