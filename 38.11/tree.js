class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) {
      return 0;
    }
    
    const addChildren = (node) => {
      let sum = node.val;

      for (let child of node.children) {
        sum += addChildren(child);
      }

      return sum;
    };

    return addChildren(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) {
      return 0;
    }

    const isEven = (node) => {
      let count = node.val % 2 === 0 ? 1 : 0;

      for (let child of node.children) {
        count += isEven(child);
      }

      return count;
    };

    return isEven(this.root);
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) {
      return 0;
    }
    
    const getGreaterThanCount = (node, lowerBound) => {
      let count = node.val > lowerBound ? 1 : 0;

      for (let child of node.children) {
        count += getGreaterThanCount(child, lowerBound);
      }

      return count;
    };

    return getGreaterThanCount(this.root, lowerBound);
  }
}