'use strict';

toogleCheckbox();
toogleCart();
addrmGoods();
actionPage();

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

    checkboxDiscount.addEventListener('click', changePrice);

    function changePrice() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price').textContent;
            const price = parseFloat(cardPrice);
            if (checkboxDiscount.checked) {
                if (!card.querySelector('.card-sale')) {
                    card.parentNode.remove();
                }
            }
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.remove();
            } else {
                if (!checkboxDiscount.checked) {
                    goods.appendChild(card.parentNode);
                }
            }
        });
    }
    min.addEventListener('change', changePrice);
    max.addEventListener('change', changePrice);

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