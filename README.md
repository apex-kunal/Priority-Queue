# Persistent Priority Queue Implementation

## 1. Description of Implementation
- **Data Structure**: Array-backed Priority Queue maintained in ascending sorted order by priority value (lower number = higher priority).
- **Time Complexities**:
  - `insert`: O(N) due to linear scan and `splice` insertion.
  - `extract_min` / `extract_max`: O(1) using array `.shift()` and `.pop()`.
  - `peek`: O(1) accessing index 0 or index `length - 1`.
  - `update` / `delete`: O(N) linear search by ID.
  - `is_empty`: O(1).
- **Persistence Mechanism**: Uses Node.js synchronous file system (`fs`) methods to serialize queue state to a JSON file (`pq_data.json`) on every state-mutating operation (`insert`, `update`, `delete`, `extract`).

## 2. Real-World Use Cases
1. **Operating System Process Scheduling**: Prioritizing real-time and high-priority OS kernel threads over background user tasks.
2. **Network Traffic Routing / QoS**: Packet prioritization ensuring low-latency voice/video packets bypass large bulk downloads.
3. **Graph Search Algorithms**: Powering Dijkstra's Shortest Path and A* pathfinding to always expand the cheapest frontier node first.
4. **Data Compression**: Generating variable-length prefix codes in Huffman Coding.

## 3. How to Run
```bash
node module.js
node test-case.js

Note: The `pq_data.json` file will be generated automatically when you run the script no nneed to create it manually.