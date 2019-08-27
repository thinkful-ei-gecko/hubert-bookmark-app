'use strict';

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/HubertY';
  
  //requests server data and returns a json object
  const apiFetch = function(...args) {
    return fetch(...args)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error(`Error Code: ${response.status}`);
      })
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => console.log(`There is an ${error.message}`));
  };

  //gets all bookmark lists from the server
  const getBookmark = function() {
    return apiFetch(`${BASE_URL}/bookmarks`);
  };

  //the 'post' method creates a bookmark entry in our api
  const createBookmark = function(name) {
    const newData = JSON.stringify({name});
    return apiFetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: newData
    });
  };

  // Using the 'delete' method, this deletes the api entry of our bookmark
  const deleteBookmark = function(id) {
    return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-type': 'application/json'
      })
    });
  };

  return {
    getBookmark,
    createBookmark,
    deleteBookmark
  };
} ());