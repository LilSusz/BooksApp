{
  'use strict';
  
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    elements: {
      booksList: '.books-list',
      bookImage: '.book__image',
      filters: '.filters',
      rating: '.book__rating__fill',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class BooksApp {
    constructor(){
      const thisBooksApp = this;
  
      thisBooksApp.favoriteBooks = [];
      
      thisBooksApp.render();
      thisBooksApp.initActions();
      
    }

    render(){
      const thisBooksApp = this;
    
      const bookContainer = document.querySelector(select.elements.booksList);

      for(let book of dataSource.books) {
        const generatedHTML = templates.bookTemplate(book);
        thisBooksApp.element = utils.createDOMFromHTML(generatedHTML);
        bookContainer.appendChild(thisBooksApp.element);
      }
    }

    initActions(){
      const thisBooksApp = this;
      
      const bookContainer = document.querySelector(select.elements.booksList);
      const images = bookContainer.querySelectorAll(select.elements.bookImage);
      console.log('container ' + bookContainer);
      console.log('images ' + images);
      for(const book of images){
        book.addEventListener('dblclick', function(event){
          //console.log(select.elements.bookImage);
          event.preventDefault();
            
          const image = event.target.offsetParent;
            
          if(image.classList.contains('book__image')) {
            
            const dataId = image.getAttribute('data-id');
            console.log('dataId', dataId);

            if(!thisBooksApp.favoriteBooks.includes(dataId)){
              image.classList.add('favorite');
              thisBooksApp.favoriteBooks.push(dataId);
                            
            } else {
              const indexOfBook = thisBooksApp.favoriteBooks.indexOf(dataId);
              thisBooksApp.favoriteBooks.splice(indexOfBook, 1);
              image.classList.remove('favorite');
            }
          }
            
          console.log('image' + image);
          console.log('favoriteBooks', thisBooksApp.favoriteBooks);
            
        });
      }
    }
  }
  new BooksApp();
}