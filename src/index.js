'use strict';

getData().then((data) => {
    renderCards(data);
    toogleCheckbox();
    toogleCart();
    addrmGoods();
    actionPage();
    renderCatalog();
});

// Работа с checkbox
function toogleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('change', function () {
            if (this.checked === true) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    }
}
// end Работа с checkbox

// Работа с корзиной
function toogleCart() {
    const removeBtn = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const btnClose = document.querySelector('.cart-close');

    removeBtn.addEventListener('click', () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    btnClose.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}
// end Работа с корзиной

// Работа с товаром
function addrmGoods() {
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.getElementById('cart-empty');
    const countGoods = document.querySelector('.counter');

    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            cartEmpty.remove();
            showData();
            const removeBtn = cardClone.querySelector('button');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            });
        });
    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card');
        const cardsPrice = cartWrapper.querySelectorAll('.card-price');
        const total = document.querySelector('.cart-total span');
        countGoods.textContent = cardsCart.length;
        let sum = 0;
        cardsPrice.forEach((elem) => {
            let price = parseFloat(elem.textContent);
            sum += price;
        });
        total.textContent = sum;
        if (cardsCart.length === 0) {
            cartWrapper.appendChild(cartEmpty);
        }
    }
}
// end Работа с товаром

// Работа с фильтром
function actionPage() {
    const checkboxDiscount = document.getElementById('discount-checkbox');
    const cards = document.querySelectorAll('.goods .card');
    const goods = document.querySelector('.goods');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');

    checkboxDiscount.addEventListener('click', filter);

    function filter() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price').textContent;
            const price = parseFloat(cardPrice);
            if (checkboxDiscount.checked) {
                if (!card.querySelector('.card-sale')) {
                    card.parentNode.remove();
                } else {
                    goods.appendChild(card.parentNode);
                }
            } else {
                goods.appendChild(card.parentNode);
            }
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.remove();
            }
        });
    }
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((card) => {
            const title = card.querySelector('.card-title').textContent;
            if (!searchText.test(title)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
        search.value = '';
    });
}
//end Работа с фильтром

// получене даанных с сервера

function getData() {
    return fetch('../db/db.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Данные не получены:" + response.status);
            }
        })
        .then(data => {
            return data;
        })
        .catch(err => console.warn(err));

}
//вывод карточек товара
function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good) => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML += `<div class="card" data-category = "${good.category}">
        ${good.sale ?'<div class="card-sale">🔥Hot Sale🔥</div>':''}
                        <div class="card-img-wrapper">
                            <span class="card-img-top"
                            style="background-image: url('${good.img}')"></span>
                         </div>
                        <div class="card-body justify-content-between">
                          <div class="card-price" style = "${good.sale ?'color:red' : ''}">${good.price}</div>
                          <h5 class="card-title">${good.title}</h5>
                        <button class="btn btn-primary">В корзину</button>
                       </div>
                     </div>`;
        goodsWrapper.appendChild(card);
    });
    // 
}

// end получене даанных с сервера

// Фильтр по категориям
function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');
    const categories = new Set();
    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });
    categories.forEach((item) => {
        const li = document.createElement('li');
        catalogList.appendChild(li);
        li.textContent = item;
    });

    catalogBtn.addEventListener('click', () => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }
        if (event.target.tagName === 'LI') {
            cards.forEach((card) => {
                  if (event.target.textContent === card.dataset.category) {
                      card.parentNode.style.display = '';
                  } else {
                    card.parentNode.style.display = 'none';
                  }               
            });
        }
    });
}
// end Фильтр по категориям