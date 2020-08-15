import React from "react";
import "./Todo.css";
import PropTypes from "prop-types";
import render from "../index.js";

import Todo from "./Todo";

const TodoList = (props, { store }) => {
   const state = store.getState();
   React.useEffect( () => {
      const unsubscribe = store.subscribe(render);
      return () => {
         unsubscribe();
      };
   }, [store.getState().todos]);
   return (
      <ul id={'TodoList'}>
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