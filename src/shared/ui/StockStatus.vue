<template>
  <p
    class="stock-status"
    :class="{
      'stock-available': stock,
      'stock-unavailable': !stock,
    }"
  >
    {{ stockStatus }}
  </p>
</template>

<script>
export default {
  name: 'StockStatus',
  props: {
    stock: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    stockStatus() {
      return this.stock ? 'В наличии' : 'Нет в наличии'
    },
  },
}
</script>

<style lang="scss">
.stock-status {
  font-weight: 600;
  font-size: 12px;

  &.stock-available {
    color: var(--green);
  }

  &.stock-unavailable {
    color: var(--grey-200);
  }
}
</style>
