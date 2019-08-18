// получене даанных с сервера
export default function getData() {
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