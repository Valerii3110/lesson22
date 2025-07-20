import axios from 'axios';
import '../common.css';

//* Робимо рефракторинг авторизації запитів з клюами
//*
//* Як у Axios передавати search params та headers
//*
//*  Для прикладу використаємо https://pixabay.com/api/docs/

const API_KEY = '43173775-fc7269b10cca3a5d436001063';

// const params = new URLSearchParams({
//   key: API_KEY,
//   q: 'cat',
// });

// console.log(params.toString()); // key=43173775-fc7269b10cca3a5d436001063&q=cat

// const list = document.querySelector('.list');
// axios(`https://pixabay.com/api/`, {
//   params: {//* передаємо search params
//     key: API_KEY,
//     q: 'cat',
//   },
// })
//   .then((res) => {
//     console.log(res);
//     list.insertAdjacentHTML('beforeend', createMarkup(res.data.hits));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ previewURL, tags, likes }) => `
//         <li>
//             <img src="${previewURL}" alt="${tags}" width="300" />
//             <p>${likes}</p>
//          </li>

//     `
//     )
//     .join('');
// }

//* можна задавати  дефолтні значення для  axios
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/todos/';

// axios()
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: { Authorization: 'Bearer lalala' },
});

instance('todos', {
  params: {
    _limit: 5, //* передаємо search params
  },
})
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });

instance('users')
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });
