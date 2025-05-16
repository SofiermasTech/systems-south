<template>
  <button class="base-button-call" type="button">Заказать звонок</button>
</template>

<script>
export default {
  name: 'BaseButtonCall',

}
</script>

<style lang="scss">
.base-button-call {
  width: fit-content;
  padding: 0;
  padding-bottom: 1px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--blue);
  font-size: 14px;
  color: var(--blue);
  text-decoration: none;
}
</style>
