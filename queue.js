/**
 * Queue
 *
 * The queue module provides a simple interface for a queue.
 *
 * newQueue 
 * Accepts an array and returns initializes the queue with that array.
 * Returns an interface to enqueue, dequeue, print, and poll for length.
 * Enqueue should be O(1) for most JS engines
 * Dequeue is O(1)
 *
 */

module.exports = {
  newQueue: (arr) => {
    let q = arr;
    let begin = 0;
    return {
      enqueue: (e) => {
        q.push(e);
        return true;
      },
      dequeue: () => {
        return q[begin++];
      },
      print: () => {
        console.log(q);
      },
      length: () => {
        return q.length - begin;
      }
    };
  }
};
