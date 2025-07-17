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
      firstName: 'User',
      lastName: 'Test',
      email: 'test@example.com',
      phone: '+1234567890',
      password: 'Password123',
    },
  ]
  localStorage.setItem('users', JSON.stringify(users))
}

export const handlers = [
  // Пропускаем GET /
  http.get('/', () => {
    return HttpResponse.json({}, { status: 200 })
  }),

  http.post('/api/token', async ({ request }) => {
    console.log('[MSW] POST /api/token received')
    const { email, password } = await request.json()
    console.log('[MSW] Request body:', { email, password })
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) {
      console.error('[MSW] Invalid credentials:', { email, password })
      return HttpResponse.json({ message: 'Неверный email или пароль' }, { status: 401 })
    }
    const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2)
    const refreshToken = 'mock-refresh-token-' + Math.random().toString(36).substr(2)
    localStorage.setItem('authToken', token)
    localStorage.setItem('refreshToken', refreshToken)
    const response = {
      token,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    }
    console.log('[MSW] Returning response:', response)
    return HttpResponse.json(response)
  }),

  http.post('/api/register', async ({ request }) => {
    console.log('[MSW] POST /api/register received')
    const { firstName, lastName, email, phone, password } = await request.json()
    console.log('[MSW] Request body:', { firstName, lastName, email, phone, password })
    if (!firstName || !lastName || !email || !phone || !password) {
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
    const newUser = { id: users.length + 1, firstName, lastName, email, phone, password }
    users.push(newUser)
    try {
      localStorage.setItem('users', JSON.stringify(users))
      console.log('[MSW] Users saved to localStorage:', users)
    } catch (error) {
      console.error('[MSW] Failed to save users to localStorage:', error)
      return HttpResponse.json({ message: 'Ошибка сохранения данных' }, { status: 500 })
    }
    const token = 'mock-jwt-token-' + Math.random().toString(36).substr(2)
    const refreshToken = 'mock-refresh-token-' + Math.random().toString(36).substr(2)
    localStorage.setItem('authToken', token)
    localStorage.setItem('refreshToken', refreshToken)
    const response = {
      token,
      refresh_token: refreshToken,
      user: { id: newUser.id, firstName, lastName, email, phone },
    }
    console.log('[MSW] Returning response:', response)
    return HttpResponse.json(response)
  }),

  http.get('/api/client', ({ request }) => {
    console.log('[MSW] GET /api/client received')
    console.log('[MSW] Authorization header:', request.headers.get('Authorization'))
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[MSW] Missing or invalid Authorization header')
      return HttpResponse.json({ message: 'Неверный или отсутствует токен' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const storedToken = localStorage.getItem('authToken')
    if (token !== storedToken) {
      console.error('[MSW] Invalid token:', token)
      return HttpResponse.json({ message: 'Недействительный токен' }, { status: 401 })
    }
    const user = users[users.length - 1]
    if (!user) {
      console.error('[MSW] No users found')
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 })
    }
    console.log('[MSW] Returning user:', user)
    return HttpResponse.json(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
      { status: 200 },
    )
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

  http.patch('/api/client', async ({ request }) => {
    console.log('[MSW] PATCH /api/client received')
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Неверный или отсутствует токен' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const storedToken = localStorage.getItem('authToken')
    if (token !== storedToken) {
      return HttpResponse.json({ message: 'Недействительный токен' }, { status: 401 })
    }
    const data = await request.json()
    const userIndex = users.findIndex((u) => u.id === 1 || users[users.length - 1].id)
    if (userIndex === -1) {
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 })
    }
    users[userIndex] = {
      ...users[userIndex],
      firstName: data.firstName !== undefined ? data.firstName : users[userIndex].firstName,
      lastName: data.lastName !== undefined ? data.lastName : users[userIndex].lastName,
      email: data.email !== undefined ? data.email : users[userIndex].email,
      phone: data.phone !== undefined ? data.phone : users[userIndex].phone,
    }
    try {
      localStorage.setItem('users', JSON.stringify(users))
    } catch (error) {
      console.error('[MSW] Ошибка при сохранении в localStorage:', error)
      return HttpResponse.json({ message: 'Ошибка сохранения данных' }, { status: 500 })
    }
    return HttpResponse.json({
      id: users[userIndex].id,
      firstName: users[userIndex].firstName,
      lastName: users[userIndex].lastName,
      email: users[userIndex].email,
      phone: users[userIndex].phone,
    })
  }),

  http.patch('/api/client/change-password', async ({ request }) => {
    console.log('[MSW] PATCH /api/client/change-password received')
    const authHeader = request.headers.get('Authorization')
    console.log('[MSW] Authorization header:', authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[MSW] Missing or invalid Authorization header')
      return HttpResponse.json({ message: 'Неверный или отсутствует токен' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const storedToken = localStorage.getItem('authToken')
    if (token !== storedToken) {
      console.error('[MSW] Invalid token:', token)
      return HttpResponse.json({ message: 'Недействительный токен' }, { status: 401 })
    }
    const { oldPassword, newPassword } = await request.json()
    console.log('[MSW] Password change data:', { oldPassword, newPassword })
    const user = users[users.length - 1] // Предполагаем, что обновляем последнего пользователя
    if (!user) {
      console.error('[MSW] No users found')
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 })
    }
    if (user.password !== oldPassword) {
      console.error('[MSW] Incorrect old password:', oldPassword)
      return HttpResponse.json({ message: 'Неверный текущий пароль' }, { status: 401 })
    }
    if (newPassword.length < 8) {
      console.error('[MSW] New password too short:', newPassword)
      return HttpResponse.json(
        { message: 'Новый пароль должен содержать минимум 8 символов' },
        { status: 400 },
      )
    }
    user.password = newPassword
    users[users.length - 1] = user
    try {
      localStorage.setItem('users', JSON.stringify(users))
      console.log('[MSW] Users updated in localStorage:', users)
    } catch (error) {
      console.error('[MSW] Failed to save users to localStorage:', error)
      return HttpResponse.json({ message: 'Ошибка сохранения данных' }, { status: 500 })
    }
    console.log('[MSW] Password updated successfully for user:', user)
    return HttpResponse.json({ message: 'Пароль успешно изменен' }, { status: 200 })
  }),

  http.post('/api/client/send-confirmation-link', async ({ request }) => {
    console.log('[MSW] POST /api/client/send-confirmation-link received')
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Неверный или отсутствует токен' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const storedToken = localStorage.getItem('authToken')
    if (token !== storedToken) {
      return HttpResponse.json({ message: 'Недействительный токен' }, { status: 401 })
    }
    const { newEmail } = await request.json()
    // Эмулируем отправку ссылки
    const uuid = `mock-uuid-${Math.random().toString(36).substr(2)}`
    return HttpResponse.json({ uuid }, { status: 200 })
  }),
  http.post('/api/client/email-confirmation', async ({ request }) => {
    console.log('[MSW] POST /api/client/email-confirmation received')
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Неверный или отсутствует токен' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    const storedToken = localStorage.getItem('authToken')
    if (token !== storedToken) {
      return HttpResponse.json({ message: 'Недействительный токен' }, { status: 401 })
    }
    const { uuid } = await request.json()
    const userIndex = users.findIndex((u) => u.id === 1 || users[users.length - 1].id)
    if (userIndex === -1) {
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 })
    }
    // Эмулируем подтверждение email
    return HttpResponse.json({}, { status: 200 })
  }),
  http.post('/api/client/restore-password', async ({ request }) => {
    console.log('[MSW] POST /api/client/restore-password received')
    const { email } = await request.json()
    const user = users.find((u) => u.email === email)
    if (!user) {
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 })
    }
    const uuid = `mock-uuid-${Math.random().toString(36).substr(2)}`
    return HttpResponse.json({ uuid }, { status: 200 })
  }),
  http.patch('/api/client/set-new-password', async ({ request }) => {
    console.log('[MSW] PATCH /api/client/set-new-password received')
    const { uuid, password } = await request.json()
    const userIndex = users.findIndex((u) => u.id === 1 || users[users.length - 1].id)
    if (userIndex === -1) {
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 })
    }
    users[userIndex].password = password
    try {
      localStorage.setItem('users', JSON.stringify(users))
    } catch (error) {
      console.error('[MSW] Ошибка при сохранении в localStorage:', error)
      return HttpResponse.json({ message: 'Ошибка сохранения данных' }, { status: 500 })
    }
    return HttpResponse.json({}, { status: 200 })
  }),
  http.post('/token/refresh', async ({ request }) => {
    console.log('[MSW] POST /token/refresh received')
    const { refresh_token } = await request.json()
    const storedToken = localStorage.getItem('refreshToken')
    if (refresh_token !== storedToken) {
      return HttpResponse.json({ message: 'Недействительный refresh_token' }, { status: 401 })
    }
    const newToken = 'mock-jwt-token-' + Math.random().toString(36).substr(2)
    const newRefreshToken = 'mock-refresh-token-' + Math.random().toString(36).substr(2)
    localStorage.setItem('authToken', newToken)
    localStorage.setItem('refreshToken', newRefreshToken)
    return HttpResponse.json({
      token: newToken,
      refresh_token: newRefreshToken,
    })
  }),
]
