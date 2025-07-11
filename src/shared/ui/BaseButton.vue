<template>
  <button class="base-button" :type="type">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button',
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/utils.scss';

.base-button {
  width: fit-content;
  border-radius: 500px;
  padding: 14px 20px;
  background-color: var(--blue);
  border: none;
  font-weight: 500;
  font-size: 12px;
  color: var(--white);
  cursor: pointer;

   @include laptop {
    font-size: 10px;
  }

  @include laptop-bottom {
    padding: 12px 16px;
  }
}
</style>
