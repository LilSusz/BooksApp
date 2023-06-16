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
      thisBooksApp.filters = [];
      
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
      
      for(const book of images){
        book.addEventListener('dblclick', function(event){
          event.preventDefault();
            
          const image = event.target.offsetParent;
            
          if(image.classList.contains('book__image')) {
            
            const dataId = image.getAttribute('data-id');

            if(!thisBooksApp.favoriteBooks.includes(dataId)){
              image.classList.add('favorite');
              thisBooksApp.favoriteBooks.push(dataId);
                            
            } else {
              const indexOfBook = thisBooksApp.favoriteBooks.indexOf(dataId);
              thisBooksApp.favoriteBooks.splice(indexOfBook, 1);
              image.classList.remove('favorite');
            }
          }
        });
      }

      const bookFilter = document.querySelector(select.elements.filters);
      bookFilter.addEventListener('click', function(event){
        const clickedElement = event.target;

        if(clickedElement.tagName == 'INPUT' 
          && clickedElement.type == 'checkbox' 
          && clickedElement.name == 'filter'){

          if(clickedElement.checked == true){
            thisBooksApp.filters.push(clickedElement.value);
          } else {
            const indexOfValue = thisBooksApp.filters.indexOf(clickedElement.value);
            thisBooksApp.filters.splice(indexOfValue, 1);
          }

          thisBooksApp.filterBooks();
        }
      });
    }

    filterBooks(){
      const thisBooksApp = this;

      for(let book of dataSource.books){
        let shouldBeHidden = false;

        for(const filter of thisBooksApp.filters) {
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }

        const filterOfHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');

        if(shouldBeHidden) {          
          filterOfHidden.classList.add('hidden');
        } else {
          filterOfHidden.classList.remove('hidden');
        }
      }
    }
  }
  new BooksApp();
}
