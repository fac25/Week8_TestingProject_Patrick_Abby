function describe(groupName, describeFunction) {
  console.group("%c " + groupName, "font-size: 13px");
  describeFunction();
  console.groupEnd();
}

function test(testName, testFunction) {
  const { result, expected, actual } = testFunction();
  createFormattedConsoleGroup(testName, result);

  !result &&
    console.log(
      `Expected "${expected}" but found %c"${actual}"`,
      "font-size: 12px; color: red; font-weight: bold"
    );

  console.groupEnd();
  resetTestEnvironment();
  return { result };
}

function createFormattedConsoleGroup(testName, result) {
  console[result ? "groupCollapsed" : "group"](
    (result ? "✅" : "❌") + ` ${testName}`
  );
}

function equal(actual, expected) {
  if (actual === expected) return { result: true };

  return {
    result: false,
    expected,
    actual,
  };
}

function $(object) {
  return JSON.stringify(object);
}

function trueTypeOf(element) {
  const regex = /\[object |[\]]/g;
  const prototypeString = Object.prototype.toString.call(element); // returns [object Type]

  return prototypeString.replace(regex, "");
}
