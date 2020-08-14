import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import * as Redux from "@reduxjs/toolkit";
import deepFreeze from "deep-freeze";

/************************************* Reducers ******************************/


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
const { combineReducers } = Redux;
const todoApp = combineReducers({
   todos,
   visibilityFilter
});

/************************************* Event Handlers ******************************/

const handleKeyDown = (e, button) => {
   e = e || Window.event;
   if (e.keyCode === 13) {
      e.preventDefault();
      if (button.hasFocus) return;
      button.focus();
   }
}

const handleKeyUp = (e, button) => {
   e = e || Window.event;
   if (e.keyCode === 13) {
      e.preventDefault();
      button.click();
   }
};

let nextTodoId = 0;
const handleButtonClick = ({store, input}) => {
   if (input.value === '' || input.value === undefined) return input.focus();
   const temp = input.value;
   input.focus();
   input.value = '';
   if (store) return (
      store.dispatch({
         type: 'ADD_TODO',
         text: temp,
         id: nextTodoId++
      })
   );
};

const handleLeftClickTodo = ({store, id}) => {
   store.dispatch({
      type: 'TOGGLE_TODO',
      id
   })
}

const handleRightClickTodo = ({store, id}) => {
   store.dispatch({
      type: 'REMOVE_TODO',
      id
   })
   document.getElementsByTagName('input')[0].focus();
}

const handleClickTodo = ({e, id, store}) => {
   e = e || Window.event;
   if (e.type) {
      if (e.type === 'click') return handleLeftClickTodo({store, id});
      if (e.type === 'contextmenu'){
         e.preventDefault();
         return handleRightClickTodo({id, store});
      }
   }
   else if (e.which) {
      if (e.which === 0) return handleLeftClickTodo({store, id});
      if (e.which === 1){
         e.stopPropagation() || e.preventDefault();
         return handleRightClickTodo({id, store});
      }
   }
   else if (e.button) {
      if (e.button === 1) return handleLeftClickTodo(id);
      if (e.button === 2){
         e.stopPropagation() || e.preventDefault();
         return handleRightClickTodo({id, store});
      }
   }
}

/************************************* Presentation Components ******************************/

const AddTodo = ({ divStyle, inputStyle, buttonStyle, store }) => {
   let input = React.useRef(null);
   let button = React.useRef(null);
   return (
      <div
         style={divStyle}
         onClick={() =>
            input.focus()}
         onLoad={() =>
            input.focus()}
      >
         <input
            style={inputStyle}
            ref={node => {
               input = node;
            }}
            onKeyUp={(e) => handleKeyUp(e, button)}
            onKeyDown={(e) => handleKeyDown(e, button)}
         />
         <button
            style={buttonStyle}
            ref={buttonNode => {
               button = buttonNode;
            }}
            onClick={() => handleButtonClick({store, input})}
            onKeyDown={(e) => handleKeyDown(e, button)}
            onKeyUp={(e) => handleKeyUp(e, button)}
         >
            Add Todo
         </button>
      </div>
   );
};

const Todo = ({ style, onClick, completed, text, onContextMenu, id, store }) => {
   return (
      <li
         onClick={e => onClick({store, e, id})}
         onContextMenu={e => onContextMenu({store, e, id})}
         style={{
            textDecoration: completed? 'line-through' : 'none',
            style
         }}
      >
         {text}
      </li>
   );
}

const TodoList = ({ listStyle, singleTodoStyle, todos, onTodoClick, store }) => {
   return (
      <ul style={listStyle}>
         {todos.map(todo =>
            <Todo
               store={store}
               style={singleTodoStyle}
               key={todo.id}
               {...todo}
               onClick={onTodoClick}
               onContextMenu={onTodoClick}
            />
         )}
      </ul>
   );
}

const Footer = ({ footerStyle, selectionStyle, linkStyle, store }) => {
   return (
      <p style={footerStyle}>
         Show:
         {' '}
         <FilterLink
            store={store}
            selectionStyle={selectionStyle}
            linkStyle={linkStyle}
            filter='SHOW_ALL'
         >
            All
         </FilterLink>
         {' '}
         <FilterLink
            store={store}
            selectionStyle={selectionStyle}
            linkStyle={linkStyle}
            filter='SHOW_ACTIVE'
         >
            Active
         </FilterLink>
         {' '}
         <FilterLink
            store={store}
            selectionStyle={selectionStyle}
            linkStyle={linkStyle}
            filter='SHOW_COMPLETED'
         >
            Completed
         </FilterLink>
      </p>
   );
};

const Link = ({ selectionStyle, linkStyle, active, children, onClick }) => {
   if (active) {
      return <span style={selectionStyle}>{children}</span>;
   }
   return (
      <a
         style={linkStyle}
         href='#'
         onClick={e => {
            e.preventDefault();
            onClick();
         }}
      >
         {children}
      </a>
   );
};

/************************************* Container Components ******************************/

const { Component } = React;

class VisibleTodoList extends Component {
   componentDidMount() {
      const {store} = this.props;
      this.unsubscribe = store.subscribe(() =>
         this.forceUpdate()
      );
   }
   componentWillUnmount() {
      this.unsubscribe();
   }
   render() {
      const props = this.props;
      const {store} = props;
      const state = store.getState();
      return (
         <TodoList
            store={store}
            todos={
               getVisibleTodos(
                  state.todos,
                  state.visibilityFilter
               )
            }
            listStyle={props.listStyle}
            singleTodoStyle={props.singleTodoStyle}
            onTodoClick={handleClickTodo}
         />
      );
   };
}

class FilterLink extends Component {
   componentDidMount() {
      const {store} = this.props;
      this.unsubscribe = store.subscribe(() =>
         this.forceUpdate()
      );
   }
   componentWillUnmount() {
      this.unsubscribe();
   }
   render() {
      const props = this.props;
      const {store} = props;
      const state = store.getState();
      return (
         <Link
            active={props.filter === state.visibilityFilter}
            onClick={() =>
               store.dispatch({
                  type: 'SET_VISIBILITY_FILTER',
                  filter: props.filter
               })
            }
         >
            {props.children}
         </Link>
      );
   };
}

const getVisibleTodos = (todos, filter) => {
   switch (filter) {
      case 'SHOW_COMPLETED':
         return todos.filter(
            t => t.completed
         );
      case 'SHOW_ACTIVE':
         return todos.filter(
            t => !t.completed
         );
      default:
         return todos;
   }
};

//using position:'-webkit-sticky', which only works on Safari. Will need to change later
const TodoApp = ({store}) => {
   return (
      <div style={{ width:'15em' }}>
         <h1 style={{textAlign:'center', margin:'16px'}}>Todo</h1>
         <AddTodo
            store={store}
            divStyle={{ display:'block', alignContent:'center', margin:0, height:'1.25em',
               width:'100%', position:'-webkit-sticky', left:'0px', top:'0px' }}
            inputStyle={{ height:'calc(100% - 4px)', fontSize:'1em', position:'absolute', left:'0',
               right:'6.5em', border:'1px inset #ccc', margin:0, backgroundColor:'#eee',
               width:'calc(100% - 6.5em' }}
            buttonStyle={{ height:'100%', width:'6em', position:'absolute', right:'0',
               border:'1px outset #aaa', borderRadius:'4px', textAlign:'center',
               backgroundColor:'#eee', fontSize:'1em', padding:'0 0.4em' }}
         />
         <VisibleTodoList
            store={store}
            listStyle={{  }}
            singleTodoStyle={{  }}
         />
         <Footer
            store={store}
            footerStyle={{ textAlign:'center', margin:'3px', display:'block' }}
            selectionStyle={{  }}
            linkStyle={{  }}
         />
         <p style={{textAlign:'center', fontSize:'0.75em', margin:0}}>
            Left click an item to toggle its completion.
         </p>
         <p style={{textAlign:'center', fontSize:'0.75em', margin:0}}>
            Right click an item to remove it from the list.
         </p>
      </div>
   );
};

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

const { createStore } = Redux;

ReactDOM.render(
   <TodoApp store={createStore(todoApp)} />, document.getElementById('root')
);

if (document) document.addEventListener('DOMContentLoaded', function() {
   document.getElementsByTagName('input')[0].focus();
   window.onclick = function() {document.getElementsByTagName('input')[0].focus()};
})



