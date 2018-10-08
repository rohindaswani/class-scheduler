let test = require('unit.js');
let arrayToDAG = require('../src/arrayToDAG');

describe('ArrayToDAG', () => {
  describe('With a valid input', () => {

    describe('With no argument or an empty array', () => {
      it('returns an empty object with no argument', () => {
        test.object(arrayToDAG.getDAG()).is({});
      });

      it('returns an empty object with an empty array', () => {
        test.object(arrayToDAG.getDAG([])).is({});
      })
    });

    describe('With a non-empty array', () => {
      it('returns a DAG with a one element array', () => {
        let classArr = [
          {
            name: 'Economics 101',
            prerequisites: []
          }
        ];
        test.object(arrayToDAG.getDAG(classArr)).is({
          "Economics 101": {
            name: "Economics 101",
            next: [],
            inDegree: 0
          }
        });
      });

      it('returns a DAG with a one element array and edge', () => {
        let classArr = [
          {
            name: 'Economics 101',
            prerequisites: ['Algebra 1']
          }
        ];
        test.object(arrayToDAG.getDAG(classArr)).is({
          "Economics 101": {
            name: "Economics 101",
            next: [],
            inDegree: 1
          },
          "Algebra 1": {
            name: "Algebra 1",
            next: ["Economics 101"],
          }
        });
      });

      it('returns a DAG with a two element array', () => {
        let classArr = [
          {
            name: 'Economics 101-01',
            prerequisites: []
          },
          {
            name: 'Economics 101-02',
            prerequisites: []
          }
        ];
        test.object(arrayToDAG.getDAG(classArr)).is({
          "Economics 101-01": {
            name: "Economics 101-01",
            next: [],
            inDegree: 0
          },
          "Economics 101-02": {
            name: "Economics 101-02",
            next: [],
            inDegree: 0
          }
        });
      });

      it('returns a DAG with a three element array with non-unique elements', () => {
        let classArr = [
          {
            name: 'Economics 101',
            prerequisites: []
          },
          {
            name: 'Economics 102',
            prerequisites: []
          },
          {
            name: 'Economics 102',
            prerequisites: ['Economics 101']
          }
        ];
        test.object(arrayToDAG.getDAG(classArr)).is({
          "Economics 101": {
            name: "Economics 101",
            next: ['Economics 102'],
            inDegree: 0
          },
          "Economics 102": {
            name: "Economics 102",
            next: [],
            inDegree: 1
          },
        });
      });

      it('return a DAG with a three element array with edges', () => {
        let classArr = [
          {
            name: 'Economics 101',
            prerequisites: []
          },
          {
            name: 'Economics 102',
            prerequisites: ['Economics 101']
          },
          {
            name: 'Economics 201',
            prerequisites: ['Economics 101', 'Economics 102']
          }
        ];
        test.object(arrayToDAG.getDAG(classArr)).is({
          "Economics 101": {
            name: "Economics 101",
            next: ["Economics 102", 'Economics 201'],
            inDegree: 0
          },
          "Economics 102": {
            name: "Economics 102",
            next: ['Economics 201'],
            inDegree: 1
          },
          "Economics 201": {
            name: 'Economics 201',
            next: [],
            inDegree: 2
          }
        });
      });
    });
  });

  describe('With an invalid input', () => {
    it('Throws an error when the name key is not present', () => {
      let classArr = [
        {
          name: 'Economics 101',
          prerequisites: []
        },
        {
          prerequisites: []
        }
      ];
      test.error(() => arrayToDAG.getDAG(classArr)).is(new Error("'name' key is missing"));
    });

    it('Throws an error when the prerequisites key is not present', () => {
      let classArr = [
        {
          name: 'Economics 101',
          prerequisites: []
        },
        {
          name: 'Economics 102',
        }
      ];
      test.error(() => arrayToDAG.getDAG(classArr)).is(new Error("'prerequisites' key is missing"));
    });

    it('Throws an error when the graph is cyclical', () => {
      let classArr = [
        {
          name: 'Economics 101',
          prerequisites: []
        },
        {
          name: 'Economics 102',
          prerequisites: ['Economics 101']
        },
        {
          name: 'Economics 201',
          prerequisites: ['Economics 101', 'Economics 102']
        },
        {
          name: 'Economics 202',
          prerequisites: ['Economics 201', 'Economics 340']
        },
        {
          name: 'Economics 340',
          prerequisites: ['Economics 202']
        }
      ];
      test.error(() => arrayToDAG.getDAG(classArr)).is(new Error("A cycle is present"));
    })
  });
});
