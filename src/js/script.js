{
  'use strict';
  
  const select = {
    templateOf: {
      cartProduct: '#template-book',
    },
    elements: {
      booksList: '.books-list',
      bookImage: '.book__image',
      filters: '.filters',
      rating: '.book__rating__fill',
    },
  };

  const templates = {
    cartProduct: Handlebars.compile(document.querySelector(select.templateOf.cartProduct).innerHTML),
  };

  class BooksList {
    constructor(){
      const thisBooksList = this;
  
      thisBooksList.render();
      
    }

    render(){
      const thisBooksList = this;
    
      const booksContainer = document.querySelector(select.elements.booksList);

      for(let book of dataSource.books) {
        const generatedHTML = templates.cartProduct(book);
        thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
        booksContainer.appendChild(thisBooksList.element);
      }
    }
  }
  const app = new BooksList();
}