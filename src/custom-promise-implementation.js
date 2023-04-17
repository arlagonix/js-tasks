// Made it with help of Chat GPT 4
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    return new MyPromise((resolve, reject) => {
      const handleFulfilled = () => {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 0);
      };

      const handleRejected = () => {
        setTimeout(() => {
          try {
            const result = onRejected(this.reason);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 0);
      };

      if (this.state === "fulfilled") {
        handleFulfilled();
      } else if (this.state === "rejected") {
        handleRejected();
      } else {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

MyPromise.resolve = (value) => new MyPromise((resolve) => resolve(value));
MyPromise.reject = (reason) => new MyPromise((_, reject) => reject(reason));
MyPromise.all = (promises) => {
  return new MyPromise((resolve, reject) => {
    const results = [];
    let fulfilledCount = 0;

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          results[index] = value;
          fulfilledCount++;

          if (fulfilledCount === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

// ... Existing MyPromise implementation ...

MyPromise.race = (promises) => {
  return new MyPromise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve).catch(reject);
    });
  });
};

MyPromise.allSettled = (promises) => {
  return new MyPromise((resolve) => {
    const results = [];
    let settledCount = 0;

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          results[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          settledCount++;

          if (settledCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
};

MyPromise.any = (promises) => {
  return new MyPromise((resolve, reject) => {
    const errors = [];
    let settledCount = 0;

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          resolve(value);
        })
        .catch((error) => {
          errors[index] = error;
          settledCount++;

          if (settledCount === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
};
