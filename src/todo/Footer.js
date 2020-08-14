import React from "react";
import "./styles.css";

import FilterLink from './FilterLink';

const Footer = () => {
   return (
      <p id={'footer'}>
         Show:
         {' '}
         <FilterLink filter='SHOW_ALL'>
            All
         </FilterLink>
         {' '}
         <FilterLink filter='SHOW_ACTIVE'>
            Active
         </FilterLink>
         {' '}
         <FilterLink filter='SHOW_COMPLETED'>
            Completed
         </FilterLink>
      </p>
   );
};

export default Footer;