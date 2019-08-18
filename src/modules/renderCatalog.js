// Фильтр по категориям
export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');
    const filterTitle = document.querySelector('.filter-title h5');
    const categories = new Set();
    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });

    categories.forEach((item) => {
        const li = document.createElement('li');
        catalogList.appendChild(li);
        li.textContent = item;
    });

    const allLi = catalogList.querySelectorAll('li');
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
            allLi.forEach((li) => {
                if (li.textContent === event.target.textContent ) {
                    li.classList.add('active'); 
                } else {
                    li.classList.remove('active');
                }
            });
            filterTitle.textContent = event.target.textContent;
        }
    });
}
