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

const modalImageItem = document.querySelector('.modal__image-item');
const modalHeaderItem = document.querySelector('.modal__header-item');
const modalStatusItem = document.querySelector('.modal__status-item');
const modalDescriptionItem = document.querySelector('.modal__description-item');
const modalCostItem = document.querySelector('.modal__cost-item');

const searchInput = document.querySelector('.search__input');

const menuContainer = document.querySelector('.menu__container');

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


const renderCard = (db = dataBase) => {
    catalog.textContent = '';
    db.forEach((element, i) => {
        catalog.insertAdjacentHTML('beforeend', `
                <li class="card" data-id="${element.id}">
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


menuContainer.addEventListener('click', event => {
    const target = event.target
    if (target.tagName === 'A') {
        const result = dataBase.filter(item => item.category === target.dataset.category);
        renderCard(result);
    }

});

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
        console.log(id);

        const result = dataBase.find(item => item.id === +card.dataset.id);
        status = result.status === "new" ? 'Новый' : 'Б/у';
        //заполняем форму
        modalImageItem.src = `data:image/jpeg;base64,${result.image}`;
        modalHeaderItem.textContent = result.nameItem;
        modalStatusItem.textContent = status;
        modalDescriptionItem.textContent = result.descriptionItem;
        modalCostItem.textContent = result.costItem;
        // показываем форму
        modalItem.classList.remove('hide');
        document.body.addEventListener('keydown', modalClose);

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
        itemObj[elem.name] = elem.value
    }
    modalClose({ target: modalAdd });
    itemObj.image = infoFoto.base64;
    itemObj.id = dataBase.length + 1;
    dataBase.push(itemObj);
    saveDb();
    renderCard();
    // console.log(dataBase);
    // modalClose({ target: modalAdd });

})

searchInput.addEventListener('input', () => {
    const valueSearch = searchInput.value.trim().toLowerCase();
    if (valueSearch.length > 2) {
        console.log(valueSearch);
        const result = dataBase.filter(item => item.nameItem.toLowerCase().includes(valueSearch));
        console.log(result);
        renderCard(result);

    }
});

renderCard();