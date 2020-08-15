import React from "react";
import "./styles.css";
import PropTypes from "prop-types";

import Todo from "./Todo";

const TodoList = (props, { store }) => {
   const state = store.getState();
   return (
      <ul id={'todoList'}>
         {getVisibleTodos(state.todos, state.visibilityFilter).map(todo =>
            <Todo
               key={todo.id}
               {...todo}
            />
         )}
      </ul>
   );
};
TodoList.contextTypes = {
   store: PropTypes.object
};

const getVisibleTodos = (todos, filter) => {
   switch (filter) {
      case 'SHOW_COMPLETED':
         return todos.filter(
            t => t.completed
         );
      case 'SHOW_ACTIVE':
         return todos.filter(
            t => !t.completed
         );
      default:
         return todos;
   }
};

export default TodoList;