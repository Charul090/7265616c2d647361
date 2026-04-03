class Node {
    constructor (value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    insert (value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let currentNode = this.root;
        while (currentNode !== null) {
            const parentNode = currentNode;
            const isBiggerThanParent = currentNode.value <= value;
            const childNode = isBiggerThanParent ? parentNode.right : parentNode.left;
            if (childNode === null) {
                if (isBiggerThanParent) {
                    parentNode.right = newNode;
                } else {
                    parentNode.left = newNode;
                }
            }
            currentNode = childNode;
        }
    }
}

function assert(condition, message) {
    if (!condition) {
        console.error(`✗ FAIL: ${message}`);
    } else {
        console.log(`✓ PASS: ${message}`);
    }
}

// ──────────────────────────────────────────────
// Test Cases
// ──────────────────────────────────────────────

// Test 1: Empty tree
(function testEmptyTree() {
    const bst = new BST();
    assert(bst.root === null, 'new BST has null root');
})();

// Test 2: Insert single node becomes root
(function testSingleInsert() {
    const bst = new BST();
    bst.insert(10);
    assert(bst.root !== null, 'root is not null after insert');
    assert(bst.root.value === 10, 'root value is 10');
    assert(bst.root.left === null, 'root left is null');
    assert(bst.root.right === null, 'root right is null');
})();

// Test 3: Smaller value goes left
(function testInsertLeft() {
    const bst = new BST();
    bst.insert(10);
    bst.insert(5);
    assert(bst.root.left !== null, 'left child exists');
    assert(bst.root.left.value === 5, 'left child value is 5');
    assert(bst.root.right === null, 'right child is still null');
})();

// Test 4: Larger value goes right
(function testInsertRight() {
    const bst = new BST();
    bst.insert(10);
    bst.insert(15);
    assert(bst.root.right !== null, 'right child exists');
    assert(bst.root.right.value === 15, 'right child value is 15');
    assert(bst.root.left === null, 'left child is still null');
})();

(function testMultipleInserts() {
    const bst = new BST();
    [10, 5, 15, 3, 7].forEach(v => bst.insert(v));

    assert(bst.root.value === 10, 'root is 10');
    assert(bst.root.left.value === 5, 'left of root is 5');
    assert(bst.root.right.value === 15, 'right of root is 15');
    assert(bst.root.left.left.value === 3, 'left-left is 3');
    assert(bst.root.left.right.value === 7, 'left-right is 7');
})();

// Test 6: Duplicate value goes right
(function testDuplicateGoesRight() {
    const bst = new BST();
    bst.insert(10);
    bst.insert(10);
    assert(bst.root.right !== null, 'duplicate inserted to right');
    assert(bst.root.right.value === 10, 'right child is also 10');
    assert(bst.root.left === null, 'left is still null');
})();

// Test 7: Sorted ascending input creates right-skewed tree
(function testAscendingInput() {
    const bst = new BST();
    [1, 2, 3, 4].forEach(v => bst.insert(v));

    assert(bst.root.value === 1, 'root is 1');
    assert(bst.root.right.value === 2, '1 -> right is 2');
    assert(bst.root.right.right.value === 3, '2 -> right is 3');
    assert(bst.root.right.right.right.value === 4, '3 -> right is 4');
    assert(bst.root.left === null, 'no left children anywhere');
})();

// Test 8: Sorted descending input creates left-skewed tree
(function testDescendingInput() {
    const bst = new BST();
    [4, 3, 2, 1].forEach(v => bst.insert(v));

    assert(bst.root.value === 4, 'root is 4');
    assert(bst.root.left.value === 3, '4 -> left is 3');
    assert(bst.root.left.left.value === 2, '3 -> left is 2');
    assert(bst.root.left.left.left.value === 1, '2 -> left is 1');
    assert(bst.root.right === null, 'no right children anywhere');
})();

// Test 9: Negative values work correctly
(function testNegativeValues() {
    const bst = new BST();
    [0, -5, 5].forEach(v => bst.insert(v));

    assert(bst.root.value === 0, 'root is 0');
    assert(bst.root.left.value === -5, 'left is -5');
    assert(bst.root.right.value === 5, 'right is 5');
})();

(function testLargerTree() {
    const bst = new BST();
    [20, 10, 30, 5, 15, 25, 35].forEach(v => bst.insert(v));

    assert(bst.root.value === 20, 'root is 20');
    assert(bst.root.left.value === 10, 'left is 10');
    assert(bst.root.right.value === 30, 'right is 30');
    assert(bst.root.left.left.value === 5, '10 -> left is 5');
    assert(bst.root.left.right.value === 15, '10 -> right is 15');
    assert(bst.root.right.left.value === 25, '30 -> left is 25');
    assert(bst.root.right.right.value === 35, '30 -> right is 35');
})();

console.log('\n── All tests executed ──');
