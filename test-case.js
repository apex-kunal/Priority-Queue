const { PriorityQueue } = require('./module.js');
const pq = new PriorityQueue('pq_data.json');

// insert task
const t1 = pq.insert('critical task', 1);
const t2 = pq.insert('less important task', 5);
const t3 = pq.insert('important task', 3);

// peek operations
console.log('Peek Min:', pq.peek('min')); //t1 (Priority 1)
console.log('Peek Max:', pq.peek('max')); //t2 (Priority 5)

// update a priority
pq.update(t2, 0); // t2 becomes highest priority (0)
console.log('After update, Peek Min:', pq.peek('min'));

// Delete a task
pq.delete(t3); // Deletes "important task"

// extract min and max
console.log('Extract Min:', pq.extract_min()); // priority 0
console.log('Extract Max:', pq.extract_max()); // priority 1

// check if queue isempty
console.log('Is empty =', pq.is_empty());