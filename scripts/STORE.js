'use strict';
/* global  */
// eslint-disable-next-line no-unused-vars

const STORE = (function() {

  const toggleAdding = function() {
    this.adding = !this.adding;
  };

  return {
    lists: [],
    expanded: false,
    adding: false,
    toggleAdding
  };
} ());