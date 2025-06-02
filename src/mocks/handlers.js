import { rest } from 'msw';

// Простое хранилище для имитации базы данных пользователей
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
  // Получение данных пользователя
  rest.get('/api/user', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token-')) {
      return res(
        ctx.status(401),
        ctx.json({ message: 'Неверный или отсутствующий токен' })
      );
    }
    const user = users[0]; // Возвращаем первого пользователя
    if (!user) {
      return res(ctx.status(404), ctx.json({ message: 'Пользователь не найден' }));
    }
    return res(ctx.status(200), ctx.json({ name: user.name, email: user.email }));
  }),

  // Регистрация
  rest.post('/api/register', async (req, res, ctx) => {
    const { name, email, phone, password, checkbox } = await req.json();
    if (!name || !email || !phone || !password || !checkbox) {
      return res(ctx.status(400), ctx.json({ message: 'Все поля обязательны' }));
    }
    if (!/^\+?\d{10,}$/.test(phone)) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Номер должен содержать минимум 10 цифр' })
      );
    }
    if (users.find((user) => user.email === email)) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Пользователь с таким email уже существует' })
      );
    }
    const newUser = { id: users.length + 1, name, email, phone, password };
    users.push(newUser); // Добавляем пользователя в "базу"
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-jwt-token-' + Math.random().toString(36).substr(2),
        user: { name, email, phone },
      })
    );
  }),

  // Вход
  rest.post('/api/login', async (req, res, ctx) => {
    const { email, password } = await req.json();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return res(ctx.status(401), ctx.json({ message: 'Неверный email или пароль' }));
    }
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-jwt-token-' + Math.random().toString(36).substr(2),
        user: { name: user.name, email: user.email },
      })
    );
  }),
];
