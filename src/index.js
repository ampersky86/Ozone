'use strict';

// checkbox
let checkbox = document.querySelectorAll('.filter-check_checkbox');

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('change', function () {
        if (this.checked === true ) {
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });    
}

// end checkbox

// корзина
const btnCart = document.getElementById('cart');
const modalCart = document.querySelector('.cart');
const btnClose = document.querySelector('.cart-close');

btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

btnClose.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
});
// end корзина

// работа с товаром
const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');
const btnCardDel = document.querySelectorAll('.cart-wrapper .card');
const cartEmpty = document.getElementById('cart-empty');
const countGoods = document.querySelector('.counter');
const cardsCart = document.querySelector('.cart-wrapper');

cards.forEach((card) => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
         const cardClone = card.cloneNode(true);
         const btnCart = cardClone.querySelector('button');
         btnCart.textContent = 'Удалить';
         cardClone.addEventListener('click', () => {
            cardClone.remove();
         });
         cartWrapper.appendChild(cardClone);
         cartEmpty.remove();
         showData();
    });
});

function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card');  
    countGoods.textContent = cardsCart.length;
}
// работа с товаром
// end 
