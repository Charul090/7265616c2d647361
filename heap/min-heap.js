class Node {
    constructor (value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class MinHeapTree {
    constructor () {
        this.heap = null;
        this.queue = [];
    }

    heapifyUp (node) {
        let currentNode = node;
        let parentNode = node.parent;
        while (parentNode !== null && currentNode.value < parentNode.value) {
            [currentNode.value, parentNode.value] = [parentNode.value, currentNode.value];
            currentNode = parentNode;
            parentNode = parentNode.parent;
        }
    }

    heapifyDown (node) {
        let currentNode = node;
        let leftNode = node.left;
        let rightNode = node.right;

        if (leftNode && currentNode.value > leftNode.value) {
            currentNode = leftNode;
        }

        if (rightNode && currentNode.value > rightNode.value) {
            currentNode = rightNode;
        }

        if (node.value !== currentNode.value) {
            [currentNode.value, node.value] = [node.value, currentNode.value];
            this.heapifyDown(currentNode);
        }
    }

    insert (value) {
        const newNode = new Node(value);
        this.queue.push(newNode)
        const newNodeIndex = this.queue.length - 1;
        if (newNodeIndex === 0) {
            this.heap = newNode;
            return;
        }
        const parentNodeIndex = Math.floor((newNodeIndex - 1) / 2);
        newNode.parent = this.queue[parentNodeIndex];
        if (this.queue[parentNodeIndex].left) {
            this.queue[parentNodeIndex].right = newNode;
        } else {
            this.queue[parentNodeIndex].left = newNode;
        }
        this.heapifyUp(newNode);
    }

    delete () {
        if (this.heap === null) return null;

        const min = this.heap.value;
        const lastNode = this.queue.pop();

        if (this.queue.length === 0) {
            this.heap = null;
            return min;
        }

        this.heap.value = lastNode.value;

        if (lastNode.parent.left === lastNode) {
            lastNode.parent.left = null;
        } else {
            lastNode.parent.right = null;
        }

        this.heapifyDown(this.heap);

        return min;
    }

    heapify () {
        const start = Math.floor(this.queue.length / 2 - 1);
        for (let i = start; i >= 0; i--) {
            this.heapifyDown(this.queue[i]);
        }
    }
}

class MinHeap {
    constructor () {
        this.heap = [];
    }

    heapifyUp(index) {
        const parent = Math.floor((index - 1) / 2);

        if (parent >= 0 && this.heap[parent][1] > this.heap[index][1]) {
            [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
            this.heapifyUp(parent);
        }
    }

    heapifyDown(index) {
        let smallest = index;
        const left = 2 * index + 1;
        const right = 2 * index + 2;

        if (left < this.heap.length && this.heap[left][1] < this.heap[smallest][1]) {
            smallest = left;
        }

        if (right < this.heap.length && this.heap[right][1] < this.heap[smallest][1]) {
            smallest = right;
        }

        if (smallest !== index) {
            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            this.heapifyDown(smallest);
        }
    }

    delete() { 
        if (this.heap.length === 0) return null;

        const min = this.heap[0];
        const last = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.heapifyDown(0);
        }

        return min;
    }

    insert(node, distance) {
        this.heap.push([node, distance]);
        this.heapifyUp(this.heap.length - 1);
    }

    heapify () {
        const start = Math.floor(this.heap.length / 2 - 1);
        for (let i = start; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }
}

const sameValue = (actual, expected) => JSON.stringify(actual) === JSON.stringify(expected);

const logTest = (testName, actual, expected) => {
    const passed = sameValue(actual, expected);

    console.log(
        `${passed ? "PASS" : "FAIL"} ${testName}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
    );
};

const deleteAllFromTree = (heap) => {
    const values = [];

    while (heap.queue.length > 0) {
        values.push(heap.delete());
    }

    return values;
};

const deleteAllFromArrayHeap = (heap) => {
    const values = [];

    while (heap.heap.length > 0) {
        values.push(heap.delete()[1]);
    }

    return values;
};

const buildTreeHeapFromValues = (HeapClass, values) => {
    const heap = new HeapClass();
    heap.queue = values.map((value) => new Node(value));
    heap.heap = heap.queue[0] || null;

    for (let i = 0; i < heap.queue.length; i++) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < heap.queue.length) {
            heap.queue[i].left = heap.queue[left];
            heap.queue[left].parent = heap.queue[i];
        }

        if (right < heap.queue.length) {
            heap.queue[i].right = heap.queue[right];
            heap.queue[right].parent = heap.queue[i];
        }
    }

    return heap;
};

const runMinHeapTreeTests = () => {
    console.log("\nMinHeapTree");

    const tree1 = new MinHeapTree();
    [5, 3, 8, 1].forEach((value) => tree1.insert(value));
    logTest("TC1 - smallest value stays at root after insert", tree1.heap.value, 1);

    const tree2 = new MinHeapTree();
    [5, 3, 8, 1].forEach((value) => tree2.insert(value));
    logTest("TC2 - delete returns values in ascending order", deleteAllFromTree(tree2), [1, 3, 5, 8]);

    const tree3 = new MinHeapTree();
    [4, 2, 2, 7, 4].forEach((value) => tree3.insert(value));
    logTest("TC3 - duplicate values are handled correctly", deleteAllFromTree(tree3), [2, 2, 4, 4, 7]);

    const tree4 = new MinHeapTree();
    [0, -10, 5, -3].forEach((value) => tree4.insert(value));
    logTest("TC4 - negative values are handled correctly", deleteAllFromTree(tree4), [-10, -3, 0, 5]);

    const tree5 = new MinHeapTree();
    tree5.insert(10);
    tree5.insert(4);
    tree5.insert(15);
    const tree5Actual = [tree5.delete()];
    tree5.insert(1);
    tree5Actual.push(tree5.heap.value);
    tree5Actual.push(tree5.delete());
    tree5Actual.push(tree5.delete());
    logTest("TC5 - mixed insert, peek, and delete operations", tree5Actual, [4, 1, 1, 10]);

    const tree6 = buildTreeHeapFromValues(MinHeapTree, [9, 5, 6, 2, 3]);
    tree6.heapify();
    logTest("TC6 - heapify builds min heap from unordered tree", deleteAllFromTree(tree6), [2, 3, 5, 6, 9]);
};

const runMinHeapTests = () => {
    console.log("\nMinHeap");

    const heap1 = new MinHeap();
    [5, 3, 8, 1].forEach((value) => heap1.insert(`node-${value}`, value));
    logTest("TC1 - smallest value stays at root after insert", heap1.heap[0][1], 1);

    const heap2 = new MinHeap();
    [5, 3, 8, 1].forEach((value) => heap2.insert(`node-${value}`, value));
    logTest("TC2 - delete returns values in ascending order", deleteAllFromArrayHeap(heap2), [1, 3, 5, 8]);

    const heap3 = new MinHeap();
    [4, 2, 2, 7, 4].forEach((value) => heap3.insert(`node-${value}`, value));
    logTest("TC3 - duplicate values are handled correctly", deleteAllFromArrayHeap(heap3), [2, 2, 4, 4, 7]);

    const heap4 = new MinHeap();
    [0, -10, 5, -3].forEach((value) => heap4.insert(`node-${value}`, value));
    logTest("TC4 - negative values are handled correctly", deleteAllFromArrayHeap(heap4), [-10, -3, 0, 5]);

    const heap5 = new MinHeap();
    heap5.insert("node-10", 10);
    heap5.insert("node-4", 4);
    heap5.insert("node-15", 15);
    const heap5Actual = [heap5.delete()[1]];
    heap5.insert("node-1", 1);
    heap5Actual.push(heap5.heap[0][1]);
    heap5Actual.push(heap5.delete()[1]);
    heap5Actual.push(heap5.delete()[1]);
    logTest("TC5 - mixed insert, peek, and delete operations", heap5Actual, [4, 1, 1, 10]);

    const heap6 = new MinHeap();
    heap6.heap = [9, 5, 6, 2, 3].map((value) => [`node-${value}`, value]);
    heap6.heapify();
    logTest("TC6 - heapify builds min heap from unordered array", deleteAllFromArrayHeap(heap6), [2, 3, 5, 6, 9]);
};

runMinHeapTreeTests();
runMinHeapTests();
