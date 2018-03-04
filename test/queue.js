let test = require('unit.js');
let queue = require('../queue');

describe('queue', () => {

  beforeEach(() => {
    q = queue.newQueue();
  });

  it('is empty', () => {
    test.value(q.length()).is(0);
  });

  it('can enqueue', () => {
    q.enqueue(5);
    test.value(q.length()).is(1);
    q.enqueue(6);
    test.value(q.length()).is(2);
  });

  it('can dequeue when is queue is not empty', () => {
    q.enqueue(3);
    q.enqueue(4);
    q.enqueue(6);

    test.value(q.dequeue()).is(3);
    test.value(q.dequeue()).is(4);
  });

  it('throws error when dequeing an empty queue', () => {
    test.error(() => q.dequeue()).is(new Error('queue is empty'));
  })
});