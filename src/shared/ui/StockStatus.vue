<template>
  <div
    class="stock-status"
    :class="{
      'stock-available': stock,
      'stock-unavailable': !stock,
    }"
  >
    <span></span>
    <p>{{ stockStatus }}</p>
  </div>
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
  display: flex;
  align-items: center;
  gap: 6px;

  &.stock-available {
    color: var(--green);

    span {
      background-color: var(--green);
    }
  }

  &.stock-unavailable {
    color: var(--grey-200);
    span {
      background-color: var(--grey-200);
    }
  }

  span {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  p {
    margin: 0;
    font-weight: 600;
    font-size: 12px;
  }
}
</style>
