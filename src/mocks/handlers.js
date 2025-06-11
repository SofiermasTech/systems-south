import { http, HttpResponse } from 'msw';

let users = [];
let orders = [];
let carts = [];
let favorites = [];

try {
  users = JSON.parse(localStorage.getItem('users') || '[]');
  orders = JSON.parse(localStorage.getItem('orders') || '[]');
  carts = JSON.parse(localStorage.getItem('carts') || '[]');
  favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
} catch (error) {
  console.error('[MSW] Failed to parse localStorage:', error);
  users = [];
  orders = [];
  carts = [];
  favorites = [];
}

if (users.length === 0) {
  users = [
    {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      password: 'password123',
    },
  ];
  localStorage.setItem('users', JSON.stringify(users));
}

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return HttpResponse.json({ message: 'Неверный email или пароль' }, { status: 401 });
    }
    const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2);
    return HttpResponse.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  }),

  http.post('/api/register', async ({ request }) => {
    const { name, email, phone, password, checkbox } = await request.json();
    if (!name || !email || !phone || !password || !checkbox) {
      return HttpResponse.json({ message: 'Все поля обязательны' }, { status: 400 });
    }
    if (!/^\+?\d{10,}$/.test(phone)) {
      return HttpResponse.json(
        { message: 'Номер должен содержать минимум 10 цифр' },
        { status: 400 },
      );
    }
    if (users.find((u) => u.email === email)) {
      return HttpResponse.json(
        { message: 'Пользователь с таким email уже существует' },
        { status: 400 },
      );
    }
    const newUser = { id: users.length + 1, name, email, phone, password };
    users.push(newUser);
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('[MSW] Failed to save users to localStorage:', error);
      return HttpResponse.json({ message: 'Ошибка сохранения данных' }, { status: 500 });
    }
    const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2);
    return HttpResponse.json({
      token,
      user: { id: newUser.id, name, email },
    });
  }),

  http.get('/api/user', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token-')) {
      return HttpResponse.json({ message: 'Неверный или отсутствует токен' }, { status: 401 });
    }
    const user = users.find((u) => u.id === 1) || users[0];
    if (!user) {
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }
    return HttpResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }),

  http.get('/api/cart/:userId', ({ params }) => {
    const cart = carts.find((c) => String(c.userId) === String(params.userId)) || { userId: params.userId, items: [] };
    return HttpResponse.json(Array.isArray(cart.items) ? cart.items : [], { status: 200 });
  }),

  http.post('/api/cart/:userId', async ({ params, request }) => {
    const items = await request.json();
    if (!Array.isArray(items)) {
      return HttpResponse.json({ message: 'Items должен быть массивом' }, { status: 400 });
    }
    let cart = carts.find((c) => String(c.userId) === String(params.userId));
    if (cart) {
      cart.items = items;
    } else {
      cart = { userId: params.userId, items };
      carts.push(cart);
    }
    try {
      localStorage.setItem('carts', JSON.stringify(carts));
    } catch (error) {
      console.error('[MSW] Failed to save cart to localStorage:', error);
      return HttpResponse.json({ message: 'Ошибка сохранения корзины' }, { status: 500 });
    }
    return HttpResponse.json(cart.items, { status: 200 });
  }),

  http.get('/api/favorites/:userId', ({ params }) => {
    const favorite = favorites.find((f) => String(f.userId) === String(params.userId)) || { userId: params.userId, items: [] };
    return HttpResponse.json(Array.isArray(favorite.items) ? favorite.items : [], { status: 200 });
  }),

  http.post('/api/favorites/:userId', async ({ params, request }) => {
    const items = await request.json();
    if (!Array.isArray(items)) {
      return HttpResponse.json({ message: 'Items должен быть массивом' }, { status: 400 });
    }
    let favorite = favorites.find((f) => String(f.userId) === String(params.userId));
    if (favorite) {
      favorite.items = items;
    } else {
      favorite = { userId: params.userId, items };
      favorites.push(favorite);
    }
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('[MSW] Failed to save favorites to localStorage:', error);
      return HttpResponse.json({ message: 'Ошибка сохранения избранного' }, { status: 500 });
    }
    return HttpResponse.json(favorite.items, { status: 200 });
  }),

  http.post('/api/orders', async ({ request }) => {
    const order = await request.json();
    order.id = orders.length + 1;
    orders.push(order);
    try {
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
      console.error('[MSW] Failed to save order to localStorage:', error);
      return HttpResponse.json({ message: 'Ошибка сохранения заказа' }, { status: 500 });
    }
    return HttpResponse.json(order, { status: 201 });
  }),

  http.get('/api/orders', ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const userOrders = orders.filter((order) => String(order.userId) === String(userId));
    return HttpResponse.json(userOrders, { status: 200 });
  }),
];
