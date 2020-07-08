console.log('Hello');
'use strict';

const modalAdd = document.querySelector('.modal');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmin = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const modalItem = document.querySelector('.modal__item');
// const card = document.querySelector('.card');
const catalog = document.querySelector('.catalog');

// Работа с модалным окном Добавить объявление
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
})

// Работа с модалным окном Карточки

catalog.addEventListener('click', (event) => {
    const target = event.target;
    // console.log(target);
    const card = target.closest('.card');
    modalItem.classList.remove('hide');

})

modalItem.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('modal__close') ||
        target === modalItem) {
        modalItem.classList.add('hide');
    }
})