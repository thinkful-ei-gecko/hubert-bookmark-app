'use strict';
/* global store, $ */

// eslint-disable-next-line no-unused-vars

const bookmarkList = (function() {

  function generateAddForm(item) {
    $('#bookmark-list-form').submit(function(event) {
      event.preventDefault();
      STORE.toggleAdding();
      if(STORE.adding === true) {
        $('.bookmark-list').append(
        `
        <form class="text-form">
        <div class="form-group">
            <label for="bookmark-title">Title</label>
            <input required type="text" id="bookmark-title" name="bookmark-title" placeholder="e.g. Google">
        </div>
        <div class="form-group">
            <label for="bookmark-url">URL</label>
            <input required type="text" id="bookmark-title" name="bookmark-url" placeholder="http://www.google.com" disable="false" id="bookmark-url">
        </div>
        <div class="form-group">
            <label for="bookmark-rating">Rating</label>
            <input type="radio" class="form-check" id="rating-value" name="same" value="1">
            <label class="form-check-label" for="1">1</label>

            <input type="radio" class="form-check" id="rating-value" name="same" value="2">
            <label class="form-check-label" for="2">2</label>

            <input type="radio" class="form-check" id="rating-value" name="same" value="3">
            <label class="form-check-label" for="3">3</label>

            <input type="radio" class="form-check" id="rating-value" name="same" value="4">
            <label class="form-check-label" for="4">4</label>

            <input type="radio" class="form-check" id="rating-value" name="same" value="5">
            <label class="form-check-label" for="5">5</label>
        </div>
        <div class="form-group">
            <label for="bookmark-description">Description</label>
            <input required type="text" class="form-description" id="bookmark-description" placeholder="Your description">
        </div>
        <button type="submit" class="submit-button">Submit</button>
        <button class="cancel-button">Cancel</button>
        </form>
        `
        )
      }
    });
  };

  function renderForm() {
    return `
    <li class=""></li>
    `
  };

  function render() {
      let lists = [...STORE.items];
      
  };

  function init() {
      generateAddForm();
  }

  return {
    init
  };
} ());