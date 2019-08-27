'use strict';
/* global STORE, $ */

// eslint-disable-next-line no-unused-vars

const bookmarkList = (function() {

  function toggleForm() {
    $('.toggle-form').on('click', event => {
      event.preventDefault();
      STORE.toggleAdding();
      if (STORE.adding === true) {
        $('.new-list').html(addButtonForm);
      }
      //need to invoke render() here
      render();
    });
  }
	
  /*
  function hideForm() {
    STORE.adding ? $('.toggle-form').text('Close') : $('.toggle-form').text('Add');
  }
*/

  function addButtonForm() {
    return `
				<fieldset class="js-new-list">
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
            <label for="bookmark-description">Description</label>
            <textarea required rows="5" cols="50" class="form-description" id="bookmark-description" placeholder="Your description"></textarea>
				<div class="form-group" id="bookmark-buttons">
						<button type="submit" class="submit-button">Submit</button>
						<button class="cancel-button">Cancel</button>
				</div>
				</fieldset>
        `;
  }
	
  function generateBookmarkList(bookmark) {
    return `
		<li class="bookmark-item data-item-id=${bookmark.id}">
		`;
  }
	
  function getBookmarkValues() {
    $('.submit-button').submit( () => {
      event.preventDefault();
      const title = $('#bookmark-title').val();
      const url = $('#bookmark-url').val();
      const description = $('#bookmark-description').val();
      //const rating = $('#bookmark-rating').val();
      const item = {
        title,
        url,
        description,
        rating
      };
    });
  }
	

  function cancelFormButton() {
    $('.new-list').on('click', '.cancel-button', event => {
      event.preventDefault();
      $('.js-new-list').remove();
      STORE.toggleAdding();
    });
  }

  //This function gets the items in the store.items.
  //It is then mapped into array and generated to html by invoking generateBookmarkList()
  function generateBookmarkItems(bookmarkList) {
    const lists = bookmarkList.map(item => generateBookmarkList(item));
    return lists.join('');
  }

  //Non-functional
  function render() {
    let lists = [...STORE.lists];
    //if (STORE.rating)

    // renders bookmark list to the DOM
    const bookmarkListString = generateBookmarkItems(lists);

    // Inserts HTML into the DOM
    $('.bookmark-list').html(bookmarkListString);
  }
	
  function getIdFromElement(item) {
    return $(item)
      .closest('.bookmark-item')
      .data('item-id');
  }

  function handleNewBookmarkSubmit() {

  }

  function handleDeleteBookmarkClick() {

  }

  function eventListeners() {
    addButtonForm();
    cancelFormButton();
    toggleForm();
    handleDeleteBookmarkClick();
    handleNewBookmarkSubmit();
  }

  return {
    render,
    eventListeners
  };
} ());