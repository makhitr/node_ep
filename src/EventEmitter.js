class EventEmitter {
  listeners = {}; // key-value pair

  addListener(eventName, fn) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [fn];
    } else {
      this.listeners[eventName].push(fn);
    }
  }

  on(eventName, fn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    if (!this.listeners[eventName]) {
      throw new Error(`There is no such event: ${eventName}`);
      // return;
    } else {
      this.listeners[eventName] = this.listeners[eventName].filter((listener) => listener !== fn);
    }
  }

  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const onceListener = (...args) => {
      fn(...args);
      this.removeListener(eventName, onceListener);
    };

    this.addListener(eventName, onceListener);
  }

  emit(eventName, ...args) {
    if (!this.listeners[eventName]) {
      // throw new Error(`There is no such event: ${eventName}`);
      return;
    } else {
      this.listeners[eventName].map((listener) => {
        listener(...args);
      });
    }
  }

  listenerCount(eventName) {
    return this.listeners[eventName].length;
  }

  rawListeners(eventName) {
    return this.listeners[eventName];
  }
}

export default EventEmitter;
