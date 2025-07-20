import axios from 'axios';
import '../common.css';

//* Додаємо та використовуємо бібліотеку https://axios-http.com/
//* Робимо рефрактинг
//* - Імпорт
//* - Запит
//*  - Метод axios.get()
//* - Обробка відповіді та помилки

const url = `https://jsonplaceholder.typicode.com/todos/`;

const list = document.querySelector('.todo-list');

// fetch(url)
//   .then((res) => {
//     if (!res.ok) {
//       throw new Error(res.statusText);
//     }
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//     list.insertAdjacentHTML('beforeend', createMarkup(data));
//   })
//   .catch((err) => {
//     console.error('Error fetching data:', err);
//   });

function createMarkup(arr) {
  return arr
    .map(
      ({ title, completed }) => `;
        <li class="list-item">
          <input type="checkbox" ${completed ? 'checked' : ''} />
          <p>${title}</p>
        </li>
      `
    )
    .join('');
}

// axios('https://jsonplaceholder.typicode.com/todos/')
//   .then((res) => {
//     console.log(res.data); //* Які переваги методу axios:  не потрібно перетворювати відповідь в json, це робить axios сам і обробляти в додатковому then
//     list.insertAdjacentHTML('beforeend', createMarkup(res.data));
//   })
//   .catch((error) => {
//     console.log(error.message); //* Обробка помилки axios робиться в catch, якщо помилка буде в запиті
//   });

// axios
//   .get('https://jsonplaceholder.typicode.com/todos/')
//   .then((res) => {
//     console.log(res.data);
//     list.insertAdjacentHTML('beforeend', createMarkup(res.data));
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

//* В середині функції запит, зовні обробка
const fetchData = (endpoint = 'todos') => {
  const url = `https://jsonplaceholder.typicode.com/${endpoint}`;
  return axios.get(url); // Використовуємо метод get явно
};

fetchData()
  .then((response) => {
    console.log('Отримані дані:', response.data);
    list.insertAdjacentHTML('beforeend', createMarkup(response.data));
  })
  .catch((error) => {
    console.error('Помилка при отриманні даних:', error.message);
  });

fetchData('users')
  .then((res) => {
    console.log('Отримані користувачі:', res.data);
    // Тут можна обробити дані користувачів, якщо потрібно
  })
  .catch((error) => {
    console.error('Помилка при отриманні користувачів:', error.message);
  });
