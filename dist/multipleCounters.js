"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("./styles.css");

var Redux = _interopRequireWildcard(require("@reduxjs/toolkit"));

var _expect = _interopRequireDefault(require("expect"));

var _deepFreeze = _interopRequireDefault(require("deep-freeze"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  const addCounter = list => {
    return [...list, 0];
  };

  const removeCounter = (list, index) => {
    return [...list.slice(0, index), ...list.slice(index + 1)];
  };

  const incrementCounter = (list, index) => {
    return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)];
  };

  const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];
    (0, _deepFreeze.default)(listBefore);
    (0, _expect.default)(addCounter(listBefore)).toEqual(listAfter);
  };

  const testRemoveCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];
    (0, _deepFreeze.default)(listBefore);
    (0, _expect.default)(removeCounter(listBefore, 1)).toEqual(listAfter);
  };

  const testIncrementCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 11, 20];
    (0, _deepFreeze.default)(listBefore);
    (0, _expect.default)(incrementCounter(listBefore, 1)).toEqual(listAfter);
  };

  testAddCounter();
  testRemoveCounter();
  testIncrementCounter();
  console.log('All tests passed.');
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement("h1", null, "Hello World"), /*#__PURE__*/_react.default.createElement("h2", null, "Do stuff."), /*#__PURE__*/_react.default.createElement("p", null, "And things."), /*#__PURE__*/_react.default.createElement("p", null, "And more things."));
}
//# sourceMappingURL=multipleCounters.js.map