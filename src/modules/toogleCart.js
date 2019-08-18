// Работа с корзиной
export default function toogleCart() {
    console.log('toogleCart');
    const removeBtn = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const btnClose = document.querySelector('.cart-close');

    removeBtn.addEventListener('click', () => {
        // modalCart.style.cssText = 'display: flex; background: #009999; opacity: 0.9;'
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // убираем прокрутку страницы под карзиной
    });

    btnClose.addEventListener('click', () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}