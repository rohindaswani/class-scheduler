Please unzip the file and follow the following instructions:

##Running the Scheduler
You will see an executable called `scheduler`. In order to invoke it type the command below.
```
./scheduler <file.json>
```
`file.json` is the json file containing the list of classes along with their prerequisites. Here is an example of what the file should look like:
```
[
    {
        "name": "Algebra 1",
        "prerequisites": ["Arithmetic"]
    },
    {
        "name": "Geometry",
        "prerequisites": []
    },
    {
        "name": "Arithmetic",
        "prerequisites": ["Algebra 1"]
    },
    {
        "name": "Algebra 2",
        "prerequisites": ["Algebra 1", "Geometry"]
    },
    {
        "name": "Pre Calculus",
        "prerequisites": ["Algebra 2"]
    },
    {
        "name": "Algebra 0",
        "prerequisites": []
    },
    {
        "name": "Calculus 1",
        "prerequisites": ["Pre Calculus", "Algebra 2", "Algebra 1", "Geometry", "Arithmetic"]
    }
]
```

The output of the `scheduler` will be the order in which classes should be taken such that all prerequisites are met.


###Running the tests

The tests for the project are defined under the directory `./tests`. To run the tests you will need `yarn`. 

Invoke the executable `./test_runner` to run the test suite. `./test_runner` will install the required dependencies and run the tests.

###Designing the Algorithm
Since the problem had to do with scheduling, `topological sort` was the most efficient and obvious algorithm that would give the desired results with a time complexity of `O(V + E)` with `V` being the number of classes and `E` being the total number of prerequisites.

Take a look at `index.js` before reading further. 

Setting up for the topological sort:
1. The module `arrayToDAG` exposes a method `getDAG` that takes the input class list and converts it into a Directed Acyclic Graph.
    ```
    arrayToDAG.getDAG(classArr)
    ```
2. The module `queue` exposes a method `newQueue` that takes an array and returns the queue initialized with that array. The returned `queue` has the following methods on it to `enqueue`, `dequeue`, and `length`.


Topological Sort:
1. Lastly, the module `topologicalSort` provides a way to sort the DAG returned by `arrayToDAG`.

   `getSortedArray` accepts a DAG which is an object that has a key for each node, and the value is an object that has the `name`, an `inDegree` of the node and a list of `next` nodes. An eg. `{ name: 'Arithmetic', inDegree: 1, next: [] }`
    ```
    topologicalSort.getSortedArray(grapg)    
    ```
    The return value is an array containing the ordered list of classes.
    
    
###Time Complexity

The time complexity for this algorithm is O(|V| + |E|), with V being the total number of Nodes and E being the total number of edges.
