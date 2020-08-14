import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import * as Redux from "@reduxjs/toolkit";
import PropTypes from "prop-types";

import st from './todo/todoStore';
import Ap from './todo/TodoApp';

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

const { createStore } = Redux;



ReactDOM.render(
   <Provider store={createStore(st)}>
      <Ap />
   </Provider>, document.getElementById('root')
);


if (document) document.addEventListener('DOMContentLoaded', function() {
   document.getElementsByTagName('input')[0].focus();
   window.onclick = function() {document.getElementsByTagName('input')[0].focus()};
})