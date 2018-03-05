/**
 * ArrayToDAG
 *
 * The arrayToDAG module provides a way to convert a list to a DAG.
 *
 * getDAG 
 * Accepts a list of classes like the one expected.
 * Returns a DAG like the one needed by the topologicalSort module.
 *
 */

module.exports = {
	getDAG: (arr = []) => {
    let dag = {};
    arr.forEach((obj) => {
      if (!dag.hasOwnProperty(obj.name)) {
        dag[obj.name] = {
          name: obj.name,
          next: [],
          inDegree: obj.prerequisites.length
        };
      } else {
        //If a class is present more than once, set inDegree to the last prerequisites array
        dag[obj.name].inDegree = obj.prerequisites.length;
      }
      for (let prerequisite of obj.prerequisites) {
        if (!dag.hasOwnProperty(prerequisite)) {
          dag[prerequisite] = {
            name: prerequisite,
            next: [obj.name]
          };
        } else {
          //Check it is not a cycle
          if (dag[obj.name].next.indexOf(prerequisite) < 0) {
            dag[prerequisite].next.push(obj.name);
          } else {
            throw new Error("Error: A cycle is present");
          }
        }
      }
    });
    return dag;
  }
};
