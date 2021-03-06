import React from "react";
import "./styles/TodoApp.css";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";

const TodoApp = () => {
   const onClickFunction = () => {
      const input = document.getElementById('addTodoInput');
      if (input) input.focus();
      return;
   }
   return (
      <div
         id={'todoApp'}
         onClick={onClickFunction}
      >
         <h1 id={'todoHeader'}>Todo</h1>
         <AddTodo />
         <TodoList />
         <Footer />
         <p className={'todoAppInstructions'}>
            Left click an item to toggle its completion.
         </p>
         <p className={'todoAppInstructions'}>
            Right click an item to remove it from the list.
         </p>
      </div>
   );
};

export default TodoApp;
