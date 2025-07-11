<template>
  <label class="header-search__input">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter="$emit('search')"
      placeholder="Поиск"
      aria-label="Поиск товаров"
    />
    <button
      class="header-search__input-btn"
      :class="{ active: modelValue.length > 0 }"
      :disabled="modelValue.length === 0"
      @click="$emit('search')"
      aria-label="Искать по запросу"
    >
      <BaseIcon name="SearchIcon" />
    </button>
  </label>
</template>

<script>
export default {
  name: 'BaseSearchField',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
}
</script>
