// Работа с checkbox фильтров
export default function toogleCheckbox() {
    console.log('toggleCheckbox');
    const checkboxs = document.querySelectorAll('.filter-check_checkbox');
    checkboxs.forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}