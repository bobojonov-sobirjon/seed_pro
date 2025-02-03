// import axios from 'axios';
// import { BASE_URL } from './urls/urls';

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

// Импортируем axios и базовый URL из внешнего файла конфигурации
import axios from 'axios';
import { BASE_URL } from './urls/urls';

// Создаем экземпляр axios с предустановленным базовым URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Добавляем интерсептор запросов
axiosInstance.interceptors.request.use(
  (config) => {
    // Устанавливаем 'Content-Type' для всех исходящих запросов
    config.headers['Content-Type'] = 'application/json';

    // Пытаемся получить токен из localStorage
    const token = localStorage.getItem('token'); // Или любой другой метод, который ты используешь для хранения токена

    // Если токен доступен, добавляем его в заголовки запроса
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Промис с ошибкой отклоняется, если возникла ошибка при отправке запроса
    return Promise.reject(error);
  }
);

// Добавляем интерсептор ответов
axiosInstance.interceptors.response.use(
  (response) => {
    // Возвращаем ответ без изменений, если не требуется дополнительная обработка
    return response;
  },
  (error) => {
    // Проверяем, связана ли ошибка с HTTP статусом 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Очищаем localStorage, удаляя, например, токен авторизации и другие пользовательские данные
      localStorage.clear();
      // Перенаправляем пользователя на страницу входа
      window.location.href = '/login'; // Убедись, что путь актуален для твоего приложения
    }

    // Возвращаем промис с ошибкой для дальнейшей обработки
    return Promise.reject(error);
  }
);

// Экспортируем настроенный экземпляр для использования в других частях приложения
export default axiosInstance;
