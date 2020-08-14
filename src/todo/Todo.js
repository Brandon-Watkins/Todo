import React from "react";
import "./styles.css";
import PropTypes from "prop-types";

const Todo = ({ completed, text, id }, { store }) => {
   console.log('<Todo> Creating Todo: completed: ' + completed + ', text: ' + text + ', id: ' + id)
   return (
      <li
         onClick={() => {
            store.dispatch({
               type: 'TOGGLE_TODO',
               id
            });
            document.getElementsByTagName('input')[0].focus();
         }}
         onContextMenu={e => {
            e.preventDefault() || e.stopPropagation();
            store.dispatch({
               type: 'REMOVE_TODO',
               id
            });
            document.getElementsByTagName('input')[0].focus();
         }}
         style={{
            textDecoration: completed? 'line-through' : 'none'
         }}
      >
         {text}
      </li>
   );
};
Todo.contextTypes = {
   store: PropTypes.object
};

export default Todo;