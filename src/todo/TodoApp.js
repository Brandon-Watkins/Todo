import React from "react";
import "./styles.css";

import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import Footer from "./Footer";

const TodoApp = () => {
   return (
      <div id={'todoApp'}>
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