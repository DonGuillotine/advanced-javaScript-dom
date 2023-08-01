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



// ********************************** Sticky Navigation **************************************
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(enrties){
    const entry = enrties[0];
    console.log(entry);

    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

const navOptions = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
}


const headerObserver = new IntersectionObserver(stickyNav, navOptions);
headerObserver.observe(header);


//************************************ Reaveal Section on scroll ******************************/
const allSections = document.querySelectorAll('.section');


// The enrties parameter represents the observed element. It contains info about it's intersection
// The observer parameter holds an instance of the IntersectionObserver that is responsible for tracking the intersection changes.
const revealSection = function(entries, observer){
    const entry = entries[0];

    if(!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target)
}

const revealOptions = {
    root: null,
    threshold: 0.15
}

const sectionObserver = new IntersectionObserver(revealSection, revealOptions);


allSections.forEach(function (section){
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// ************************************* Lazy Loading Images *********************************
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(enrties, observer){
    const entry = enrties[0];

    if(!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function(){
        entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
}

const ImgOptions = {
    root: null,
    threshold: 0.5,
    rootMargin: '200px'
}

const imgObserver = new IntersectionObserver(loadImg, ImgOptions);
imgTargets.forEach(img => imgObserver.observe(img));







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

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);


const slider = function(){
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let currentSlide = 0;
    const maximumSlide = slides.length;


    const createDots = function(){
        slides.forEach(function(_, i){
            dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    }

    const activateDot = function(slide){
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

        document.querySelector(`dots__dot[data-slide="${slide}]`).classList.add('dots__dot--active');
    }

    const goToSlide = function(slide){
        slides.forEach((slide, i) => slide.style.transform = `translateX(${100 * (i - slide)}%)`);
    }

    const nextSlide = function(){
        if(currentSlide === maximumSlide - 1){
            currentSlide = 0;
        }
        else{
            currentSlide++;
        }
        goToSlide(currentSlide);
        activateDot(currentSlide);
    }

    const previousSlide = function(){
        if(currentSlide === 0){
            currentSlide = maximumSlide - 1;
        }
        else{
            currentSlide--;
        }
        goToSlide(currentSlide);
        activateDot(currentSlide);
    }

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', previousSlide);

    createDots();
}

slider();