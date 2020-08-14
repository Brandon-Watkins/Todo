"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("./styles.css");

var Redux = _interopRequireWildcard(require("@reduxjs/toolkit"));

var _deepFreeze = _interopRequireDefault(require("deep-freeze"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/************************************* Reducers ******************************/
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

    case 'REMOVE_TODO':
      return state.filter(t => t.id !== action.id);

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
/************************************* Event Handlers ******************************/

const handleKeyDown = (e, button) => {
  e = e || Window.event;

  if (e.keyCode === 13) {
    e.preventDefault();
    if (button.hasFocus) return;
    button.focus();
  }
};

const handleKeyUp = (e, button) => {
  e = e || Window.event;

  if (e.keyCode === 13) {
    e.preventDefault();
    button.click();
  }
};

let nextTodoId = 0;

const handleButtonClick = ({
  store,
  input
}) => {
  if (input.value === '' || input.value === undefined) return input.focus();
  const temp = input.value;
  input.focus();
  input.value = '';
  if (store) return store.dispatch({
    type: 'ADD_TODO',
    text: temp,
    id: nextTodoId++
  });
};

const handleLeftClickTodo = ({
  store,
  id
}) => {
  store.dispatch({
    type: 'TOGGLE_TODO',
    id
  });
};

const handleRightClickTodo = ({
  store,
  id
}) => {
  store.dispatch({
    type: 'REMOVE_TODO',
    id
  });
  document.getElementsByTagName('input')[0].focus();
};

const handleClickTodo = ({
  e,
  id,
  store
}) => {
  e = e || Window.event;

  if (e.type) {
    if (e.type === 'click') return handleLeftClickTodo({
      store,
      id
    });

    if (e.type === 'contextmenu') {
      e.preventDefault();
      return handleRightClickTodo({
        id,
        store
      });
    }
  } else if (e.which) {
    if (e.which === 0) return handleLeftClickTodo({
      store,
      id
    });

    if (e.which === 1) {
      e.stopPropagation() || e.preventDefault();
      return handleRightClickTodo({
        id,
        store
      });
    }
  } else if (e.button) {
    if (e.button === 1) return handleLeftClickTodo(id);

    if (e.button === 2) {
      e.stopPropagation() || e.preventDefault();
      return handleRightClickTodo({
        id,
        store
      });
    }
  }
};
/************************************* Presentation Components ******************************/


const AddTodo = ({
  divStyle,
  inputStyle,
  buttonStyle,
  store
}) => {
  let input = _react.default.useRef(null);

  let button = _react.default.useRef(null);

  return /*#__PURE__*/_react.default.createElement("div", {
    style: divStyle,
    onClick: () => input.focus(),
    onLoad: () => input.focus()
  }, /*#__PURE__*/_react.default.createElement("input", {
    style: inputStyle,
    ref: node => {
      input = node;
    },
    onKeyUp: e => handleKeyUp(e, button),
    onKeyDown: e => handleKeyDown(e, button)
  }), /*#__PURE__*/_react.default.createElement("button", {
    style: buttonStyle,
    ref: buttonNode => {
      button = buttonNode;
    },
    onClick: () => handleButtonClick({
      store,
      input
    }),
    onKeyDown: e => handleKeyDown(e, button),
    onKeyUp: e => handleKeyUp(e, button)
  }, "Add Todo"));
};

const Todo = ({
  style,
  onClick: _onClick,
  completed,
  text,
  onContextMenu: _onContextMenu,
  id,
  store
}) => {
  return /*#__PURE__*/_react.default.createElement("li", {
    onClick: e => _onClick({
      store,
      e,
      id
    }),
    onContextMenu: e => _onContextMenu({
      store,
      e,
      id
    }),
    style: {
      textDecoration: completed ? 'line-through' : 'none',
      style
    }
  }, text);
};

const TodoList = ({
  listStyle,
  singleTodoStyle,
  todos,
  onTodoClick,
  store
}) => {
  return /*#__PURE__*/_react.default.createElement("ul", {
    style: listStyle
  }, todos.map(todo => /*#__PURE__*/_react.default.createElement(Todo, _extends({
    store: store,
    style: singleTodoStyle,
    key: todo.id
  }, todo, {
    onClick: onTodoClick,
    onContextMenu: onTodoClick
  }))));
};

const Footer = ({
  footerStyle,
  selectionStyle,
  linkStyle,
  store
}) => {
  return /*#__PURE__*/_react.default.createElement("p", {
    style: footerStyle
  }, "Show:", ' ', /*#__PURE__*/_react.default.createElement(FilterLink, {
    store: store,
    selectionStyle: selectionStyle,
    linkStyle: linkStyle,
    filter: "SHOW_ALL"
  }, "All"), ' ', /*#__PURE__*/_react.default.createElement(FilterLink, {
    store: store,
    selectionStyle: selectionStyle,
    linkStyle: linkStyle,
    filter: "SHOW_ACTIVE"
  }, "Active"), ' ', /*#__PURE__*/_react.default.createElement(FilterLink, {
    store: store,
    selectionStyle: selectionStyle,
    linkStyle: linkStyle,
    filter: "SHOW_COMPLETED"
  }, "Completed"));
};

const Link = ({
  selectionStyle,
  linkStyle,
  active,
  children,
  onClick: _onClick2
}) => {
  if (active) {
    return /*#__PURE__*/_react.default.createElement("span", {
      style: selectionStyle
    }, children);
  }

  return /*#__PURE__*/_react.default.createElement("a", {
    style: linkStyle,
    href: "#",
    onClick: e => {
      e.preventDefault();

      _onClick2();
    }
  }, children);
};
/************************************* Container Components ******************************/


const Component = _react.default.Component;

class VisibleTodoList extends Component {
  componentDidMount() {
    const store = this.props.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const store = props.store;
    const state = store.getState();
    return /*#__PURE__*/_react.default.createElement(TodoList, {
      store: store,
      todos: getVisibleTodos(state.todos, state.visibilityFilter),
      listStyle: props.listStyle,
      singleTodoStyle: props.singleTodoStyle,
      onTodoClick: handleClickTodo
    });
  }

}

class FilterLink extends Component {
  componentDidMount() {
    const store = this.props.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const store = props.store;
    const state = store.getState();
    return /*#__PURE__*/_react.default.createElement(Link, {
      active: props.filter === state.visibilityFilter,
      onClick: () => store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: props.filter
      })
    }, props.children);
  }

}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);

    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);

    default:
      return todos;
  }
}; //using position:'-webkit-sticky', which only works on Safari. Will need to change later


const TodoApp = ({
  store
}) => {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '15em'
    }
  }, /*#__PURE__*/_react.default.createElement("h1", {
    style: {
      textAlign: 'center',
      margin: '16px'
    }
  }, "Todo"), /*#__PURE__*/_react.default.createElement(AddTodo, {
    store: store,
    divStyle: {
      display: 'block',
      alignContent: 'center',
      margin: 0,
      height: '1.25em',
      width: '100%',
      position: '-webkit-sticky',
      left: '0px',
      top: '0px'
    },
    inputStyle: {
      height: 'calc(100% - 4px)',
      fontSize: '1em',
      position: 'absolute',
      left: '0',
      right: '6.5em',
      border: '1px inset #ccc',
      margin: 0,
      backgroundColor: '#eee',
      width: 'calc(100% - 6.5em'
    },
    buttonStyle: {
      height: '100%',
      width: '6em',
      position: 'absolute',
      right: '0',
      border: '1px outset #aaa',
      borderRadius: '4px',
      textAlign: 'center',
      backgroundColor: '#eee',
      fontSize: '1em',
      padding: '0 0.4em'
    }
  }), /*#__PURE__*/_react.default.createElement(VisibleTodoList, {
    store: store,
    listStyle: {},
    singleTodoStyle: {}
  }), /*#__PURE__*/_react.default.createElement(Footer, {
    store: store,
    footerStyle: {
      textAlign: 'center',
      margin: '3px',
      display: 'block'
    },
    selectionStyle: {},
    linkStyle: {}
  }), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: '0.75em',
      margin: 0
    }
  }, "Left click an item to toggle its completion."), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: '0.75em',
      margin: 0
    }
  }, "Right click an item to remove it from the list."));
};

class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return this.props.children;
  }

}

const createStore = Redux.createStore;

_reactDom.default.render( /*#__PURE__*/_react.default.createElement(TodoApp, {
  store: createStore(todoApp)
}), document.getElementById('root'));

if (document) document.addEventListener('DOMContentLoaded', function () {
  document.getElementsByTagName('input')[0].focus();

  window.onclick = function () {
    document.getElementsByTagName('input')[0].focus();
  };
});
//# sourceMappingURL=todoApp_v2.js.map