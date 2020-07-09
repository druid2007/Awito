console.log('Hello');
'use strict';

const dataBase = JSON.parse(localStorage.getItem('avito')) || [];

console.log(dataBase);


const modalAdd = document.querySelector('.modal');
const addAd = document.querySelector('.add__ad');
const modalBtnSubmin = document.querySelector('.modal__btn-submit');
const modalBtnWarning = document.querySelector('.modal__btn-warning')
const modalSubmit = document.querySelector('.modal__submit');
const modalItem = document.querySelector('.modal__item');
// const card = document.querySelector('.card');
const catalog = document.querySelector('.catalog');
const modalFileInput = document.querySelector('.modal__file-input');
const modalFileBtn = document.querySelector('.modal__file-btn');
const modalImageAdd = document.querySelector('.modal__image-add');


//Обернули в масив спред опертором все элементы
const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON');;

// Сохранение в localStorage
const saveDb = () => {
    localStorage.setItem('avito', JSON.stringify(dataBase));
}

// console.log(elementsModalSubmit);
const infoFoto = {};

const checkForm = () => {
    const validForm = elementsModalSubmit.every(elem => elem.value);
    modalBtnSubmin.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
}

const modalClose = (event) => {
    const target = event.target;
    if (target.closest('.modal__close') ||
        target.classList.contains('modal') ||
        event.code === 'Escape') {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        modalFileBtn.textContent = 'Добавить фото'
        modalImageAdd.src = 'img/temp.jpg';
        if (target === modalAdd) {
            modalSubmit.reset();
        }
        document.body.removeEventListener('keydown', modalClose);
        checkForm();
    }
}


const renderCard = () => {
    catalog.textContent = '';
    dataBase.forEach((element, i) => {
        catalog.insertAdjacentHTML('beforeend', `
                <li class="card" data-id="${i}">
                    <img class="card__image" src="data:image/jpeg;base64,${element.image}" alt="test">
                    <div class="card__description">
                        <h3 class="card__header">${element.nameItem} </h3>
                        <div class="card__price">${element.costItem} ₽</div>
                    </div>
                </li>
        `)
    });


}

// const closeModalEsc = function(event) {
//     if (event.code === 'Escape') {
//         modalAdd.classList.add('hide');
//         modalItem.classList.add('hide');
//         modalSubmit.reset();
//         document.body.removeEventListener('keydown', closeModalEsc);
//     }
// }

// Работа с модалным окном Добавить объявление


addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmin.disabled = true;
    document.body.addEventListener('keydown', modalClose);
})

modalAdd.addEventListener('click', modalClose);
modalItem.addEventListener('click', modalClose);
// Работа с модалным окном Карточки

catalog.addEventListener('click', (event) => {
    const target = event.target;
    // console.log(target);
    const card = target.closest('.card');

    if (card) {
        const id = card.dataset.id;
        modalItem.classList.remove('hide');
        document.body.addEventListener('keydown', modalClose);
        const status = dataBase[id].status === "new" ? 'Новый' : 'Б/у';
        modalItem.innerHTML = `
        <div class="modal__block">
            <h2 class="modal__header">Купить</h2>
            <div class="modal__content">
                <div><img class="modal__image modal__image-item" src="img/temp.jpg" alt="test"></div>
                <div class="modal__description">
                    <h3 class="modal__header-item">${dataBase[id].nameItem}</h3>
                    <p>Состояние: <span class="modal__status-item">${status}</span></p>
                    <p>Описание:
                        <span class="modal__description-item">${dataBase[id].descriptionItem}</span>
                    </p>
                    <p>Цена: <span class="modal__cost-item">${dataBase[id].costItem} ₽</span></p>
                    <button class="btn">Купить</button>
                </div>
            </div>
            <button class="modal__close">&#10008;</button>
        </div>
        `;

    }
})

modalFileInput.addEventListener('change', event => {
    const target = event.target;
    const reader = new FileReader();
    const file = target.files[0];
    infoFoto.name = file.name;
    infoFoto.size = file.size;
    reader.readAsBinaryString(file);
    reader.addEventListener('load', event => {
        if (infoFoto.size < 200000) {
            infoFoto.base64 = btoa(reader.result);
            modalImageAdd.src = `data:image/jpeg;base64,${infoFoto.base64}`;
        } else {
            console.log('Большой файл');

        }
    })

    console.log(target.files[0]);
    console.log(infoFoto);


})

modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        // console.log(elem.name);
        // console.log(elem.value);
        itemObj[elem.name] = elem.value

    }
    modalClose({ target: modalAdd });
    itemObj.image = infoFoto.base64;
    dataBase.push(itemObj);
    saveDb();
    renderCard();
    console.log(dataBase);
    // modalClose({ target: modalAdd });

})

renderCard();