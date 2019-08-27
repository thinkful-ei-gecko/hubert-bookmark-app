'use strict';
/* global STORE, $ */

// eslint-disable-next-line no-unused-vars

const bookmarkList = (function() {

  function toggleForm() {
    $('.toggle-form').on('click', function(event) {
      STORE.toggleAdding();
      $('.new-list').html(addButtonForm);
      hideForm();
      //need to invoke render() here
      render();
    });
  }

  function hideForm() {
    STORE.adding ? $('.toggle-form').text('Close') : $('.toggle-form').text('Add');
  }

  function addButtonForm() {
    return STORE.adding ? `
        <form class="text-form">
        <div class="form-group">
            <label for="bookmark-title">Title</label>
            <input required type="text" id="bookmark-title" name="bookmark-title" placeholder="e.g. Google">
        </div>
        <div class="form-group">
            <label for="bookmark-url">URL</label>
            <input required type="text" id="bookmark-url" name="bookmark-url" placeholder="http://www.google.com" disable="false" id="bookmark-url">
        </div>
        <div class="form-group" id="bookmark-rating">
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
        ` : '';
	}
	
	function getBookmarkValues() {
		$('.submit-button').submit(function(event) {
			event.preventDefault();
			const title = $('#bookmark-title').val();
			const url = $('#bookmark-url').val();
			const description = $('#bookmark-description').val();
			//const rating = $('#bookmark-rating').val();
		})
	}
	
  function cancelFormButton() {
    $('.bookmark-list').on('click', '.cancel-button', function(event) {
      event.preventDefault();
      $('.text-form').remove();
      STORE.toggleAdding();
    });
  }

  function generateBookmarkItems(bookmarkList) {
    const lists = bookmarkList.map(item => addButtonForm(item));
    return lists.join('');
  }

  function render() {
    let lists = [...STORE.lists];
    //if (STORE.rating)

    // renders bookmark list to the DOM
    const bookmarkListString = generateBookmarkItems(lists);

    // Inserts HTML into the DOM
    $('.bookmark-list').html(bookmarkListString);
  }

  function init() {
    addButtonForm();
    cancelFormButton();
    toggleForm();
  }

  return {
    render,
    init
  };
} ());