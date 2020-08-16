import React from "react";
import ReactDOM from "react-dom";
import Provider from "../common/Provider";
import store from './todoStore';
import TodoApp from './TodoApp';

const render = () => {
   ReactDOM.render(
      <Provider store={store}>
         <TodoApp />
      </Provider>, document.getElementById('root')
   );
};
export default render;

render();
