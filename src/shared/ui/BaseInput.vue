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
      v-if="type === 'text' || type === 'email' || type === 'tel' || type === 'radio' || type === 'password'"
      :class="['base-input', { 'base-input--radio': type === 'radio' }, { error: error }]"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :value="type === 'radio' ? value : modelValue"
      :checked="type === 'radio' && modelValue === value"
      :name="name"
      @input="type === 'radio' ? $emit('update:modelValue', value) : $emit('update:modelValue', $event.target.value)"
      @change="type === 'radio' ? $emit('change', value) : null"
    />
    <input
      v-if="type === 'checkbox'"
      class="base-input base-input--checkbox"
      type="checkbox"
      :required="required"
      :name="name"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked); $emit('change', $event.target.checked)"
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
    />
    <slot v-if="type === 'checkbox' || type === 'radio'" name="label"></slot>
    <span v-if="error" class="base-input__error">{{ error }}</span>
  </label>
</template>
<script>
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
    bottom: -16px;
    left: 36px;
    color: var(--red);
    font-size: 10px;
  }
}
</style>
