let classArr = require('./tmp/class.json');
let arrayToDAG = require('./src/arrayToDAG');
let topologicalSort = require('./src/topologicalSort');

let arr = topologicalSort.getSortedArray(arrayToDAG.getDAG(classArr));

arr.forEach((c) => { console.log(c);});

