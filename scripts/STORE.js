'use strict';
/* global  */
// eslint-disable-next-line no-unused-vars

const STORE = (function() {

  const addList = function(bookmark) {
    this.lists.push(bookmark)
  };

  const deleteList = function(id) {
    this.lists = this.lists.filter(item => item.id !== id);
  };

  const findById = function(id) {

  };

  const toggleAdding = function() {
    this.adding = !this.adding;
  };

  return {
    lists: [], // list of bookmarks in store
    adding: false,
    //rating,
    addList,
    deleteList,
    findById,
    toggleAdding
  };
} ());