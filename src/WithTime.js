import EventEmitter from "./EventEmitter.js";

class WithTime extends EventEmitter {
  constructor() {
    super();
  }

  async execute(asyncFunc, ...args) {
    // emit event start, end, data received
    // call asyncFunc with args specified
    // compute the time it takes to execute asyncFunc

    const start = Date.now();
    this.emit("begin");

    try {
      const data = await asyncFunc(...args);

      this.emit("data", data);
      const end = Date.now();
      const timeTaken = end - start;
      console.log(`Time taken: ${timeTaken}ms`);

      this.emit("end");
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}

const fetchFromUrl = async (url, cb) => {
  // fetch from https://jsonplaceholder.typicode.com/posts/1
  // transform to JSON
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => {
      throw new Error(`Fetch failed: ${err.message}`);
    });
};

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));
withTime.on("data", (data) => console.log(`Data received ${JSON.stringify(data)}`));

withTime.execute(fetchFromUrl, "https://jsonplaceholder.typicode.com/posts/1");

console.log(withTime.rawListeners("end"));

/*execute() method that will call async function with arguments specified and 
compute the time it takes to execute this async function. 
execute() function should emit event start, event end and event for the data received.
 */
