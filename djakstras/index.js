class Djikstras {
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

    dijkstra(V, edges, S) {
        this.heap = [];

        const graph = Array.from({ length: V }, () => []);

        for (const [u, v, w] of edges) {
            graph[u].push([v, w]);
            graph[v].push([u, w]);
        }

        const answer = Array(V).fill(1e9);
        answer[S] = 0;

        this.insert(S, 0);

        while (this.heap.length > 0) {
            const [node, distance] = this.delete();

            if (distance > answer[node]) continue;

            for (const [neighbor, weight] of graph[node]) {
                const newDistance = distance + weight;

                if (newDistance < answer[neighbor]) {
                    answer[neighbor] = newDistance;
                    this.insert(neighbor, newDistance);
                }
            }
        }

        return answer;
    }
}