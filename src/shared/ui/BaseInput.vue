<template>
  <label
    :class="[
      'base-input-label',
      { 'base-input-label--checkbox': type === 'checkbox' },
      { 'base-input-label--radio': type === 'radio' },
      { 'base-input-label--textarea': type === 'textarea' },
    ]"
  >
    <input
      v-if="
        type === 'text' ||
        type === 'email' ||
        type === 'tel' ||
        type === 'radio' ||
        type === 'password'
      "
      :class="['base-input', { 'base-input--radio': type === 'radio' }, { error: error }]"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      autocomplete
      ref="inputRef"
      :value="type === 'radio' ? value : modelValue"
      :checked="type === 'radio' && modelValue === value"
      :name="name"
      @change="type === 'radio' ? $emit('change', value) : null"
      @input="
        type === 'radio' ? $emit('update:modelValue', value) : handleInput($event.target.value)
      "
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <input
      v-if="type === 'checkbox'"
      class="base-input base-input--checkbox"
      type="checkbox"
      :required="required"
      :name="name"
      :checked="modelValue"
      @change="($emit('update:modelValue', $event.target.checked), $emit('change', $event))"
      :class="{ error: error }"
    />
    <textarea
      v-if="type === 'textarea'"
      class="base-input base-input--textarea"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="{ error: error }"
    ></textarea>
    <slot v-if="type === 'checkbox' || type === 'radio'" name="label"></slot>
    <span v-if="error" class="base-input__error">{{ error }}</span>
    <!-- Кнопка редактирования/сохранения -->
    <button
      v-if="
        (type === 'text' || type === 'email' || type === 'tel') &&
        isPersonalPage &&
        !isCallbackPopup
      "
      class="base-input__btn-edit"
      type="button"
      @click="handleAction"
    >
      <img
        :src="
          isFocused && isEdited && isEditing
            ? '/images/btn-edit-check.svg'
            : '/images/edit-icon.svg'
        "
        alt=""
      />
    </button>
  </label>
</template>
<script>
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'BaseInput',
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) =>
        ['text', 'email', 'tel', 'checkbox', 'radio', 'textarea', 'password'].includes(value),
    },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: true },
    error: { type: String, default: '' },
    name: { type: String, default: '' },
    modelValue: {
      type: [String, Boolean, Number],
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      isFocused: false,
      isEdited: false,
      isEditing: false,
      initialValue: String(this.modelValue ?? ''),
      popupStore: usePopupStore(),
    }
  },
  computed: {
    isPersonalPage() {
      return this.$route.path.startsWith('/personal/profile')
    },
    isCallbackPopup() {
      return this.popupStore.currentPopupName === 'ContactForm'
    },
  },
  watch: {
    modelValue(newValue) {
      this.isEdited = newValue !== this.initialValue
    },
  },
  methods: {
    handleInput(value) {
      this.$emit('update:modelValue', value)
      this.isEdited = String(value) !== String(this.initialValue)
      this.isEditing = true
    },
    handleAction() {
      if (!this.isEditing) {
        this.isEditing = true
        if (this.$refs.inputRef) {
          this.$refs.inputRef.focus()
        }
      } else if (this.isEdited) {
        this.$emit('save', this.modelValue)
        this.isEdited = false
        this.isEditing = false
        this.initialValue = String(this.modelValue)

        if (this.$refs.inputRef) {
          this.$refs.inputRef.blur()
        }
      }
    },
    handleFocus() {
      this.isFocused = true
    },

    handleBlur() {
      this.isFocused = false
    },
  },
}
</script>
<style lang="scss">
.base-input-label {
  width: 100%;
  position: relative;

  &--checkbox {
    display: flex;
    gap: 8px;
    align-items: center;
    position: relative;

    .base-input__error {
      bottom: -13px;
      left: 36px;
    }
  }

  &::after {
    content: '*';
    font-size: 14px;
    color: var(--blue);
    position: absolute;
    top: 8px;
    right: 20px;
  }

  &.base-input-label--checkbox::after,
  &.base-input-label--radio::after,
  &.base-input-label--textarea::after {
    content: '';
  }

  p {
    margin: 0;
    font-size: 12px;
    color: var(--grey-200);
  }
}

.base-input {
  width: 100%;
  padding: 15px 16px;
  border-radius: 500px;
  background-color: var(--blue-0);
  border: 1px solid transparent;
  font-size: 14px;
  color: var(--black);

  &--checkbox {
    width: 20px;
    height: 20px;
  }

  &--radio {
    grid-row: span 2;
    margin: 0;
    align-self: flex-start;
    width: 24px;
    height: 24px;
  }

  &--textarea {
    border-radius: 16px;
    border: none;
    resize: none;
    height: 180px;
    color: var(--blue-300);
  }

  &::placeholder {
    font-size: 14px;
    color: var(--blue-300);
  }

  &.error {
    border-color: var(--red);
  }

  &__error {
    position: absolute;
    bottom: -13px;
    left: 16px;
    color: var(--red);
    font-size: 9px;
  }

  &__btn-edit {
    width: 40px;
    height: 40px;
    background-color: var(--blue);
    border: none;
    border-radius: 50%;
    position: absolute;
    top: 4px;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    img {
      width: 15px;
      height: 15px;
      object-fit: contain;
    }
  }
}
</style>
