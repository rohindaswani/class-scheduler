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
        dag[obj.name].inDegree = obj.prerequisites.length;
      }
      for (let i = 0; i < obj.prerequisites.length; i++) {
        if (!dag.hasOwnProperty(obj.prerequisites[i])) {
          dag[obj.prerequisites[i]] = {
            name: obj.prerequisites[i],
            next: [obj.name]
          };
        } else {
          if (dag[obj.name].next.indexOf(obj.prerequisites[i]) < 0) {
            dag[obj.prerequisites[i]].next.push(obj.name);
          } else {
            throw new Error("Error: A cycle is present");
          }
        }
      }
    });
    return dag;
  }
};
