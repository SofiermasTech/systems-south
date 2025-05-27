<template>
  <!-- <RouterLink to="/catalog"> -->
  <button
    type="button"
    class="header__btn-catalog btn-catalog"
    @click="$emit('click')"
    :class="{ active: active }"
  >
    <span class="btn-catalog__icon">
      <BaseIcon name="CatalogButtonIcon" />
    </span>
    <p class="btn-catalog__text">Каталог товаров</p>
  </button>
  <!-- </RouterLink> -->
</template>
<script>
export default {
  name: 'CatalogButton',
  emits: ['click'],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss">
.btn-catalog {
  flex-shrink: 0;
  padding: 28px 20px;
  background-color: var(--blue);
  border-color: transparent;
  border-radius: var(--br-btn);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--white);

  &__icon {
    width: 20px;
    height: 20px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__text {
    font-weight: 500;
    font-size: 12px;
  }

  &.active {
    background-color: var(--white);
    border-color: var(--blue);
    color: var(--blue);
  }
}
</style>
