import filter from './filter';

// Фильтр Акций и цен
export default function actionPage() {
    const checkboxDiscount = document.getElementById('discount-checkbox');
    const cards = document.querySelectorAll('.goods .card');
    const goods = document.querySelector('.goods');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const activeLi = document.querySelector('.catalog-list li.active');
    const search = document.querySelector('.search-wrapper_input');
    const searchBtn = document.querySelector('.search-btn');


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