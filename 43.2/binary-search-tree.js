class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if(this.root === null) {
      this.root = new Node(val);
      return this;
    } else {
      let current = this.root;

      while(true) {
        if(val < current.val) {
          if(current.left !== null) {
            current = current.left;
          } else {
            current.left = new Node(val);
            return this;
          }
        } else if(val > current.val) {
          if(current.right !== null) {
            current = current.right;
          } else {
            current.right = new Node(val);
            return this;
          }
        } else {
          return this;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    function insert(node, val) {
      if(node === null) {
        return new Node(val);
      }

      if(val < node.val) {
        node.left = insert(node.left, val);
      } else if(val > node.val) {
        node.right = insert(node.right, val);
      }

      return node;
    }

    this.root = insert(this.root, val);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while(true) {
      if(current === null) {
        return undefined;
      } else if(val === current.val) {
        return current;
      }

      if(val < current.val) {
        current = current.left;
      } else if(val > current.val) {
        current = current.right;
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    function find(node, val) {
      if(node === null) {
        return undefined;
      } else if(val === node.val) {
        return node;
      }

      if(val < node.val) {
        return find(node.left, val);
      } else if(val > node.val) {
        return find(node.right, val);
      }
    }

    return find(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let visited = [];

    function visit(node) {
      if(node === null) {
        return;
      }

      visited.push(node.val);

      visit(node.left);
      visit(node.right);
    }

    visit(this.root);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let visited = [];

    function visit(node) {
      if(node === null) {
        return;
      }

      visit(node.left);
      visited.push(node.val);
      visit(node.right);
    }

    visit(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let visited = [];

    function visit(node) {
      if(node === null) {
        return;
      }

      visit(node.left);
      visit(node.right);
      visited.push(node.val);
    }

    visit(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let visited = [], queue = [];
    
    if (this.root !== null) {
      queue.push(this.root);
      
      while (queue.length > 0) {
        let current = queue.shift();
        
        visited.push(current.val);
        
        if (current.left !== null) {
          queue.push(current.left);
        }
        
        if (current.right !== null) {
          queue.push(current.right);
        }
      }
    }

    return visited;
}

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
