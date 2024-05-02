/** Node: node for a singly linked list. */
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */
class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    // Add values to the list if provided
    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */
  push(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  /** unshift(val): add new value to start of list. */
  unshift(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  /** pop(): return & remove last item. */
  pop() {
    if (!this.head) {
      return;
    }

    let current = this.head;
    let previous = null;

    while (current.next) {
      previous = current;
      current = current.next;
    }

    if (previous) {
      previous.next = null;
      this.tail = previous;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.length--;
    return current.val;
  }

  /** shift(): return & remove first item. */
  shift() {
    if (!this.head) {
      return;
    }

    const removed = this.head;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.length--;
    return removed.val;
  }

  /** getAt(idx): get val at idx. */
  getAt(idx) {
    if (idx < 0 || idx >= this.length) {
      return null;
    }

    let current = this.head;

    for (let i = 0; i < idx; i++) {
      current = current.next;
    }

    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */
  setAt(idx, val) {
    if (idx < 0 || idx >= this.length) {
      return false;
    }

    let current = this.head;

    for (let i = 0; i < idx; i++) {
      current = current.next;
    }

    current.val = val;
    return true;
  }

  /** insertAt(idx, val): add node w/val before idx. */
  insertAt(idx, val) {
    if (idx === 0) {
      this.unshift(val);
      return true;
    }

    if (idx === this.length) {
      this.push(val);
      return true;
    }

    if (idx < 0 || idx > this.length) {
      return false;
    }

    let current = this.head;

    for (let i = 0; i < idx - 1; i++) {
      current = current.next;
    }

    const newNode = new Node(val);

    newNode.next = current.next;
    current.next = newNode;
    this.length++;

    return true;
  }

  /** removeAt(idx): return & remove item at idx, */
  removeAt(idx) {
    if (idx === 0) {
      return this.shift();
    }

    if (idx === this.length - 1) {
      return this.pop();
    }

    if (idx < 0 || idx >= this.length) {
      return null;
    }

    let current = this.head;
    let previous = null;

    for (let i = 0; i < idx; i++) {
      previous = current;
      current = current.next;
    }

    previous.next = current.next;
    this.length--;

    return current.val;
  }

  /** average(): return an average of all values in the list */
  average() {
    if (this.length === 0) {
      return 0;
    }

    let sum = 0;
    let current = this.head;

    while (current) {
      sum += current.val;
      current = current.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;