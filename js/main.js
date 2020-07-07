console.log('Hello');
'use strict';

const modalAdd = document.querySelector('.modal');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmin = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');


document.body.addEventListener('keyup', (event) => {
    if (event.keyCode == 27) {
        modalAdd.classList.add('hide');
        modalSubmit.reset();
    }
    console.log(event.key);
})

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmin.disabled = true;
})

modalAdd.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('modal__close') ||
        target === modalAdd) {
        modalAdd.classList.add('hide');
        modalSubmit.reset();
    }


    console.log(event);
})


console.log(modalAdd);