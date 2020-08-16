import React from "react";
import "./styles/FilterLink.css";
import PropTypes from "prop-types";

const FilterLink = (props, { store }) => {
   const active = props.filter === store.getState().visibilityFilter;
   if (active) {
      return <span id={'filterSelection'}>{props.children}</span>;
   }
   return (
      <a
         id={'filterLink'}
         href='#'
         onClick={(e) => {
            e.preventDefault() || e.stopPropagation()
            store.dispatch({
               type: 'SET_VISIBILITY_FILTER',
               filter: props.filter
            })
         }}
      >
         {props.children}
      </a>
   );
};
FilterLink.contextTypes = {
   store: PropTypes.object
};

export default FilterLink;