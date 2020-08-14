import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import * as Redux from "@reduxjs/toolkit";
import expect from "expect";

export default function App() {

   const counter = (state = 0, action) => {
      switch (action.type) {
         case 'INCREMENT':
            return state + 1;
         case 'DECREMENT':
            return state - 1;
         default:
            return state;
      }
   }

   const Counter = ({
                       value,
                       onIncrement,
                       onDecrement
                    }) => (
      <div>
         <h1>{value}</h1>
         <button onClick={onDecrement}>-</button>
         <button onClick={onIncrement}>+</button>
      </div>
   );

   {/* Creating my own createStore method below, to understand it. It is mostly the same as the
      one that ships with Redux.
      const { createStore } = Redux;
   */}

   const createStore = (reducer) => {
      let listeners = [];
      let state;
      const getState = () => state;

      const dispatch = (action) => {
         state = reducer(state, action);
         listeners.forEach(listener => listener());
      };

      const subscribe = (listener) => {
         listeners.push(listener);
         return () => {
            listeners = listeners.filter(l => l !== listener);
         };
      };
      {/*
         this returns a function, that can remove. it doesn't run said function. ie.
         const remove = subscribe(myListener);
         // later:
         remove();
      */}

      {/* dispatch a dummy state, just to get the reducer to return an initial value. */}
      dispatch({});

      return { getState, dispatch, subscribe };
   };

   const store = createStore(counter);

   const render = () => {
      ReactDOM.render(
         <Counter
            value={store.getState()}
            onIncrement={() =>
               store.dispatch({
                  type: 'INCREMENT'
               })
            }
            onDecrement={() =>
               store.dispatch({
                  type: 'DECREMENT'
               })
            }
         />,
         document.getElementById('root')
      );
   };

   store.subscribe(render);
   render();





   {/* Counter tests
   expect(
      counter(0, {type: 'INCREMENT'})
   ).toEqual(1);

   expect(
      counter(1, {type: 'INCREMENT'})
   ).toEqual(2);

   expect(
      counter(2, {type: 'DECREMENT'})
   ).toEqual(1);

   expect(
      counter(1, {type: 'DECREMENT'})
   ).toEqual(0);

   expect(
      counter(1, {type: 'SOMETHING_ELSE'})
   ).toEqual(1);

   expect(
      counter(undefined, {})
   ).toEqual(0);
   */}

   return (
      <div className="App">
         <h1>Hello World</h1>
         <h2>Do stuff.</h2>
         <p>And things.</p>
         <p>And more things.</p>
      </div>
   );
}
