'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


// *****************************************Modal Window**************************************
const openModal = function(event){
    event.preventDefault;
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}


const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}


// The forEach() method calls a function for each element in an array.
btnOpenModal.forEach(button => button.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);


document.addEventListener('keydown', function(event){
    if(event.key === 'Escape' && !modal.classList.contains('hidden')){
        closeModal();
    }
});

//************************************** Section Scrolling *************************************
btnScrollTo.addEventListener('click', function(){
    section1.scrollIntoView({ behavior: 'smooth'});
});


// ************************************* Page Navigation ***************************************
// document.querySelectorAll('.nav__link').forEach(function (element){
//     element.addEventListener('click', function(event){
//         event.preventDefault();
//         const id = this.getAttribute('href');
        // console.log(id);
//         document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//     });
// });


document.querySelector('.nav__links').addEventListener('click', function(event){
    event.preventDefault();
    // console.log(event.target);
    if(event.target.classList.contains('nav__link')){
        const identifier = event.target.getAttribute('href');
        document.querySelector(identifier).scrollIntoView({behavior: 'smooth'});
    }
});


//******************************************* Tabbed Component ********************************/
tabsContainer.addEventListener('click', function(event){
    const clicked = event.target.closest('.operations__tab');
    console.log(clicked);

    // Guard Clause
    // If 'operations__tab' is not clicked, the retuen statement immediately exit the event listener function
    if(!clicked) return;

    // Remove active classes
    tabs.forEach(tabsButton => tabsButton.classList.remove('operations__tab--active'));

    tabsContent.forEach(operationsContent => operationsContent.classList.remove('operations__content--active'));

    // Activate content area
    clicked.classList.add('operations__tab--active');

    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});