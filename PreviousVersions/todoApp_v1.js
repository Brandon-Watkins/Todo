import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import * as Redux from "@reduxjs/toolkit";
import {current} from "@reduxjs/toolkit";


//Reducer handling updating individual todo objects
const todo = (state = {}, action) => {
   switch (action.type) {
      case 'ADD_TODO':
         return {
            id: action.id,
            text: action.text,
            completed:false
         };
      case 'TOGGLE_TODO':
         if (state.id !== action.id) {
            return state;//Not the todo we're looking for.
         }
         return {
            ...state,
            completed: !state.completed
         };
      default:
         return state;
   }
}

// Reducer handling updating the list containing all todo objects
const todos = (state = [], action) => {
   switch (action.type) {
      case 'ADD_TODO':
         return [
            ...state,
            todo(undefined, action)
         ];
      case 'TOGGLE_TODO':
         return state.map(t => todo(t, action));
      default:
         return state;
   }
};

// Reducer handling updating the visibility filter for the app
const visibilityFilter = (state = 'SHOW_ALL', action) => {
   switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
         return action.filter;
      default:
         return state;
   }
};

// Reducer handling combining the list of todos with the visibility filter, representing the
// final UI state
const { combineReducers } = Redux;
const todoApp = combineReducers({
   todos,
   visibilityFilter
});

const { createStore } = Redux;
const store = createStore(todoApp);


/************************************* Render UI ******************************/

const handleKeyDown = (e) => {
   if (e.keyCode === 13) {
      e.preventDefault();
      if (btn.hasFocus) return;
      btn.focus();
   }
}

const handleKeyUp = (e) => {
   if (e.keyCode === 13) {
      e.preventDefault();
      btn.click();
   }
};

const handleButtonClick = (e) => {
   if (inp.value === '' || inp.value === undefined) return inp.focus();
   return (
      store.dispatch({
         type: 'ADD_TODO',
         text: inp.value,
         id: nextTodoId++
      }),
         inp.value ='',
         inp.focus()
   );
};

const { Component } = React;

const FilterLink = ({
                       filter,
                       currentFilter,
                       children
                    }) => {
   if (filter === currentFilter) {
      return <span>{children}</span>;
   }
   return (
      <a
         href='#'
         onClick={e => {
            e.preventDefault();
            store.dispatch({
               type: 'SET_VISIBILITY_FILTER',
               filter
            });
         }}
      >
         {children}
      </a>
   );
};

const getVisibleTodos = (
   todos,
   filter
) => {
   switch (filter) {
      case 'SHOW_ALL':
         return todos;
      case 'SHOW_COMPLETED':
         return todos.filter(
            t => t.completed
         );
      case 'SHOW_ACTIVE':
         return todos.filter(
            t => !t.completed
         );
   }
};

let inp;
let btn;
let nextTodoId = 0;
class TodoApp extends Component {
   render() {
      const {
         todos,
         visibilityFilter
      } = this.props;
      const visibleTodos = getVisibleTodos(
         todos,
         visibilityFilter
      );
      return (
         <div>
            <input
               ref={node => {
                  inp = node;
               }}
               onKeyUp={handleKeyUp}
               onKeyDown={handleKeyDown}
            />
            <button
               ref={buttonNode => {
                  btn = buttonNode;
               }}
               onClick={handleButtonClick}
               onKeyDown={handleKeyDown}
               onKeyUp={handleKeyUp}
            >
               Add Todo
            </button>
            <ul>
               {visibleTodos.map(todo =>
                  <li
                     key={todo.id}
                     onClick={() => {
                        store.dispatch({
                           type: 'TOGGLE_TODO',
                           id: todo.id
                        });
                     }}
                     style={{
                        textDecoration: todo.completed? 'line-through' : 'none'
                     }}
                  >
                     {todo.text}
                  </li>
               )}
            </ul>
            <p>
               Show:
               {' '}
               <FilterLink
                  filter='SHOW_ALL'
                  currentFilter={visibilityFilter}
               >
                  All
               </FilterLink>
               {' '}
               <FilterLink
                  filter='SHOW_ACTIVE'
                  currentFilter={visibilityFilter}
               >
                  Active
               </FilterLink>
               {' '}
               <FilterLink
                  filter='SHOW_COMPLETED'
                  currentFilter={visibilityFilter}
               >
                  Completed
               </FilterLink>
            </p>
         </div>
      )
   }
};

const render = () => {
   ReactDOM.render(
      <TodoApp
         {...store.getState()}
      />, document.getElementById('root')
   );
};

// Render the application, in response to the current application state.
// Calls render every time the store changes.
store.subscribe(render);
// Call render once to render the initial state.
render();
