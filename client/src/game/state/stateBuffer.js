export const stateBuffer = {
  buffer: [],

  maxSize: 20,

  push(snapshot) {
    this.buffer.push(snapshot);

    if (this.buffer.length > this.maxSize) {
      this.buffer.shift();
    }
  },

  latest() {
    return this.buffer[this.buffer.length - 1];
  },

  clear() {
    this.buffer.length = 0;
  }
};