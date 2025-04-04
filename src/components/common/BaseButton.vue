<template>
  <button class="base-button" type="button">
    <slot></slot>
  </button>
</template>
<script></script>
<style lang="scss">
.base-button {
  width: fit-content;
  border-radius: 500px;
  padding: 14px 23px;
  background-color: var(--blue);
  border: none;
  font-weight: 500;
  font-size: 12px;
  color: var(--white);
  cursor: pointer;
}
</style>
