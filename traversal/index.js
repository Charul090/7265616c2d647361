
const assert = require('assert');
const test = require('node:test');

function postorder(root) {
    const traversal = [];
    if (root.left)
        traversal.push(...postorder(root.left));

    if (root.right)
        traversal.push(...postorder(root.right));

    traversal.push(root.data);

    return traversal;
}

function preorder(root) {
    const traversal = [root.data];
    if (root.left)
        traversal.push(...preorder(root.left));

    if (root.right)
        traversal.push(...preorder(root.right));

    return traversal;
}

function inorder(root) {
    const traversal = [];
    if (root.left)
        traversal.push(...inorder(root.left));
    traversal.push(root.data);
    if (root.right)
        traversal.push(...inorder(root.right));

    return traversal;
}

// Test Cases //

function node(data, left = null, right = null) {
    return { data, left, right };
}

function cloneTree(tree) {
    return structuredClone(tree);
}

const treeCases = [
    {
        name: 'single-node tree',
        tree: node(1),
        preorder: [1],
        inorder: [1],
        postorder: [1],
    },
    {
        name: 'complete binary tree',
        tree: node(1, node(2, node(4), node(5)), node(3, node(6), node(7))),
        preorder: [1, 2, 4, 5, 3, 6, 7],
        inorder: [4, 2, 5, 1, 6, 3, 7],
        postorder: [4, 5, 2, 6, 7, 3, 1],
    },
    {
        name: 'left-skewed tree',
        tree: node(1, node(2, node(3, node(4)))),
        preorder: [1, 2, 3, 4],
        inorder: [4, 3, 2, 1],
        postorder: [4, 3, 2, 1],
    },
    {
        name: 'right-skewed tree',
        tree: node(1, null, node(2, null, node(3, null, node(4)))),
        preorder: [1, 2, 3, 4],
        inorder: [1, 2, 3, 4],
        postorder: [4, 3, 2, 1],
    },
    {
        name: 'sparse tree with missing children',
        tree: node(10, node(5, null, node(7)), node(15, node(12), node(20))),
        preorder: [10, 5, 7, 15, 12, 20],
        inorder: [5, 7, 10, 12, 15, 20],
        postorder: [7, 5, 12, 20, 15, 10],
    },
    {
        name: 'tree with duplicate and negative values',
        tree: node(0, node(-1, null, node(-1)), node(2, node(2))),
        preorder: [0, -1, -1, 2, 2],
        inorder: [-1, -1, 0, 2, 2],
        postorder: [-1, -1, 2, 2, 0],
    },
];

const traversals = { preorder, inorder, postorder };

for (const testCase of treeCases) {
    for (const [name, traverse] of Object.entries(traversals)) {
        test(`${name} returns the expected order for ${testCase.name}`, () => {
            assert.deepStrictEqual(traverse(cloneTree(testCase.tree)), testCase[name]);
        });
    }
}

const mutationTree = node(
    8,
    node(3, node(1), node(6, node(4), node(7))),
    node(10, null, node(14, node(13)))
);

for (const [name, traverse] of Object.entries(traversals)) {
    test(`${name} does not mutate the input tree`, () => {
        const tree = cloneTree(mutationTree);
        const original = cloneTree(mutationTree);

        traverse(tree);

        assert.deepStrictEqual(tree, original);
    });

    test(`${name} throws a TypeError when root is null`, () => {
        assert.throws(() => traverse(null), TypeError);
    });

    test(`${name} throws a TypeError when root is undefined`, () => {
        assert.throws(() => traverse(undefined), TypeError);
    });
}
