export default function filter() {
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