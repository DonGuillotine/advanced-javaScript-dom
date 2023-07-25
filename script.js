'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');


// *****************************************Modal Window**************************************
const openModal = function(){
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
