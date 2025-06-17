import { http, HttpResponse } from 'msw'

let users = []
let orders = []
let carts = []
let favorites = []

try {
  users = JSON.parse(localStorage.getItem('users') || '[]')
  orders = JSON.parse(localStorage.getItem('orders') || '[]')
  carts = JSON.parse(localStorage.getItem('carts') || '[]')
  favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
} catch (error) {
  console.error('[MSW] Failed to parse localStorage:', error)
  users = []
  orders = []
  carts = []
  favorites = []
}

if (users.length === 0) {
  users = [
    {
      id: 1,
      name: 'User',
      surname: 'Test',
      email: 'test@example.com',
      phone: '+1234567890',
      password: 'password123',
    },
  ]
  localStorage.setItem('users', JSON.stringify(users))
}

export const handlers = [
  // Пропускаем GET /
  http.get('/', () => {
    return HttpResponse.json({}, { status: 200 })
  }),

  http.post('/api/login', async ({ request }) => {
    console.log('[MSW] POST /api/login received')
    const { email, password } = await request.json()
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) {
      return HttpResponse.json({ message: 'Неверный email или пароль' }, { status: 401 })
    }
    const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2)
    localStorage.setItem('authToken', token)
    return HttpResponse.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    })
  }),

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
    } catch (error) {
      console.error('[MSW] Failed to save users to localStorage:', error)
      return HttpResponse.json({ message: 'Ошибка сохранения данных' }, { status: 500 })
    }
    const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2)
    localStorage.setItem('authToken', token)
    return HttpResponse.json({
      token,
      user: { id: newUser.id, name, email },
    })
  }),

  http.get('/api/user', ({ request }) => {
    console.log('[MSW] GET /api/user received')
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Неверный или отсутствует токен' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const storedToken = localStorage.getItem('authToken')
    console.log('[MSW] Comparing tokens:', { requestToken: token, storedToken })
    if (token !== storedToken) {
      return HttpResponse.json({ message: 'Недействительный токен' }, { status: 401 })
    }
    const user = users.find((u) => u.id === 1) || users[users.length - 1]
    if (!user) {
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 })
    }
    return HttpResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  }),

  http.get('/api/cart/:userId', ({ params }) => {
    console.log('[MSW] GET /api/cart/:userId:', params.userId)
    const cart = carts.find((c) => String(c.userId) === String(params.userId)) || {
      userId: params.userId,
      items: [],
    }
    return HttpResponse.json(Array.isArray(cart.items) ? cart.items : [], { status: 200 })
  }),

  http.post('/api/cart/:userId', async ({ params, request }) => {
    console.log('[MSW] POST /api/cart/:userId:', params.userId)
    const items = await request.json()
    if (!Array.isArray(items)) {
      return HttpResponse.json({ message: 'Items должен быть массивом' }, { status: 400 })
    }
    let cart = carts.find((c) => String(c.userId) === String(params.userId))
    if (cart) {
      cart.items = items
    } else {
      cart = { userId: params.userId, items }
      carts.push(cart)
    }
    try {
      localStorage.setItem('carts', JSON.stringify(carts))
    } catch (error) {
      console.error('[MSW] Failed to save cart to localStorage:', error)
      return HttpResponse.json({ message: 'Ошибка сохранения корзины' }, { status: 500 })
    }
    return HttpResponse.json(cart.items, { status: 200 })
  }),

  http.get('/api/favorites/:userId', ({ params }) => {
    console.log('[MSW] GET /api/favorites/:userId:', params.userId)
    const favorite = favorites.find((f) => String(f.userId) === String(params.userId)) || {
      userId: params.userId,
      items: [],
    }
    return HttpResponse.json(Array.isArray(favorite.items) ? favorite.items : [], { status: 200 })
  }),

  http.post('/api/favorites/:userId', async ({ params, request }) => {
    console.log('[MSW] POST /api/favorites/:userId:', params.userId)
    const items = await request.json()
    if (!Array.isArray(items)) {
      return HttpResponse.json({ message: 'Items должен быть массивом' }, { status: 400 })
    }
    let favorite = favorites.find((f) => String(f.userId) === String(params.userId))
    if (favorite) {
      favorite.items = items
    } else {
      favorite = { userId: params.userId, items }
      favorites.push(favorite)
    }
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    } catch (error) {
      console.error('[MSW] Failed to save favorites to localStorage:', error)
      return HttpResponse.json({ message: 'Ошибка сохранения избранного' }, { status: 500 })
    }
    return HttpResponse.json(favorite.items, { status: 200 })
  }),

  http.post('/api/orders', async ({ request }) => {
    console.log('[MSW] POST /api/orders received')
    const order = await request.json()
    order.id = orders.length + 1
    orders.push(order)
    try {
      localStorage.setItem('orders', JSON.stringify(orders))
    } catch (error) {
      console.error('[MSW] Failed to save order to localStorage:', error)
      return HttpResponse.json({ message: 'Ошибка сохранения заказа' }, { status: 500 })
    }
    return HttpResponse.json(order, { status: 201 })
  }),

  http.get('/api/orders', ({ request }) => {
    console.log('[MSW] GET /api/orders received')
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')
    const userOrders = orders.filter((order) => String(order.userId) === String(userId))
    return HttpResponse.json(userOrders, { status: 200 })
  }),

  http.get('/api/users', ({ request }) => {
    console.log('[MSW] GET /api/users received')
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Неверный или отсутствует токен' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const storedToken = localStorage.getItem('authToken')
    if (token !== storedToken) {
      return HttpResponse.json({ message: 'Недействительный токен' }, { status: 401 })
    }
    return HttpResponse.json(users, { status: 200 })
  }),

  http.put('/api/users/:id', async ({ params, request }) => {
    console.log('Получен PUT запрос для пользователя ID:', params.id)
    console.log('Заголовки запроса:', request.headers)
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Ошибка: Отсутствует заголовок Authorization')
      return HttpResponse.json({ message: 'Неверный или отсутствует токен' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const storedToken = localStorage.getItem('authToken')
    console.log('Сравнение токенов:', { requestToken: token, storedToken })
    if (token !== storedToken) {
      console.log('Ошибка: Токены не совпадают')
      return HttpResponse.json({ message: 'Недействительный токен' }, { status: 401 })
    }

    const data = await request.json()
    console.log('Полученные данные для обновления:', data)
    const userIndex = users.findIndex((u) => String(u.id) === String(params.id))
    if (userIndex === -1) {
      console.log('Ошибка: Пользователь не найден, ID: ', params.id)
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 })
    }

    users[userIndex] = {
      ...users[userIndex],
      ...data,
    }
    console.log('Обновленный пользователь:', users[userIndex])

    try {
      localStorage.setItem('users', JSON.stringify(users))
      console.log('Данные успешно сохранены в localStorage:', users)
    } catch (error) {
      console.error('[MSW] Ошибка при сохранении в localStorage:', error)
      return HttpResponse.json({ message: 'Ошибка сохранения данных' }, { status: 500 })
    }

    return HttpResponse.json(users[userIndex], { status: 200 })
  }),

  http.put('/api/users/:id/password', async ({ params, request }) => {
    console.log('[MSW] PUT /api/users/:id/password received, ID:', params.id)

    // Проверка авторизации
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('[MSW] Ошибка: Отсутствует заголовок Authorization')
      return HttpResponse.json({ message: 'Неверный или отсутствует токен' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const storedToken = localStorage.getItem('authToken')
    console.log('[MSW] Сравнение токенов:', { requestToken: token, storedToken })
    if (token !== storedToken) {
      console.log('[MSW] Ошибка: Токены не совпадают')
      return HttpResponse.json({ message: 'Недействительный токен' }, { status: 401 })
    }

    // Получаем данные из тела запроса
    const { currentPassword, newPassword } = await request.json()
    console.log('[MSW] Данные запроса:', { currentPassword, newPassword })

    // Находим пользователя
    const userIndex = users.findIndex((u) => String(u.id) === String(params.id))
    if (userIndex === -1) {
      console.log('[MSW] Ошибка: Пользователь не найден, ID:', params.id)
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 })
    }

    // Проверяем текущий пароль
    if (users[userIndex].password !== currentPassword) {
      console.log('[MSW] Ошибка: Неверный текущий пароль')
      return HttpResponse.json({ message: 'Неверный текущий пароль' }, { status: 401 })
    }

    // Обновляем пароль
    users[userIndex].password = newPassword
    console.log('[MSW] Пароль обновлён для пользователя:', users[userIndex])

    // Сохраняем в localStorage
    try {
      localStorage.setItem('users', JSON.stringify(users))
      console.log('[MSW] Данные успешно сохранены в localStorage:', users)
    } catch (error) {
      console.error('[MSW] Ошибка при сохранении в localStorage:', error)
      return HttpResponse.json({ message: 'Ошибка сохранения данных' }, { status: 500 })
    }

    // Возвращаем обновлённые данные
    return HttpResponse.json({ id: users[userIndex].id, password: newPassword }, { status: 200 })
  }),
]
