export default function filter() {
    const checkboxDiscount = document.getElementById('discount-checkbox');
    const cards = document.querySelectorAll('.goods .card');
    const goods = document.querySelector('.goods');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
    const activeLi = document.querySelector('.catalog-list li.active');
    cards.forEach((card) => {
        const cardPrice = card.querySelector('.card-price').textContent;
        const price = parseFloat(cardPrice);
        const discount = card.querySelector('.card-sale');
        card.parentNode.style.display='';
        if ((min.value && price < min.value) || (max.value && price > max.value)) {
            // card.parentNode.remove();
            card.parentNode.style.display='none';
        } else if (checkboxDiscount.checked && !discount ) {
            // card.parentNode.remove();
            card.parentNode.style.display='none';
        } else if (activeLi) {
            if (card.dataset.category !== activeLi.textContent){
            card.parentNode.style.display='none';
            }   
        }          
        // *********Фильтр Вариант №2 *******************************************************
        // ****Чтобы заработало нужно перенести данную функцию в actionPage и убрать вызов этой функции в renderCatalog, плюс удалить верхние переменные перед cards.forEach((card)****     
        // if (checkboxDiscount.checked) {
        //     if (!discount) {
        //         card.parentNode.remove();
        //         // card.parentNode.style.display='none';
        //     } else {
        //         goods.appendChild(card.parentNode);
        //         // card.parentNode.style.display='';
        //     }
        // } else {
        //     goods.appendChild(card.parentNode);
        //     // card.parentNode.style.display='';
        // }
        // if ((min.value && price < min.value) || (max.value && price > max.value)) {
        //     card.parentNode.remove();
        //     // card.parentNode.style.display='none';
        // }           
        // ***********************************************************************************
    });
}