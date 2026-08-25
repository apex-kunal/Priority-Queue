const fs = require('fs');

class PriorityQueue {
  constructor(filePath = 'pq_data.json') {
    this.filePath = filePath;
    this.nextId = 1;
    this.tasks = [];
    this._load();
  }

  insert(value, priority, existingId = null) {
    const item = { id: existingId ?? this.nextId++, value, priority };
    const idx = this.tasks.findIndex(it => it.priority > priority);

    if (idx === -1) {
      this.tasks.push(item);
    } else {
      this.tasks.splice(idx, 0, item);
    }
    this._persist();
    return item.id;
  }

  extract_min() {
    if (this.is_empty()){
      return null;
    } 
    const item = this.tasks.shift();
    this._persist();
    return item;
  }

  extract_max() {
    if (this.is_empty()){
      return null
    } 
    const item = this.tasks.pop();
    this._persist();
    return item
  }

  peek(mode = 'min') {
    if (this.is_empty()){
       return null
    }
    return mode === 'max' ? this.tasks[this.tasks.length - 1] : this.tasks[0];
  }

  update(id, newPriority) {
    const idx = this.tasks.findIndex(it => it.id === id);
    if (idx === -1) return false;

    const [item] = this.tasks.splice(idx, 1);
    this.insert(item.value, newPriority, item.id);
    return true;
  }

  delete(id) {
    const idx = this.tasks.findIndex(it => it.id === id);
    if (idx === -1) return false;

    this.tasks.splice(idx, 1);
    this._persist();
    return true;
  }

  is_empty() {
    return this.tasks.length === 0;
  }

  _persist() {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify({ nextId: this.nextId, tasks: this.tasks }, null, 2),
        'utf8'
      );
    } catch (err) {
      console.error('Error persisting state:', err.message);
    }
  }

  _load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf8').trim();
        if (raw) {
          const data = JSON.parse(raw);
          this.nextId = data.nextId || 1;
          this.tasks = data.tasks || [];
        }
      }
    } catch (err) {
      console.error('Error loading state:', err.message);
      this.tasks = [];
      this.nextId = 1;
    }
  }
}

module.exports = { PriorityQueue };