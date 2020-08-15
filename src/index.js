



/** code to use separated components instead: **/


import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import PropTypes from "prop-types";

import store from './todo/todoStore';
import App from './todo/TodoApp';

const {Component} = React;

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
render();
store.subscribe(render);

if (document) document.addEventListener('DOMContentLoaded', function() {
   document.getElementsByTagName('input')[0].focus();
   window.onclick = function() {document.getElementsByTagName('input')[0].focus()};
})

