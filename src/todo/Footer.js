import React from "react";
import "./Footer.css";
import PropTypes from "prop-types";

import FilterLink from './FilterLink';

const Footer = (props, { store }) => {
   return (
      <p id={'Footer'}>
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
Footer.contextTypes = {
   store: PropTypes.object
};

export default Footer;