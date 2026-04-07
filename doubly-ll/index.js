const assert = require("node:assert/strict");

class Node {
    constructor (value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor () {
        this.root = null;
    }

    append (value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        let currentNode = this.root;
        while (currentNode.next !== null) {
            currentNode = currentNode.next;
        }
        currentNode.next = newNode;
        newNode.prev = currentNode;
    }

    delete (value) {
        if (!this.root) {
            return;
        }
        let currentNode = this.root;
        while (currentNode && currentNode.value !== value) {
            currentNode = currentNode.next;
        }

        if (currentNode === null) return;

        const prevNode = currentNode.prev === null ? null : currentNode.prev;
        const nextNode = currentNode.next;

        if (prevNode === null) {
            this.root = nextNode;
        } else {
            prevNode.next = nextNode;
        }
        if (nextNode)
            nextNode.prev = prevNode;

    }
}

// Test cases and related function, not part of my implementation.

function toArrayForward (list) {
    const values = [];
    let currentNode = list.root;

    while (currentNode !== null) {
        values.push(currentNode.value);
        currentNode = currentNode.next;
    }

    return values;
}

function toArrayBackward (list) {
    const values = [];
    let currentNode = list.root;

    if (currentNode === null) return values;

    while (currentNode.next !== null) {
        currentNode = currentNode.next;
    }

    while (currentNode !== null) {
        values.push(currentNode.value);
        currentNode = currentNode.prev;
    }

    return values;
}

function getTail (list) {
    let currentNode = list.root;

    if (currentNode === null) return null;

    while (currentNode.next !== null) {
        currentNode = currentNode.next;
    }

    return currentNode;
}

function assertBidirectionalLinks (list) {
    let currentNode = list.root;
    let previousNode = null;

    while (currentNode !== null) {
        assert.strictEqual(
            currentNode.prev,
            previousNode,
            "each node.prev should point to the previous node"
        );

        if (currentNode.next !== null) {
            assert.strictEqual(
                currentNode.next.prev,
                currentNode,
                "each node.next.prev should point back to the current node"
            );
        }

        previousNode = currentNode;
        currentNode = currentNode.next;
    }
}

function assertListState (list, expectedValues) {
    assert.deepStrictEqual(toArrayForward(list), expectedValues);
    assert.deepStrictEqual(toArrayBackward(list), [...expectedValues].reverse());

    if (expectedValues.length === 0) {
        assert.strictEqual(list.root, null);
        return;
    }

    assert.strictEqual(list.root.prev, null);
    assert.strictEqual(getTail(list).next, null);
    assertBidirectionalLinks(list);
}

function buildList (...values) {
    const list = new DoublyLinkedList();

    for (const value of values) {
        list.append(value);
    }

    return list;
}

function runTest (name, testFn) {
    try {
        testFn();
        console.log(`PASS: ${name}`);
        return true;
    } catch (error) {
        console.log(`FAIL: ${name}`);
        console.log(`  ${error.name}: ${error.message}`);
        return false;
    }
}

function runAllTests () {
    const tests = [
        {
            name: "append builds a valid list from empty to many nodes",
            testFn () {
                const list = buildList(10, 20, 30, 40);

                assertListState(list, [10, 20, 30, 40]);
            }
        },
        {
            name: "delete is a no-op for empty lists and missing values",
            testFn () {
                const emptyList = new DoublyLinkedList();
                const list = buildList(10, 20, 30);

                assert.doesNotThrow(() => emptyList.delete(10));
                assertListState(emptyList, []);
                assert.doesNotThrow(() => list.delete(999));
                assertListState(list, [10, 20, 30]);
            }
        },
        {
            name: "delete handles head, middle, tail, last node, and reuse after emptying",
            testFn () {
                const list = buildList(10, 20, 30, 40);

                list.delete(10);
                assertListState(list, [20, 30, 40]);
                
                list.delete(30);
                assertListState(list, [20, 40]);
                
                list.delete(40);
                assertListState(list, [20]);

                list.delete(20);
                assertListState(list, []);

                list.append(50);
                assertListState(list, [50]);
            }
        },
        {
            name: "delete removes only the first matching duplicate and append still works after deletion",
            testFn () {
                const list = buildList(0, false, false, "");

                list.delete(false);
                assertListState(list, [0, false, ""]);

                list.append(null);
                assertListState(list, [0, false, "", null]);

                list.delete(false);
                assertListState(list, [0, "", null]);
            }
        }
    ];

    let passedCount = 0;

    for (const { name, testFn } of tests) {
        if (runTest(name, testFn)) {
            passedCount += 1;
        }
    }

    const failedCount = tests.length - passedCount;

    console.log(`\n${passedCount}/${tests.length} tests passed.`);

    if (failedCount > 0) {
        process.exitCode = 1;
    }
}

if (require.main === module) {
    runAllTests();
}

module.exports = { Node, DoublyLinkedList };
