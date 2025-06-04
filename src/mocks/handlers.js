import { http, HttpResponse } from 'msw';

// Имитация базы данных пользователей
let users = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    password: 'password123',
  },
];

export const handlers = [
  // Вход
  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return HttpResponse.json(
        { message: 'Неверный email или пароль' },
        { status: 401 }
      );
    }
    return HttpResponse.json({
      token: 'mock-jwt-token-' + Math.random().toString(36).substr(2),
      user: { name: user.name, email: user.email },
    });
  }),

  // Регистрация
  http.post('/api/register', async ({ request }) => {
    const { name, email, phone, password, checkbox } = await request.json();
    if (!name || !email || !phone || !password || !checkbox) {
      return HttpResponse.json(
        { message: 'Все поля обязательны' },
        { status: 400 }
      );
    }
    if (!/^\+?\d{10,}$/.test(phone)) {
      return HttpResponse.json(
        { message: 'Номер должен содержать минимум 10 цифр' },
        { status: 400 }
      );
    }
    if (users.find((user) => user.email === email)) {
      return HttpResponse.json(
        { message: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }
    const newUser = { id: users.length + 1, name, email, phone, password };
    users.push(newUser);
    return HttpResponse.json({
      token: 'mock-jwt-token-' + Math.random().toString(36).substr(2),
      user: { name, email, phone },
    });
  }),

  // Получение данных пользователя
  http.get('/api/user', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token-')) {
      return HttpResponse.json(
        { message: 'Неверный или отсутствующий токен' },
        { status: 401 }
      );
    }
    const user = users[0]; // Возвращаем первого пользователя
    if (!user) {
      return HttpResponse.json(
        { message: 'Пользователь не найден' },
        { status: 404 }
      );
    }
    return HttpResponse.json({
      name: user.name,
      email: user.email,
    });
  }),
];
