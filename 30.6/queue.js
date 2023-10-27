class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  
  enqueue(val) {
    const node = new Node(val);

    if (!this.first) {
      this.first = node;
      this.last = node;
    } else {
      this.last.next = node;
      this.last = node;
    }

    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    const removed = this.first;

    if (this.size === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = removed.next;
    }

    this.size--;
    return removed.val;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    return this.first.val;
  }

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Queue;