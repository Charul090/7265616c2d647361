/**
 * for given input, returns adjacencyList and adjacencyMatrix graph
 * @param {string} input
 * @returns {{ adjacencyList: Record<string, Array<number | [number, number]>>, adjacencyMatrix:Array<Array<number>> }} 
 */
function createGraph (input, isDirectedGraph = false) {
    const inputArray = input.split('\n');
    const [nodes, edges] = inputArray[0].split(' ').map(Number);
    const adjacencyMatrix = Array.from({ length: nodes }, () => new Array(nodes).fill(0));
    const adjacencyList = Array.from({ length: nodes }).reduce((acc, elem, index) => {
        acc[index] = [];
        return acc;
    }, {});
    for (let i = 1; i < edges + 1; i++) {
        const nodeRow = inputArray[i].split(' ').map(Number);
        const isWeightedGraph = nodeRow.length === 3;
        adjacencyList[nodeRow[0]].push(isWeightedGraph ? [nodeRow[1], nodeRow[2]] : nodeRow[1]);
        adjacencyMatrix[nodeRow[0]][nodeRow[1]] = (isWeightedGraph ? nodeRow[2] : 1);
        if (!isDirectedGraph) {
            adjacencyList[nodeRow[1]].push(isWeightedGraph ? [nodeRow[0], nodeRow[2]] : nodeRow[0]);
            adjacencyMatrix[nodeRow[1]][nodeRow[0]] = (isWeightedGraph ? nodeRow[2] : 1);
        }
    }

    console.log(adjacencyMatrix);
    console.log(adjacencyList);

    return {
        adjacencyList,
        adjacencyMatrix
    }
}

createGraph(`5 4
0 1
0 2
1 3
3 4`);
createGraph(`4 3
0 1 10
1 2 20
2 3 5`, true);