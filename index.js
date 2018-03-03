let classArr = require('./tmp/class.json');
let arrayToDAG = require('./arrayToDAG');
let topologicalSort = require('./topologicalSort');

let arr = topologicalSort.getSortedArray(arrayToDAG.getDAG(classArr));

arr.forEach((c) => { console.log(c);});

