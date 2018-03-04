let test = require('unit.js');
let arrayToDAG = require('../arrayToDAG');
let topologicalSort = require('../topologicalSort');

const getSchedule = (arr) => (
  topologicalSort.getSortedArray(arrayToDAG.getDAG(arr))
);

describe('topologicalSort', () => {
  describe('With a valid input', () => {

    describe('With an empty schedule', () => {
      it('returns an empty schedule when the list is empty', () => {
        let classArr = [];
        test.array(getSchedule(classArr)).is([]);
      });
    });

    describe('With a non-empty schedule', () => {

      it('returns a valid schedule with one class in the list', () => {
        let classArr = [
          {
            name: 'Economics 101',
            prerequisites: []
          }
        ];
        test.array(getSchedule(classArr)).is(['Economics 101']);
      });

      it('returns a valid schedule independent of the order of classes in the list', () => {
        let classArr = [
          {
            name: 'Economics 102',
            prerequisites: ['Economics 101']
          },
          {
            name: 'Economics 101',
            prerequisites: []
          }
        ];
        test.array(getSchedule(classArr)).is(['Economics 101', 'Economics 102']);
      });

      it('returns a valid schedule with two classes in the list', () => {
        let classArr = [
          {
            name: 'Economics 101',
            prerequisites: []
          },
          {
            name: 'Economics 102',
            prerequisites: []
          }
        ];
        test.array(getSchedule(classArr)).is(['Economics 101', 'Economics 102']);
      });

      it('returns a valid schedule if classes are repeated in the list', () => {
        let classArr = [
          {
            name: 'Economics 102',
            prerequisites: []
          },
          {
            name: 'Economics 101',
            prerequisites: []
          },
          {
            name: 'Economics 102',
            prerequisites: ['Economics 101']
          }
        ];
        test.array(getSchedule(classArr)).is(['Economics 101', 'Economics 102']);
      });

      it('returns a valid schedule with 5 classes and different prerequisites', () => {
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
            prerequisites: ['Economics 201']
          },
          {
            name: 'Economics 340',
            prerequisites: ['Economics 202', 'Economics 201']
          }
        ];
        test.array(getSchedule(classArr)).is(['Economics 101', 'Economics 102', 'Economics 201', 'Economics 202', 'Economics 340']);
      });

      it('returns a valid schedule with 6 classes and different prerequisites', () => {
        let classArr = [
          {
            "name": "Economics 101",
            "prerequisites": []
          },
          {
            "name": "Economics 102",
            "prerequisites": []
          },
          {
            "name": "Economics 201",
            "prerequisites": ["Economics 101"]
          },
          {
            "name": "Economics 202",
            "prerequisites": ["Economics 102"]
          },
          {
            "name": "Economics 400",
            "prerequisites": []
          },
          {
            "name": "Economics 410",
            "prerequisites": ['Economics 201', 'Economics 202', 'Economics 400']
          },
        ];
        test.array(getSchedule(classArr)).is(['Economics 101', 'Economics 102', 'Economics 400', 'Economics 201', 'Economics 202', 'Economics 410']);
      })
    });

  });

  describe('With an invalid input', () => {
    it('Throws an error with one class and a prerequisite', () => {
      let classArr = [
        {
          name: 'Economics 101',
          prerequisites: ['Algebra 1']
        }
      ];
      test.error(() => getSchedule(classArr)).is(new Error("Topological sort is not possible"));
    });

    it('Throws an error when there is a cycle in the schedule', () => {
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
      test.error(() => getSchedule(classArr)).is(new Error('Topological sort is not possible'));
    });
  });
});