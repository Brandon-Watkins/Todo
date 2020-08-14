"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("./styles.css");

var Redux = _interopRequireWildcard(require("@reduxjs/toolkit"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Reducer handling updating individual todo objects
const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };

    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state; //Not the todo we're looking for.
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        completed: !state.completed
      });

    default:
      return state;
  }
}; // Reducer handling updating the list containing all todo objects


const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];

    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));

    default:
      return state;
  }
}; // Reducer handling updating the visibility filter for the app


const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;

    default:
      return state;
  }
}; // Reducer handling combining the list of todos with the visibility filter, representing the
// final UI state


const combineReducers = Redux.combineReducers;
const todoApp = combineReducers({
  todos,
  visibilityFilter
});
const createStore = Redux.createStore;
const store = createStore(todoApp);
/************************************* Render UI ******************************/

const handleKeyDown = e => {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (btn.hasFocus) return;
    btn.focus();
  }
};

const handleKeyUp = e => {
  if (e.keyCode === 13) {
    e.preventDefault();
    btn.click();
  }
};

const handleButtonClick = e => {
  if (inp.value === '' || inp.value === undefined) return inp.focus();
  return store.dispatch({
    type: 'ADD_TODO',
    text: inp.value,
    id: nextTodoId++
  }), inp.value = '', inp.focus();
};

const Component = _react.default.Component;

const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if (filter === currentFilter) {
    return /*#__PURE__*/_react.default.createElement("span", null, children);
  }

  return /*#__PURE__*/_react.default.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
      });
    }
  }, children);
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;

    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);

    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
};

let inp;
let btn;
let nextTodoId = 0;

class TodoApp extends Component {
  render() {
    const _this$props = this.props,
          todos = _this$props.todos,
          visibilityFilter = _this$props.visibilityFilter;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("input", {
      ref: node => {
        inp = node;
      },
      onKeyUp: handleKeyUp,
      onKeyDown: handleKeyDown
    }), /*#__PURE__*/_react.default.createElement("button", {
      ref: buttonNode => {
        btn = buttonNode;
      },
      onClick: handleButtonClick,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp
    }, "Add Todo"), /*#__PURE__*/_react.default.createElement("ul", null, visibleTodos.map(todo => /*#__PURE__*/_react.default.createElement("li", {
      key: todo.id,
      onClick: () => {
        store.dispatch({
          type: 'TOGGLE_TODO',
          id: todo.id
        });
      },
      style: {
        textDecoration: todo.completed ? 'line-through' : 'none'
      }
    }, todo.text))), /*#__PURE__*/_react.default.createElement("p", null, "Show:", ' ', /*#__PURE__*/_react.default.createElement(FilterLink, {
      filter: "SHOW_ALL",
      currentFilter: visibilityFilter
    }, "All"), ' ', /*#__PURE__*/_react.default.createElement(FilterLink, {
      filter: "SHOW_ACTIVE",
      currentFilter: visibilityFilter
    }, "Active"), ' ', /*#__PURE__*/_react.default.createElement(FilterLink, {
      filter: "SHOW_COMPLETED",
      currentFilter: visibilityFilter
    }, "Completed")));
  }

}

;

const render = () => {
  _reactDom.default.render( /*#__PURE__*/_react.default.createElement(TodoApp, store.getState()), document.getElementById('root'));
}; // Render the application, in response to the current application state.
// Calls render every time the store changes.


store.subscribe(render); // Call render once to render the initial state.

render();
//# sourceMappingURL=todoApp_v1.js.map