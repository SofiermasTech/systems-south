<template>
  <form class="popup-form" @submit.prevent="submitForm" novalidate>
    <BaseInput
      v-for="field in fields"
      :key="field.name"
      :type="field.type"
      :placeholder="field.placeholder"
      :required="field.required"
      v-model="form[field.name]"
      :error="touched[field.name] ? errors[field.name] : ''"
      @input="field.type !== 'checkbox' ? handleInput(field.name, $event) : null"
      @change="field.type === 'checkbox' ? handleCheckboxChange(field.name, $event) : null"
      @blur="handleBlur(field.name)"
    >
      <template v-if="field.type === 'checkbox'" #label>
        <p>{{ field.label }}</p>
      </template>
    </BaseInput>
    <button
      class="popup-form__btn-submit base-button"
      type="submit"
      @submit.prevent
      :disabled="!isFormValid || isSubmitting"
      :aria-disabled="!isFormValid || isSubmitting"
    >
      {{ buttonText }}
    </button>
  </form>
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    fields: {
      type: Array,
      required: true,
    },
    buttonText: {
      type: String,
      default: 'Отправить',
    },
  },
  emits: ['close', 'submit-success'],
  data() {
    const form = {}
    const errors = {}
    const touched = {}

    this.fields.forEach((field) => {
      form[field.name] = field.type === 'checkbox' ? false : ''
      errors[field.name] = ''
      touched[field.name] = false
    })

    return {
      form,
      errors,
      touched,
      isSubmitting: false,
    }
  },
  computed: {
    isFormValid() {
      return this.fields.every((field) => {
        const validation = this.validateField(field)
        return validation.isValid
      })
    },
  },
  methods: {
    closePopup() {
      this.$emit('close')
      this.resetForm()
    },
    validateField(field) {
      const value = this.form[field.name]
      const formData = this.form

      // Специальная обработка для чекбоксов
      if (field.type === 'checkbox' && field.required) {
        if (!value) {
          return { isValid: false, message: `Поле ${field.placeholder || field.name} обязательно` }
        }
        return { isValid: true, message: '' }
      }

      // Общие проверки для других типов
      if (field.required && !value) {
        return { isValid: false, message: `Поле ${field.placeholder || field.name} обязательно` }
      }

      if (field.rules) {
        for (const rule of field.rules) {
          const isValid = rule.validator(value, formData)
          if (!isValid) {
            return { isValid: false, message: rule.message }
          }
        }
      }

      return { isValid: true, message: '' }
    },
    handleInput(fieldName, event) {
      this.touched[fieldName] = true
      this.form[fieldName] = event.target.value
      const field = this.fields.find((f) => f.name === fieldName)
      const validation = this.validateField(field)
      this.errors[fieldName] = validation.message
    },
    handleBlur(fieldName) {
      this.touched[fieldName] = true
      const field = this.fields.find((f) => f.name === fieldName)
      const validation = this.validateField(field)
      this.errors[fieldName] = validation.message
    },
    handleCheckboxChange(fieldName, event) {
      this.touched[fieldName] = true
      this.form[fieldName] = event.target.checked
      const field = this.fields.find((f) => f.name === fieldName)
      const validation = this.validateField(field)
      this.errors[fieldName] = validation.message
    },
    submitForm() {
      Object.keys(this.touched).forEach((key) => {
        this.touched[key] = true
      })

      Object.keys(this.errors).forEach((key) => {
        this.errors[key] = ''
      })

      if (!this.isFormValid) {
        this.fields.forEach((field) => {
          const validation = this.validateField(field)
          this.errors[field.name] = validation.message
        })
        return
      }

      console.log('Отправка данных:', this.form)
      this.isSubmitting = true
      this.$emit('submit-success', this.form)
      // console.log('Emitting submit-success:', this.form);
      // this.closePopup()
      this.isSubmitting = false
    },
    resetForm() {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = this.form[key] === true || this.form[key] === false ? false : ''
      })
      Object.keys(this.errors).forEach((key) => {
        this.errors[key] = ''
      })
      Object.keys(this.touched).forEach((key) => {
        this.touched[key] = false
      })
      this.isSubmitting = false
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.popup-form {
  display: flex;
  flex-direction: column;
  gap: 16px;

  @include tablet {
    gap: 12px;
  }

  &__btn-submit {
    margin-top: 12px;
    flex-grow: 1;
    width: 100%;

    &:disabled {
      background-color: var(--blue-100);
      color: var(--blue-300);
      cursor: not-allowed;
    }
  }
}
</style>
