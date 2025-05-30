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
.base-button {
  width: fit-content;
  border-radius: 500px;
  padding: 15px 23px 14px;
  background-color: var(--blue);
  border: none;
  font-weight: 500;
  font-size: 12px;
  color: var(--white);
  cursor: pointer;
}
</style>
