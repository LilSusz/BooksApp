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
    
      for(let book of dataSource.books) {
        const ratingBgc = thisBooksApp.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;

        const generatedHTML = templates.bookTemplate({
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          rating: book.rating,
          ratingBgc: ratingBgc,
          ratingWidth: ratingWidth,
        });
        
        thisBooksApp.element = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.elements.booksList);
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

    determineRatingBgc(rating) {
      let ratingStyle = '';

      if(rating < 6){
        ratingStyle = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8){
        ratingStyle = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        ratingStyle = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9){
        ratingStyle = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }
  
      return ratingStyle;
    }
    
  }
  new BooksApp();
}
