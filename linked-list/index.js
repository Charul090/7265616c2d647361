const assert = require('assert');
const test = require('node:test');

class Node {
    constructor (value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor () {
        this.head = null;
    }

    append (value) {
        const node = new Node(value);
        if (!this.head) {
            this.head = node;
            return
        }

        let llnode = this.head;
        while (llnode.next !== null) {
            llnode = llnode.next;
        }
        llnode.next = node;
    }

    delete (value) {
        if (!this.head) return;

        let prev = null, current = this.head;
        while (current !== null) {
            if (current.value === value && prev === null) {
                this.head = current.next;
                break;
            } else if (current.value === value) {
                prev.next = current.next;
                break;
            }
            prev = current;
            current = current.next;
        }
    }
}

function valuesFrom(list) {
    const values = [];
    let current = list.head;

    while (current !== null) {
        values.push(current.value);
        current = current.next;
    }

    return values;
}

test('starts as an empty list with null head', () => {
    const list = new LinkedList();

    assert.strictEqual(list.head, null);
});

test('append adds the first value as the head node', () => {
    const list = new LinkedList();

    list.append(10);

    assert.deepStrictEqual(valuesFrom(list), [10]);
    assert.strictEqual(list.head.value, 10);
    assert.strictEqual(list.head.next, null);
});

test('append preserves insertion order across multiple values', () => {
    const list = new LinkedList();

    list.append(10);
    list.append(20);
    list.append(30);

    assert.deepStrictEqual(valuesFrom(list), [10, 20, 30]);
});

test('append supports falsy values', () => {
    const list = new LinkedList();

    list.append(0);
    list.append('');
    list.append(false);

    assert.deepStrictEqual(valuesFrom(list), [0, '', false]);
});

test('append supports object values by reference', () => {
    const list = new LinkedList();
    const payload = { id: 1, label: 'node' };

    list.append(payload);

    assert.strictEqual(list.head.value, payload);
    assert.deepStrictEqual(valuesFrom(list), [payload]);
});

test('delete returns undefined', () => {
    const list = new LinkedList();

    list.append(10);

    assert.strictEqual(list.delete(10), undefined);
});

test('delete on an empty list leaves the list unchanged', () => {
    const list = new LinkedList();

    list.delete(10);

    assert.strictEqual(list.head, null);
    assert.deepStrictEqual(valuesFrom(list), []);
});

test('delete removes the only node in the list', () => {
    const list = new LinkedList();

    list.append(10);
    list.delete(10);

    assert.strictEqual(list.head, null);
    assert.deepStrictEqual(valuesFrom(list), []);
});

test('delete removes the head node from a multi-node list', () => {
    const list = new LinkedList();

    list.append(10);
    list.append(20);
    list.append(30);
    list.delete(10);

    assert.deepStrictEqual(valuesFrom(list), [20, 30]);
    assert.strictEqual(list.head.value, 20);
});

test('delete removes a middle node', () => {
    const list = new LinkedList();

    list.append(10);
    list.append(20);
    list.append(30);
    list.delete(20);

    assert.deepStrictEqual(valuesFrom(list), [10, 30]);
    assert.strictEqual(list.head.value, 10);
    assert.strictEqual(list.head.next.value, 30);
});

test('delete removes the tail node', () => {
    const list = new LinkedList();

    list.append(10);
    list.append(20);
    list.append(30);
    list.delete(30);

    assert.deepStrictEqual(valuesFrom(list), [10, 20]);
    assert.strictEqual(list.head.next.next, null);
});

test('delete does nothing when the value does not exist', () => {
    const list = new LinkedList();

    list.append(10);
    list.append(20);
    list.delete(99);

    assert.deepStrictEqual(valuesFrom(list), [10, 20]);
});

test('delete removes only the first matching value when duplicates exist', () => {
    const list = new LinkedList();

    list.append(10);
    list.append(20);
    list.append(20);
    list.append(30);
    list.delete(20);

    assert.deepStrictEqual(valuesFrom(list), [10, 20, 30]);
});

test('repeated delete calls can remove repeated duplicate values one by one', () => {
    const list = new LinkedList();

    list.append(20);
    list.append(20);
    list.append(20);
    list.delete(20);
    list.delete(20);

    assert.deepStrictEqual(valuesFrom(list), [20]);
    assert.strictEqual(list.head.value, 20);
    assert.strictEqual(list.head.next, null);
});
