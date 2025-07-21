import axios from 'axios';

import '../common.css';

/**
 * https://thecatapi.com/
 *
 * 1) Створити сторінку яка при завантаженні робить запит на бекенд і оримує
 *  всі доступні breeds. https://api.thecatapi.com/v1/breeds
 *
 * 2) В інтерфейсі є форма пошуку з прив'язаним datalist з завантаженими breeds.
 *
 * 3) Користувач в формі вводить або обирає необхідний breed і при сабміті форми
 *  виконується GET запит за зображенням.
 *
 * 4) Після запиту під формою відображається картка з зображенням.
 *
 * 5) Під час запиту під формую відображається loader
 */

const form = document.querySelector('#search-form'); //*  отримуємо форму
//*  отримуємо елементи для вводу породи, списку порід,
const breedInput = document.querySelector('#breed-input'); //*  отримуємо елемент для відображення списку порід
const breedsList = document.querySelector('#breeds-list'); //*  отримуємо елемент для відображення списку порід
const loader = document.querySelector('#loader'); // * отримуємо елемент для відображення лоадера
const catCard = document.querySelector('#cat-card'); // * отримуємо елемент для відображення картки з котом

form.addEventListener('submit', handleSubmit); // * додаємо обробник події на сабміт форми

fetchBreeds(); // * викликаємо функцію для отримання порід котів

//*   Створюємо функція для отримання порід котів*/
function fetchBreeds() {
  axios('https://api.thecatapi.com/v1/breeds') //*  робимо GET запит на бекенд для отримання порід котів
    .then((res) => {
      breedsList.insertAdjacentHTML('beforeend', populateDatalist(res.data)); //*  заповнюємо список порід котів, який буде відображатися в datalist
    })
    .catch((error) => {
      console.log(error);
    });
}
// * Функція для заповнення datalist елементів порід котів */
function populateDatalist(arr) {
  return arr //* перетворюємо масив об'єктів порід котів в HTML рядки
    .map(
      //*
      ({ id, name }) => `
        <option value="${name}" data-id="${id}"></option>
    ` // * для кожного об'єкта породи кота створюємо HTML рядок з тегом option, який містить значення породи та її id */
    )
    .join(''); // * об'єднуємо всі HTML рядки в один рядок */
}

// * Функція для обробки сабміту форми */
function handleSubmit(event) {
  event.preventDefault(); // * запобігаємо перезавантаженню сторінки при сабміті форми

  const myBreed = breedInput.value; // * отримуємо значення введене користувачем в полі вводу породи кота
  const selectedBreed = Array.from(breedsList.options).find(
    (item) => item.value.toLowerCase() === myBreed.toLowerCase() // * знаходимо об'єкт породи кота в списку порід, який відповідає введеному значенню користувача */
  );
  //* перевіряємо, чи знайдено об'єкт породи кота в списку порід
  if (!selectedBreed) {
    alert('Оберіть існуючу породу');
    return;
  }

  const breedId = selectedBreed.dataset.id;
  loader.classList.remove('hidden'); //* показуємо лоадер, коли починаємо завантаження зображення кота

  axios(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`) // * робимо GET запит на бекенд для отримання зображення кота за його id */
    .then((res) => {
      if (res.data.length > 0) {
        const catImg = res.data[0].url; // * отримуємо URL зображення кота з відповіді бекенду
        //** заповнюємо картку з котом HTML рядком, який містить зображення та назву породи кота */
        catCard.innerHTML = `
                    <div class="card">
                        <img src="${catImg}" alt="${myBreed}" class="card-image"/>
                        <div class="card-body">
                            <h2 class="card-title">${myBreed}</h2>
                        </div>
                    </div>
                `; //*
      } else {
        catCard.innerHTML = `<p class="error-text">Зображення не знайдено</p>`; // * якщо зображення не знайдено, відображаємо повідомлення про помилку
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loader.classList.add('hidden'); //* приховуємо лоадер після завершення запиту, незалежно від його результату
    });
}
