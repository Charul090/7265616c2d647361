class TrieNode {
    constructor () {
        this.children = {};
        this.isComplete = false;
    }

    setCompleteWord () {
        this.isComplete = true;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode()
    }

    insert(word) {
        let current = this.root;
        for(const char of word) {
            if (!current[char]) {
                current[char] = new TrieNode();
            }
            current = current[char];
        }
        current.setCompleteWord();
    }

    search(word) {
        let current = this.root;
        for(const char of word) {
            if (!current[char]) {
                return false;
            }
            current = current[char]
        }
        return current.isComplete;
    }

    startsWith(prefix) {
        let current = this.root;
        for(const char of prefix) {
            if (!current[char]) {
                return false;
            }
            current = current[char];
        }
        return true;
    }
}