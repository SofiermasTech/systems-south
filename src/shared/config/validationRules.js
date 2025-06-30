import { defineRule } from 'vee-validate'
// import { required, email, min } from '@vee-validate/rules'

// Общие правила
defineRule('required', value => {
  if (!value || !value.length) {
    return '{_field_} обязательно'
  }
  return true
})

defineRule('email', value => {
  if (!value || !value.length) {
    return true // Пропускаем, если поле пустое и не required
  }
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(value)) {
    return 'Некорректный email'
  }
  return true
})

defineRule('min', (value, [length]) => {
  if (!value || !value.length) {
    return true // Пропускаем, если поле пустое и не required
  }
  if (value.length < length) {
    return `Минимальная длина {length} символов`
  }
  return true
})

// Кастомное правило для телефона
defineRule('phone', value => {
  if (!value || !value.length) {
    return true // Пропускаем, если поле пустое и не required
  }
  if (!/^\+?\d{10,}$/.test(value)) {
    return 'Номер должен содержать минимум 10 цифр'
  }
  return true
})

// Кастомное правило для подтверждения пароля
defineRule('passwordMatch', (value, [password]) => {
  if (!value || !value.length) {
    return true // Пропускаем, если поле пустое и не required
  }
  if (value !== password) {
    return 'Пароли не совпадают'
  }
  return true
})
