/**
 * Queue
 *
 * The queue module provides a simple interface for a queue.
 *
 * newQueue 
 * Accepts an array and returns the queue initialized with that array.
 * Returns an interface to enqueue, dequeue, and length.
 * Enqueue should be O(1) for most JS engines
 * Dequeue is O(1)
 *
 */

module.exports = {
  newQueue: (arr = []) => {
    let q = arr;
    let begin = 0; //used to optimize
    return {
      enqueue: (e) => {
        q.push(e);      //amortized O(1)
        return true;
      },
      dequeue: () => {
        if (begin < q.length) {
          return q[begin++];
        } else {
          throw new Error('queue is empty');
        }
      },
      length: () => {
        return q.length - begin;
      }
    };
  }
};
