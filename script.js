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
const nav = document.querySelector('.nav');


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


// **************************************** Menu fade Animation ********************************
const handleHover = function(event){
    if(event.target.classList.contains('nav__link')){
        // Element that is being hovered
        const link = event.target;
        // Get all the nav__links
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        // Select the logo
        const logo = link.closest('.nav').querySelector('img');

        
        siblings.forEach(element => {
            // If the nav__link is not equal to the one we are hovering on, then the opacity should be 0.5
            if(element !== link) element.style.opacity = this;
        });
        logo.style.opacity = this;
    }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// ****************************** Intersection Observer API *****************************
// When the Intersection observer detects changes in the intersection status of observed elements this function will run!

// The enrties parameter represents one observed element
const obsCallBack = function(entries){
    entries.forEach(entry => {
        console.log(entry);
    })
}

const obsOptions = {
    // root specifies the element that would be usded as the viewport. Since we have null, it means that the entire document viewport will be used
    root: null,
    // Defines what percentage of the targets visibility the callback function should be executed. In this case the Callback function will be triggered when 20% target element is visible
    threshold: [0, 0.2]
}

const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(section1);