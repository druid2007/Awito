console.log('Hello');
'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmin = document.querySelector('.modal__btn-submit');
const modalBtnWarning = document.querySelector('.modal__btn-warning')
const modalSubmit = document.querySelector('.modal__submit');
const modalItem = document.querySelector('.modal__item');
// const card = document.querySelector('.card');
const catalog = document.querySelector('.catalog');

//Обернули в масив спред опертором все элементы
const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON');;



// console.log(elementsModalSubmit);


const modalClose = function(event) {
    const target = event.target;
    if (target.classList.contains('modal__close') || target === this) {
        this.classList.add('hide');
        if (this === modalAdd) {
            modalSubmit.reset();
        }
    }
}

const closeModalEsc = function(event) {
    if (event.code === 'Escape') {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        modalSubmit.reset();
        document.body.removeEventListener('keydown', closeModalEsc);
    }
}

// Работа с модалным окном Добавить объявление


addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmin.disabled = true;
    document.body.addEventListener('keydown', closeModalEsc);
})

modalAdd.addEventListener('click', modalClose);
modalItem.addEventListener('click', modalClose);
// Работа с модалным окном Карточки

catalog.addEventListener('click', (event) => {
    const target = event.target;
    // console.log(target);
    if (target.closest('.card')) {
        modalItem.classList.remove('hide');
        document.body.addEventListener('keydown', closeModalEsc);
    }
})

modalSubmit.addEventListener('input', () => {
    const validForm = elementsModalSubmit.every(elem => elem.value);
    console.log(validForm);
    modalBtnSubmin.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
})

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        console.log(elem.name);
        console.log(elem.value);
        itemObj[elem.name] = elem.value

    }

    dataBase.push(itemObj);
    console.log(dataBase);

})