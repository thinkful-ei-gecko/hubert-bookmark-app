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

  return {
    lists: [], // list of bookmarks in store
    adding: false,
    //rating,
    addList,
    findAndDelete,
    findById,
    toggleAdding
  };
} ());