/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) {
      return 0;
    }
    
    const minDepthHelper = (node) => {
      if (!node) {
        return Infinity;
      }
      
      if (!node.left && !node.right) {
        return 1;
      }
      
      return Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1;
    };
    
    return minDepthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) {
      return 0;
    }
    
    const maxDepthHelper = (node) => {
      if (!node) {
        return 0;
      }
      
      return Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1;
    };
    
    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (!this.root) {
      return 0;
    }

    let maxSum = -Infinity;

    const maxSumHelper = (node) => {
      if (!node) {
        return 0;
      }
      
      const leftMax = Math.max(maxSumHelper(node.left), 0);
      const rightMax = Math.max(maxSumHelper(node.right), 0);
      maxSum = Math.max(maxSum, leftMax + rightMax + node.val);

      return Math.max(leftMax, rightMax) + node.val;
    };

    maxSumHelper(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) {
      return null;
    }

    let nextLargerVal = Infinity;

    const nextLargerHelper = (node) => {
      if (!node) {
        return;
      }

      if (node.val > lowerBound && node.val < nextLargerVal) {
        nextLargerVal = node.val;
      }

      if (node.val > lowerBound) {
        nextLargerHelper(node.left);
        nextLargerHelper(node.right);
      } else if (node.val <= lowerBound) {
        nextLargerHelper(node.right);
      }
    };

    nextLargerHelper(this.root);
    return nextLargerVal === Infinity ? null : nextLargerVal;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };