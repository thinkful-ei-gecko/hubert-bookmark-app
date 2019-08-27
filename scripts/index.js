'use strict';
/* eslint-disable no-undef */

$(document).ready(function() {
  console.log('index.js is loading');
  bookmarkList.eventListeners();
  bookmarkList.render();
  
  api.getBookmark()
    //.then(res => res.json())
    .then(lists => {
      lists.forEach(list => STORE.addList(list));
      bookmarkList.render();
    });
});