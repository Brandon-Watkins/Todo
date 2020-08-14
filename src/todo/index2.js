import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import PropTypes from "prop-types";
import * as Redux, { Provider, createStore } from "@reduxjs/toolkit";

import TodoApp from "TodoApp";
import todoStore from "./todoStore";


ReactDOM.render(
   <Provider store={createStore(todoStore)}>
      <TodoApp />
   </Provider>, document.getElementById('root')
);

if (document) document.addEventListener('DOMContentLoaded', function() {
   document.getElementById('addTodoInput')[0].focus();
   window.onclick = function() {document.getElementById('addTodoButton')[0].focus()};
})



