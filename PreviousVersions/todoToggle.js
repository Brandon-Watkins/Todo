import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import * as Redux from "@reduxjs/toolkit";
import expect from "expect";
import deepFreeze from "deep-freeze";

export default function App() {

   const toggleTodo = (todo) => {
      return Object.assign({}, todo, {
         completed: !todo.completed
      });
   };

   const testToggleTodo = () => {
      const todoBefore = {
         id: 0,
         text: 'Learn Redux',
         completed: false
      };
      const todoAfter = {
         id: 0,
         text: 'Learn Redux',
         completed: true
      };

      expect(
         toggleTodo(todoBefore)
      ).toEqual(todoAfter);
   };

   testToggleTodo();
   console.log('All tests passed.')

   return (
      <div className="App">
         <h1>Hello World</h1>
         <h2>Do stuff.</h2>
         <p>And things.</p>
         <p>And more things.</p>
      </div>
   );

}
