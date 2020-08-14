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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  const counter = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;

      case 'DECREMENT':
        return state - 1;

      default:
        return state;
    }
  };

  const Counter = ({
    value,
    onIncrement,
    onDecrement
  }) => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", null, value), /*#__PURE__*/_react.default.createElement("button", {
    onClick: onDecrement
  }, "-"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: onIncrement
  }, "+"));

  {
    /* Creating my own createStore method below, to understand it. It is mostly the same as the
      one that ships with Redux.
      const { createStore } = Redux;
    */
  }

  const createStore = reducer => {
    let listeners = [];
    let state;

    const getState = () => state;

    const dispatch = action => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };

    const subscribe = listener => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };

    {
      /*
        this returns a function, that can remove. it doesn't run said function. ie.
        const remove = subscribe(myListener);
        // later:
        remove();
      */
    }
    {
      /* dispatch a dummy state, just to get the reducer to return an initial value. */
    }
    dispatch({});
    return {
      getState,
      dispatch,
      subscribe
    };
  };

  const store = createStore(counter);

  const render = () => {
    _reactDom.default.render( /*#__PURE__*/_react.default.createElement(Counter, {
      value: store.getState(),
      onIncrement: () => store.dispatch({
        type: 'INCREMENT'
      }),
      onDecrement: () => store.dispatch({
        type: 'DECREMENT'
      })
    }), document.getElementById('root'));
  };

  store.subscribe(render);
  render();
  {
    /* Counter tests
    expect(
      counter(0, {type: 'INCREMENT'})
    ).toEqual(1);
    expect(
      counter(1, {type: 'INCREMENT'})
    ).toEqual(2);
    expect(
      counter(2, {type: 'DECREMENT'})
    ).toEqual(1);
    expect(
      counter(1, {type: 'DECREMENT'})
    ).toEqual(0);
    expect(
      counter(1, {type: 'SOMETHING_ELSE'})
    ).toEqual(1);
    expect(
      counter(undefined, {})
    ).toEqual(0);
    */
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement("h1", null, "Hello World"), /*#__PURE__*/_react.default.createElement("h2", null, "Do stuff."), /*#__PURE__*/_react.default.createElement("p", null, "And things."), /*#__PURE__*/_react.default.createElement("p", null, "And more things."));
}
//# sourceMappingURL=counter.js.map