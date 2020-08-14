"use strict";

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

const mapDispatchToProps = (dispatch, {
  listStyle,
  singleTodoStyle,
  store
}) => {
  return {
    onTodoClick: handleClickTodo,
    store: store,
    listStyle: listStyle,
    singleTodoStyle: singleTodoStyle
  };
};

mapDispatchToProps.contextTypes = {
  store: _propTypes.default.object
};
const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);
//# sourceMappingURL=Questions.js.map