import React from 'react';
//import logo from './logo.svg';
import logo from './reactLogo.svg';
import './App.css';
import TodoRender from './todo/App';

function App() {
   return (
      <div className="App">
         <header className="App-header">
            <div id={"App-title"}>
               <img src={logo} className="App-logo" alt="logo" />
               <h1>
                  Brandon's React Web Apps
               </h1>
            </div>
            <div id={"App-navigation"}>
               <ul id={"App-list"}>
                  <li>
                     <a
                        className="App-link"
                        href="./"
                        onClick={(e) => {
                           e.preventDefault();
                           return TodoRender();
                        }}
                     >
                        Todo
                     </a>
                  </li>
               </ul>
            </div>
         </header>
      </div>
   );
}

export default App;
