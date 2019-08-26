'use strict';
/* global cuid */

// eslint-disable-next-line no-unused-vars
const List = (function() {

  const validateTitle = function(title) {
    if (!title) throw new TypeError('Title must be filled');
  };

  const validateUrl = function(url) {
    if (!url) throw new TypeError('URL must be filled');
  };

  const create = function(title, url, description, rating) {
    return {
      id: cuid(),
      title,
      url,
      description,
      rating,
      expanded: false
    };
  };

  return {
    validateTitle,
    validateUrl,
    create
  };
});