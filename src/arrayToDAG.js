/**
 * ArrayToDAG
 *
 * The arrayToDAG module provides a way to convert a list to a DAG.
 * Each object in the list needs to have a 'name' key, and a 'prerequisites' key.
 * If either key is missing it is invalid input.
 *
 * getDAG
 * Accepts a list of classes like the one expected.
 * Returns a DAG like the one needed by the topologicalSort module.
 *
 */

//If the 'name' or 'prerequisites' key is missing, throw an exception
function sanityCheck(obj) {
  if (!obj.hasOwnProperty("name")) {
    throw new Error("'name' key is missing");
  } else if (!obj.hasOwnProperty("prerequisites")) {
    throw new Error("'prerequisites' is missing");
  }
}

module.exports = {
	getDAG: (arr = []) => {
    let dag = {};
    arr.forEach((obj) => {
      sanityCheck(obj);
      if (!dag.hasOwnProperty(obj.name)) {
        dag[obj.name] = {
          name: obj.name,
          next: [],
          inDegree: obj.prerequisites.length
        };
      } else {
        //If a class is present more than once, set inDegree to the last prerequisites.length value
        dag[obj.name].inDegree = obj.prerequisites.length;
      }
      for (let prerequisite of obj.prerequisites) {
        if (!dag.hasOwnProperty(prerequisite)) {
          dag[prerequisite] = {
            name: prerequisite,
            next: [obj.name]
          };
        } else {
          if (dag[obj.name].next.indexOf(prerequisite) < 0) {
            dag[prerequisite].next.push(obj.name);
          } else {
            throw new Error("A cycle is present");
          }
        }
      }
    });
    return dag;
  }
};
