import React from "react";
import "./styles.css";
import PropTypes from "prop-types";

let nextTodoId = 0;

const AddTodo = (props, { store }) => {
   let input = React.useRef(null);
   let button = React.useRef(null);
   return (
      <div
         id={'addTodo'}
         onClick={() =>
            input.focus()}
         onLoad={() =>
            input.focus()}
      >
         <input
            id={'addTodoInput'}
            ref={node => {
               input = node;
            }}
            onKeyUp={(e) => {
               e = e || Window.event;
               if (e.keyCode === 13) {
                  e.preventDefault();
                  button.click();
               }
            }}
            onKeyDown={(e) => {
               e = e || Window.event;
               if (e.keyCode === 13) {
                  e.preventDefault();
                  if (button.hasFocus) return;
                  button.focus();
               }
            }}
         />
         <button
            id={'addTodoButton'}
            ref={buttonNode => {
               button = buttonNode;
            }}
            onClick={() => {
               if (input.value === '' || input.value === undefined) return input.focus();
               console.log('<AddTodo> Adding Todo: id: ' + nextTodoId + ', input: ' + input.value);
               const temp = input.value;
               input.focus();
               input.value = '';
               store.dispatch({
                  type: 'ADD_TODO',
                  text: temp,
                  id: nextTodoId++
               })
            }}
         >
            Add Todo
         </button>
      </div>
   );
};
AddTodo.contextTypes = {
   store: PropTypes.object
};

export default AddTodo;
