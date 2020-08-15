import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import store from './todo/todoStore';
import App from './todo/TodoApp';

class Provider extends Component {
   getChildContext() {
      return {
         store: this.props.store
      };
   }
   render() {
      return this.props.children;
   }
}
Provider.childContextTypes = {
   store: PropTypes.object
};

const render = () => {
   ReactDOM.render(
      <Provider store={store}>
         <App />
      </Provider>, document.getElementById('root')
   );
};
export default render;

render();

if (document) {
   document.addEventListener('DOMContentLoaded', function() {
      const input = document.getElementById('addTodoInput');
      const app = document.getElementById('todoApp');
      if (input) {
         input.focus();
         if (app) {
            app.onclick = function() {input.focus()};
         }
      }
   });
}

