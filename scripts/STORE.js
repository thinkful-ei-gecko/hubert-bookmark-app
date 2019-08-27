'use strict';
/* global STORE */
// eslint-disable-next-line no-unused-vars

const STORE = (function() {

  const addList = function(bookmark) {
    this.lists.push(bookmark);
  };

  const findAndDelete = function(id) {
    this.lists = this.lists.filter(item => item.id !== id);
  };

  const findById = function(id) {
    return this.lists.find(item => item.id === id);
  };

  const toggleAdding = function() {
    this.adding = !this.adding;
  };

  const setFilter = function(rating) {
    this.filterBy = rating;
  };

  const toggleExpand = function() {
    this.formExpanded = !this.formExpanded;
  };

  /*
  const expandBookmark = function(id) {
    const selectExpand = this.findById(id);
    selectExpand.expanded = !selectExpand.expanded;
  };
*/
  //add error method
  const setError = function(error) {
    this.error = error;
  };

  return {
    lists: [], // list of bookmarks in store
    adding: false,
    filterBy: 0,
    expanded: false,
    error: null,

    //rating,
    //expandBookmark,
    setError,
    setFilter,
    toggleExpand,
    addList,
    findAndDelete,
    findById,
    toggleAdding
  };
} ());