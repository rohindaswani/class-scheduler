/**
 * TopologicalSort
 *
 * The topologicalSort module provides a way to topologically sort a DAG.
 *
 * getSortedArray 
 * Accepts an object which represents a DAG.
 *     The object must have a key for each node of the DAG. 
 *     The value should be an object that has the in degree of the node 
 *     and an list of next nodes.
 *     {"inDegree": 1, "next": []}
 * Returns an array of topologically sorted names of the DAG.
 *
 */

let queue = require('./queue');

function getZeroList(graph) {
  let zeroList = [];
  for (let key in graph) {
    if (graph[key].inDegree === 0) {
      zeroList.push(key);
    }
  }
  return zeroList;
}

module.exports = {
  "getSortedArray": (graph) => {
    let sortedArr = [];
    let visited = 0;
    let q = queue.newQueue(getZeroList(graph));
    while (q.length() !== 0) {
      let key = q.dequeue();
      visited++;
      sortedArr.push(key);
      let obj = graph[key];
      obj.next.forEach((nextClass) => {
        graph[nextClass].inDegree--;
        if (graph[nextClass].inDegree === 0) {
          q.enqueue(nextClass);
        }
      });
    }
    if (visited !== Object.keys(graph).length) {
      console.log('Topological sort is not possible.');
      return null;
    }
    return sortedArr;
  }
}
