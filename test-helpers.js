function test(message, actual, expected) {
  if (actual === expected) {
    const defaultMessage = `Expected ${expected} and received ${actual}`;
    console.info("Pass: " + (message || defaultMessage));
    resetTest();
  } else {
    const defaultMessage = `Expected ${expected} but received ${actual} instead`;
    console.error("Fail: " + (message || defaultMessage));
    resetTest();
  }
}

function notEqual(actual, expected, message) {
  if (actual !== expected) {
    const defaultMessage = `${expected} is different to ${actual}`;
    console.info("Pass: " + (message || defaultMessage));
  } else {
    const defaultMessage = `${expected} is the same as ${actual}`;
    console.error("Fail: " + (message || defaultMessage));
  }
}

function describe(name, testFunction) {
  console.group(name);
  testFunction();
  console.groupEnd(name);
}

function $(object) {
  return JSON.stringify(object);
}

function trueTypeOf(element) {
  const regex = /\[object |[\]]/g;
  const prototypeString = Object.prototype.toString.call(element); // returns [object Type]

  return prototypeString.replace(regex, "");
}
