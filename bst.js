#!/usr/bin/node

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let half = Math.floor(arr.length / 2);
  let left = arr.slice(0, half);
  let right = arr.slice(half);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let merged = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      merged = merged.concat(left[leftIndex]);
      leftIndex++;
    } else {
      merged = merged.concat(right[rightIndex]);
      rightIndex++;
    }
  }

  if (leftIndex >= left.length) {
    merged = merged.concat(right.slice(rightIndex));
  } else {
    merged = merged.concat(left.slice(leftIndex));
  }

  return merged;
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
  setLeft(lefty) {
    this.left = lefty;
  }
  setRight(righty) {
    this.right = righty;
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr, 0, arr.length - 1);
  }
}

function buildTree(arr, start, end) {
  if (start > end) return null;
  let mid = Math.floor((start + end) / 2);
  let root = new Node(arr[mid]);
  root.setLeft(buildTree(arr, start, mid - 1));
  root.setRight(buildTree(arr, mid + 1, end));
  return root;
}

function insertNode(root, data) {
  if (root == null) {
    root = new Node(data);
    return root;
  }

  if (data < root.data) {
    root.left = insertNode(root.left, data);
  } else if (data > root.data) {
    root.right = insertNode(root.right, data);
  }

  return root;
}

function deleteNode(root, data) {
  if (root == null) {
    return root;
  }
  if (data < root.data) {
    root.left = deleteNode(root.left, data);
  } else if (data > root.data) {
    root.right = deleteNode(root.right, data);
  } else {
    if (root.left == null) {
      return root.right;
    } else if (root.right == null) {
      return root.left;
    }
    root.data = minValue(root.right);
    root.right = deleteNode(root.right, root.data);
  }
  return root;
}

function minValue(root) {
  let min = root.data;
  while (root.left != null) {
    min = root.left.data;
    root = root.left;
  }
  return min;
}

function find(root, data) {
  if (root == null || root.data == data) {
    return root;
  }
  if (data < root.data) {
    return find(root.left, data);
  }
  return find(root.right, data);
}

function levelOrder(root, func) {
  let queue = [root];
  let breadthArray = [];

  while (queue[0] != undefined || queue[0] != null) {
    if (queue[0].left != null) queue.push(queue[0].left);
    if (queue[0].right != null) queue.push(queue[0].right);
    breadthArray.push(queue[0].data);
    queue.shift();
  }

  if (func == null) {
    return breadthArray;
  }

  breadthArray.forEach((element) => {
    func(element);
  });
}

function inorder(root, func) {
  let orderedArray = [];
  return inordercalc(root, func);
  function inordercalc(root, func) {
    if (root == null) return;

    orderedArray.push(root.data);
    inordercalc(root.left);
    inordercalc(root.right);

    if (func == null) {
      return orderedArray;
    }

    orderedArray.forEach((element) => {
      func(element);
    });
  }
}

function preorder(root, func) {
  let orderedArray = [];
  return preordercalc(root, func);

  function preordercalc(root, func) {
    if (root == null) return;

    preordercalc(root.left);
    orderedArray.push(root.data);
    preordercalc(root.right);

    if (func == null) {
      return orderedArray;
    }

    orderedArray.forEach((element) => {
      func(element);
    });
  }
}

function postorder(root, func) {
  let orderedArray = [];
  return postordercalc(root, func);

  function postordercalc(root, func) {
    if (root == null) return;

    postordercalc(root.left);
    postordercalc(root.right);
    orderedArray.push(root.data);

    if (func == null) {
      return orderedArray;
    }

    orderedArray.forEach((element) => {
      func(element);
    });
  }
}

function height(node, x) {
  let height = 0;
  height = calcHeight(node, x);

  function calcHeight(root, x) {
    if (root == null) {
      return -1;
    }
    var leftHeight = calcHeight(root.left, x);
    var rightHeight = calcHeight(root.right, x);
    var ans = Math.max(leftHeight, rightHeight) + 1;
    if (root.data == x) height = ans;

    return ans;
  }
  return height;
}

function depth(root, x) {
  if (root == null) return -1;
  var dist = -1;
  if (
    root.data == x ||
    (dist = depth(root.left, x)) >= 0 ||
    (dist = depth(root.right, x)) >= 0
  )
    return dist + 1;
  return dist;
}

function isBalanced(root) {
  if (root == null) return true;
  let left = height(root.left);
  let right = height(root.right);

  if (
    Math.abs(left - right) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  ) {
    return true;
  }
  return false;
}

function rebalance(root) {
  let tempArray = [];
  let queue = [root];

  while (queue[0] != undefined || queue[0] != null) {
    if (queue[0].left != null) queue.push(queue[0].left);
    if (queue[0].right != null) queue.push(queue[0].right);
    tempArray.push(queue[0].data);
    queue.shift();
  }
  tempArray = mergeSort(tempArray);
  tempArray = [...new Set(tempArray)];
  return new Tree(tempArray);
}

function randomArrayGenerator() {
  let array = [];
  let length = Math.floor((Math.random() + 0.4) * 10);
  for (let i = 0; i <= length; i++) {
    array[i] = Math.floor(Math.random() * 100);
  }
  return array;
}

function driverScript() {
  let array = [...new Set(mergeSort(randomArrayGenerator()))];
  let tree = new Tree(array);
  console.log("Original Tree:");
  prettyPrint(tree.root);
  console.log(`Is it balanced: ${isBalanced(tree.root)}`);
  console.log(`Level Order: ${levelOrder(tree.root)}`);
  console.log(`Pre-Order: ${preorder(tree.root)}`);
  console.log(`Post-Order: ${postorder(tree.root)}`);
  console.log(`In-Order: ${inorder(tree.root)}`);
  tree.root = insertNode(tree.root, Math.floor((Math.random() + 0.1) * 1000));
  tree.root = insertNode(tree.root, Math.floor((Math.random() + 0.1) * 1000));
  tree.root = insertNode(tree.root, Math.floor((Math.random() + 0.1) * 1000));
  console.log("New Tree:");
  prettyPrint(tree.root);
  console.log(`Is it balanced: ${isBalanced(tree.root)}`);
  tree = rebalance(tree.root);
  console.log(`Rebalance called.`);
  console.log("New Tree 2.0:");
  prettyPrint(tree.root);
  console.log(`Is it balanced: ${isBalanced(tree.root)}`);
  console.log(`Level Order: ${levelOrder(tree.root)}`);
  console.log(`Pre-Order: ${preorder(tree.root)}`);
  console.log(`Post-Order: ${postorder(tree.root)}`);
  console.log(`In-Order: ${inorder(tree.root)}`);
}

//--------------RUN DRIVER SCRIPT----------------------

//Check console for output.

driverScript();
