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
      :type="inputType"
      :required="required"
      :placeholder="placeholder"
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
    <button
      v-if="type === 'password'"
      class="base-input__btn-pass"
      type="button"
      @click="showPassword"
    >
      <BaseIcon :name="passwordIcon" />
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
      isPasswordVisible: false,
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
    passwordIcon() {
      return this.isPasswordVisible ? 'HidePasswordIcon' : 'ShowPasswordIcon'
    },
    inputType() {
      return this.type === 'password' && this.isPasswordVisible ? 'text' : this.type
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
    showPassword() {
      this.isPasswordVisible = !this.isPasswordVisible
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/utils.scss';

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
    top: 6px;
    right: 16px;

    @include tablet {
      font-size: 12px;
      right: 12px;
    }
  }

  &.base-input-label--checkbox::after,
  &.base-input-label--radio::after,
  &.base-input-label--textarea::after {
    content: '';
  }

  p {
    margin: 0;
    @include fluid-text(16, 12);
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

  @include tablet {
    font-size: 12px;
    padding-block: 12px;
  }

  @include tablet-bottom {
    font-size: 10px;
    padding-block: 10px;
  }

  &--checkbox {
    width: 20px;
    height: 20px;

    @include tablet {
      width: 16px;
      height: 16px;
    }
  }

  &--radio {
    grid-row: span 2;
    margin: 0;
    align-self: flex-start;
    width: 24px;
    height: 24px;

    @include tablet {
      width: 20px;
      height: 20px;
    }
  }

  &--textarea {
    border-radius: var(--br-block);
    border: none;
    resize: none;
    height: clamp(90px, 9vw, 180px);
    color: var(--blue-300);
  }

  &::placeholder {
    font-size: 14px;
    color: var(--blue-300);

    @include tablet {
      font-size: 10px;
    }
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

    @include tablet {
      font-size: 7px;
      bottom: -10px;
    }
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

    @include laptop-bottom {
      width: 32px;
      height: 32px;
    }

    @include tablet-bottom {
      width: 24px;
      height: 24px;
    }

    img {
      width: 15px;
      height: 15px;
      object-fit: contain;

      @include laptop-bottom {
        width: 12px;
        height: 12px;
      }

      @include tablet-bottom {
        width: 10px;
        height: 10px;
      }
    }
  }

  &__btn-pass {
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    position: absolute;
    right: 28px;
    top: 50%;
    transform: translateY(-50%);

    @include desktop {
      right: 24px;
    }

    svg {
      color: var(--blue);

      @include desktop {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
