let test = require('unit.js');
let topologicalSort = require('../src/topologicalSort');

describe('topologicalSort', () => {
  describe('With a valid input', () => {

    describe('With an empty dag', () => {
      it('returns an empty schedule when the dag is empty', () => {
        let dag = [];
        test.array(topologicalSort.getSortedArray(dag)).is([]);
      });
    });

    describe('With a non-empty schedule', () => {

      it('returns a valid schedule with one class in the DAG', () => {
        let dag = {
          "Economics 101": {
            name: "Economics 101",
            next: [],
            inDegree: 0
          }
        };
        test.object(topologicalSort.getSortedArray(dag)).is(['Economics 101']);
      });

      it('returns a valid schedule with two classes in the DAG', () => {
        let dag = {
          "Economics 101": {
            name: 'Economics 101',
            next: [],
            inDegree: 0
          },
          "Economics 102": {
            name: 'Economics 102',
            next: [],
            inDegree: 0
          }
        };
        test.object(topologicalSort.getSortedArray(dag)).is(['Economics 101', 'Economics 102']);
      });

      it('returns a valid schedule with 5 classes and different prerequisites in the DAG', () => {
        let dag = {
          'Economics 101': {
            name: 'Economics 101',
            next: [ 'Economics 102', 'Economics 201' ],
            inDegree: 0
          },
          'Economics 102': {
            name: 'Economics 102',
            next: [ 'Economics 201' ],
            inDegree: 1
          },
          'Economics 201': {
            name: 'Economics 201',
            next: [ 'Economics 202', 'Economics 340' ],
            inDegree: 2
          },
          'Economics 202': {
            name: 'Economics 202',
            next: [ 'Economics 340' ],
            inDegree: 1
          },
          'Economics 340': {
            name: 'Economics 340',
            next: [],
            inDegree: 2
          }
        };
        test.object(topologicalSort.getSortedArray(dag)).is(['Economics 101', 'Economics 102', 'Economics 201', 'Economics 202', 'Economics 340']);
      });

      it('returns a valid schedule with 6 classes and different prerequisites in the DAG', () => {
        let dag = {
          'Economics 101': {
            name: 'Economics 101',
            next: [ 'Economics 201' ],
            inDegree: 0
          },
          'Economics 102': {
            name: 'Economics 102',
            next: [ 'Economics 202' ],
            inDegree: 0
          },
          'Economics 201': {
            name: 'Economics 201',
            next: [ 'Economics 410' ],
            inDegree: 1
          },
          'Economics 202': {
            name: 'Economics 202',
            next: [ 'Economics 410' ],
            inDegree: 1
          },
          'Economics 400': {
            name: 'Economics 400',
            next: [ 'Economics 410' ],
            inDegree: 0
          },
          'Economics 410': {
            name: 'Economics 410',
            next: [], inDegree: 3
          }
        };
        test.object(topologicalSort.getSortedArray(dag)).is(['Economics 101', 'Economics 102', 'Economics 400', 'Economics 201', 'Economics 202', 'Economics 410']);
      })
    });

  });

  describe('With an invalid input', () => {
    it('Throws an error with one class and a prerequisite in the DAG', () => {
      let dag = {
        "Economics 101": {
          name: 'Economics 101',
          next: [],
          inDegree: 0
        },
        "Pre Calculus": {
          name: 'Pre Calculus',
          next: [],
        }
      };
      test.error(() => topologicalSort.getSortedArray(dag)).is(new Error("Topological sort is not possible"));
    });
  });
});