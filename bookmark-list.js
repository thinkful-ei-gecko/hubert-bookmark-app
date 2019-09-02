/* eslint-disable  */
'use strict';
/* global api, STORE, $ */

// eslint-disable-next-line no-unused-vars no-console

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

  function addButtonForm() {
    return `
				<fieldset class="js-new-list">
        <div class="form-group">
            <label class="bookmark-title" for="bookmark-title">Title</label>
            <input required type="text" id="bookmark-title" name="title" placeholder="e.g. Google">
        </div>
        <div class="form-group">
            <label class="bookmark-url" for="bookmark-url">URL</label>
            <input required type="url" id="bookmark-url" name="url" placeholder="http://www.google.com" disable="false" id="bookmark-url">
        </div>
        <div class="form-group" id="bookmark-rating">
            <label class="bookmark-rating" for="bookmark-rating">Rating</label>
            <input type="radio" class="form-check" id="rating-value" name="rating" value="1">
            <label class="form-check-label" for="1">1</label>

            <input type="radio" class="form-check" id="rating-value" name="rating" value="2">
            <label class="form-check-label" for="2">2</label>

            <input type="radio" class="form-check" id="rating-value" name="rating" value="3">
            <label class="form-check-label" for="3">3</label>

            <input type="radio" class="form-check" id="rating-value" name="rating" value="4">
            <label class="form-check-label" for="4">4</label>

            <input type="radio" class="form-check" id="rating-value" name="rating" value="5">
            <label class="form-check-label" for="5">5</label>
        </div>
        <div class="fieldset-description">
            <label class="bookmark-description" for="bookmark-description">Description</label>
            <textarea required rows="5" cols="50" class="form-description" name="desc" id="bookmark-description" placeholder="Your description"></textarea>
        </div>    
				<div class="form-group" id="bookmark-buttons">
						<button type="submit" class="submit-button">Submit</button>
						<button class="cancel-button">Cancel</button>
				</div>
				</fieldset>
        `;
  }
	
  //cannot get the toggle expand/collapse
  function generateBookmarkList(bookmark) {
    const emptyStar = '<span class="icon">★</span>';
    const checkedStar = '<span class="icon checked">★</span>';
    let generateStars = emptyStar.repeat(5);

    const starRating = bookmark.rating;
    
    if (starRating === 5) {
      generateStars = `${checkedStar.repeat(5)}`;
    } else if (starRating === 4) {
      generateStars = `${checkedStar.repeat(4)} ${emptyStar.repeat(1)}`;
    } else if (starRating === 3) {
      generateStars = `${checkedStar.repeat(3)} ${emptyStar.repeat(2)}`;
    } else if (starRating === 2) {
      generateStars = `${checkedStar.repeat(2)} ${emptyStar.repeat(3)}`;
    } else if (starRating === 1) {
      generateStars = `${checkedStar.repeat(1)} ${emptyStar.repeat(4)}`;
    }

    const expandedList = `
		<li class="expanded bookmark-list-item" data-item-id="${bookmark.id}">
		<button aria-label="${bookmark.title}" class="bookmark-title js-bookmark-title expand-button">
		<h2>${bookmark.title}</h2>
		<div class="rated-stars">${generateStars}</div> 
		</button>
		<p class="js-bookmark-description">${bookmark.desc}</p>
		<button aria-label="delete bookmark" class="js-delete-bookmark">Delete</button>
    <a href="${bookmark.url}" target="blank" class="js-bookmark-url" aria-label="Visit ${bookmark.title} Website">Visit Site</a>
    </li>
    `;
    if(bookmark.expanded) {
      return `${expandedList}`;
    }
    return `<li data-item-id="${bookmark.id}" class="bookmark-list-item">
    <button aria-label="${bookmark.title} bookmark that has ${bookmark.rating} stars" class="bookmark-title collapse-button js-bookmark-title">
    <h2>${bookmark.title}</h2>
    <div class="rated-stars" aria-label="${bookmark.rating} stars">${generateStars}</div>
    </button>
    </li>`;
  }
	
  function cancelFormButton() {
    $('.new-list').on('click', '.cancel-button', event => {
      event.preventDefault();
      $('.js-new-list').remove();
      STORE.toggleAdding();
      render();
    });
  }

  //This function gets the items in the store.items.
  //It is then mapped into array and generated to html by invoking generateBookmarkList()
  function generateBookmarkItems(bookmarkList) {
    const lists = bookmarkList.map(item => generateBookmarkList(item));
    return lists.join('');
  }

  //Shows an error message when necessary
  function renderError() {
    if(STORE.error) {
      const el = generateError(STORE.error);
      $('.error-container').html(el);
      render();
    } else {
      $('.error-container').empty();
    }
  }

  //Generates an HTML error message
  function generateError(errorMessage) {
    return `
    <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${errorMessage}</p>
      </section>
    `;
  }

  function render() {
    //if (STORE.rating)
    let lists = [...STORE.lists];

    // Inserts HTML into the DOM
    if(STORE.filterBy) {
      lists = lists.filter(item => item.rating > STORE.filterBy);
      console.log(lists);
    }
    // renders bookmark list to the DOM
    const bookmarkListString = generateBookmarkItems(lists);
    $('.bookmark-list').html(bookmarkListString);
  }
	
  function getIdFromElement(item) {
    console.log($(item).closest('.bookmark-list-item').data('item-id'));
    return $(item)
      .closest('.bookmark-list-item')
      .data('item-id');
  }

  //Converts form values into JSON
  function serializeJson(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val,name) => o[name] = val);
    return JSON.stringify(o);
  }

  function handleNewBookmarkSubmit() {
    $('body').on('submit', '.new-list', event => {
      event.preventDefault();
      let formElement = $('.new-list')[0];
      let serial = serializeJson(formElement);
		
      api.createBookmark(serial)
        .then((newBookmark) => {
          STORE.addList(newBookmark);
          STORE.toggleExpand();
          render();
        })
        .catch(err => {
          STORE.setError(err.message);
          renderError();
        });
      $('.js-new-list').remove();
      STORE.adding = !STORE.adding;
      render();    
    });
  }
  
  function handleBookmarkExpand() {
    $('.bookmark-list').on('click', '.js-bookmark-title', event => {
      const ID = getIdFromElement(event.currentTarget);
      const currentList = STORE.findById(ID);
      if (!currentList.expanded) {
        currentList.expanded = true;
      } else {
        currentList.expanded = false;
      }
      render();
    });
  }

  function handleDeleteBookmarkClick() {
    $('.bookmark-list').on('click', '.js-delete-bookmark', event => {
      const id = getIdFromElement(event.currentTarget);
      console.log(id);
      api.deleteBookmark(id)
        .then(() => {
          STORE.findAndDelete(id);
          render();
        })
        .catch(err => {
          STORE.setError(err.message);
          renderError();
        });
    });
  }
	
  function handleFilterRating() {
    $('.bookmark-filter').on('change', function() {
      let selectRating = $(this).val();
      console.log(selectRating);
      STORE.setFilter(selectRating);
      render();
    });
  }

  function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
      STORE.setError(null);
      renderError();
    });
  }

  function eventListeners() {
    addButtonForm();
    cancelFormButton();
    toggleForm();
    handleDeleteBookmarkClick();
    handleNewBookmarkSubmit();
    handleBookmarkExpand();
    handleFilterRating();
    handleCloseError();
  }

  return {
    eventListeners,
    render
  };
} ());