// import filter from './filter';

// Фильтр Акций и цен
export default function actionPage() {
    const checkboxDiscount = document.getElementById('discount-checkbox');
    const cards = document.querySelectorAll('.goods .card');
    const goods = document.querySelector('.goods');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');
    function filter() {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price').textContent;
            const price = parseFloat(cardPrice);
            if (checkboxDiscount.checked) {
                if (!card.querySelector('.card-sale')) {
                    card.parentNode.remove();
                } else {
                    goods.appendChild(card.parentNode);
                    // console.log('card.parentNode_1: ', card);
                }
            } else {
                goods.appendChild(card.parentNode);
                // console.log('card.parentNode_2: ', card);
            }
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.remove();
            }
        });
    }

    checkboxDiscount.addEventListener('click', filter);
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