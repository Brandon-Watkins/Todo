import "./styles.css";
import * as Redux from "@reduxjs/toolkit";
const { combineReducers } = Redux;


//Reducer handling updating individual todo objects
const todo = (state = {}, action) => {
   console.log('<todoStore> ' + action.type + ' received.');
   console.log('<todoStore> Before: id: ' + state.id + ', text: ' + state.text + ', completed: ' + state.completed);
   console.log('<todoStore> After: id: ' + action.id + ', text: ' + action.text + ', completed: false');
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
   console.log('<todos> state: ' + [...state])
   switch (action.type) {
      case 'ADD_TODO':
         return [
            ...state,
            todo(undefined, action)
         ];
      case 'TOGGLE_TODO':
         return state.map(t => todo(t, action));
      case 'REMOVE_TODO':
         return state.filter(t => t.id !== action.id);
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
const todoStore = combineReducers({
   todos,
   visibilityFilter
});

export default todoStore;