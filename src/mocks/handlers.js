import { http, HttpResponse } from 'msw'

// Инициализация данных из localStorage с проверкой
let users = []
let orders = []

try {
  users = JSON.parse(localStorage.getItem('users') || '[]')
  orders = JSON.parse(localStorage.getItem('orders') || '[]')
} catch (error) {
  console.error('[MSW] Failed to parse localStorage:', error)
  users = []
  orders = []
}

// Инициализация тестового пользователя
if (users.length === 0) {
  users = [
    {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      password: 'password123',
    },
  ]
  localStorage.setItem('users', JSON.stringify(users))
}

export const handlers = [
  // Вход
  http.post('/api/login', async ({ request }) => {
    console.log('[MSW] POST /api/login received')
    const { email, password } = await request.json()
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) {
      return HttpResponse.json({ message: 'Неверный email или пароль' }, { status: 401 })
    }
    const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2)
    return HttpResponse.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    })
  }),

  // Регистрация
  http.post('/api/register', async ({ request }) => {
    console.log('[MSW] POST /api/register received')
    const { name, email, phone, password, checkbox } = await request.json()
    if (!name || !email || !phone || !password || !checkbox) {
      return HttpResponse.json({ message: 'Все поля обязательны' }, { status: 400 })
    }
    if (!/^\+?\d{10,}$/.test(phone)) {
      return HttpResponse.json(
        { message: 'Номер должен содержать минимум 10 цифр' },
        { status: 400 },
      )
    }
    if (users.find((u) => u.email === email)) {
      return HttpResponse.json(
        { message: 'Пользователь с таким email уже существует' },
        { status: 400 },
      )
    }
    const newUser = { id: users.length + 1, name, email, phone, password }
    users.push(newUser)
    try {
      localStorage.setItem('users', JSON.stringify(users))
      console.log('[MSW] New user saved:', newUser)
    } catch (error) {
      console.error('[MSW] Failed to save users to localStorage:', error)
      return HttpResponse.json({ message: 'Ошибка сохранения данных' }, { status: 500 })
    }
    const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2)
    return HttpResponse.json({
      token,
      user: { id: newUser.id, name, email, phone },
    })
  }),

  // Получение данных пользователя
  http.get('/api/user', ({ request }) => {
    console.log('[MSW] GET /api/user received')
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token-')) {
      return HttpResponse.json({ message: 'Неверный или отсутствует токен' }, { status: 401 })
    }
    const user = users.find((u) => u.id === 1) || users[0]
    if (!user) {
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 })
    }
    return HttpResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  }),

  // Создание заказа
  http.post('/api/orders', async ({ request }) => {
    const order = await request.json()
    console.log('[MSW] POST /api/orders received:', order)
    order.id = orders.length + 1
    orders.push(order)
    try {
      localStorage.setItem('orders', JSON.stringify(orders))
      console.log('[MSW] Order saved:', order)
    } catch (error) {
      console.error('[MSW] Failed to save order to localStorage:', error)
      return HttpResponse.json({ message: 'Ошибка сохранения заказа' }, { status: 500 })
    }
    return HttpResponse.json(order, { status: 201 })
  }),

  // Получение заказов пользователя
  http.get('/api/orders', ({ request }) => {
    console.log('[MSW] GET /api/orders received')
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    console.log('[MSW] Requested userId:', userId)
    console.log('[MSW] Available orders:', orders)
    const userOrders = orders.filter((order) => String(order.userId) === String(userId))
    console.log('[MSW] Returning orders:', userOrders)
    return HttpResponse.json(userOrders, { status: 200 })
  }),
]
