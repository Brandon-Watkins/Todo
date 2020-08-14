import PropTypes from "prop-types";

const mapStateToProps = (state) => {
   return {
      todos: getVisibleTodos(
         state.todos,
         state.visibilityFilter
      )
   };
};

const mapDispatchToProps = (dispatch, {listStyle, singleTodoStyle, store}) => {
   return {
      onTodoClick: handleClickTodo,
      store: store,
      listStyle: listStyle,
      singleTodoStyle: singleTodoStyle
   };
};
mapDispatchToProps.contextTypes = {
   store: PropTypes.object
};

const VisibleTodoList = connect(
   mapStateToProps,
   mapDispatchToProps
)(TodoList);