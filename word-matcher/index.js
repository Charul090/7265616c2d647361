class TrieNode {
    constructor () {
        this.children = {};
        this.isComplete = false;
    }

    setCompleteWord () {
        this.isComplete = true
    }
}

class Trie {
    constructor () {
        this.root = new TrieNode();
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

    insertPara (para) {
        const splitPara = para.trim().split('\n');
        const splitWords = splitPara.map(para => para.split(' '));
        for(const para of splitWords) {
            for(const word of para) {
                this.insert(word);
            }
        }
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
}

const paragraph = `Katipō (pronounced /kɑːtɪˈpɔː/ kah-tih-PAW or /ˈkɑːtəpoʊ/ KAH-tə-poh;[2] Latrodectus katipo) is a species of cobweb spider found only in New Zealand. It is one of many species in the genus Latrodectus and is most closely related to the Australian redback (L. hasseltii). It is venomous to humans, its bite being capable of producing the toxic syndrome latrodectism; symptoms include extreme pain and, potentially, hypertension or seizure. Bites are rare and antivenom is available in some hospitals. The female is 8–10 millimetres (0.31–0.39 in) in length; the male is 4–5 millimetres (0.16–0.20 in). In the South Island and the lower half of the North Island, the female has a distinct red stripe bordered in white on its abdomen; in more northern populations this stripe is absent, pale, yellow, or replaced with cream-coloured blotches. These two forms were previously thought to be separate species. The male is white with black stripes and red hourglass-shaped markings.

The katipō is mainly found living in sand dunes close to the seashore. It is found throughout most of coastal New Zealand except the far south and the West Coast. It feeds mainly on ground-dwelling insects, caught in an irregular tangled web spun among dune plants or other debris. After mating, the female katipō produces five or six egg sacs in November or December. The juveniles hatch after 20–25 days, and during January and February they disperse into surrounding plants. The common name is from Māori for "night stinger", which is derived from the words kakati (to sting) and pō (the night). Due to habitat loss, colonisation of their natural habitat by invasive spiders and hybridisation with L. hasseltii, the katipō is listed as "in serious decline" by the New Zealand Threat Classification System.`

const words = ['Katipō', 'mainly', 'and', 'dunes', 'mumbai indians', 'It', 'it', 'west', 'West'];

const trie = new Trie();
trie.insertPara(paragraph);
const wordsOutput = words.map(word => trie.search(word));

for(let i = 0; i < wordsOutput.length; i++) {
    console.log(words[i], '->', wordsOutput[i]);
}