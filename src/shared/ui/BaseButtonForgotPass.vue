<template>
  <button class="btn-forgot-pass" type="button" @click="openChangePassPopup">Забыли пароль?</button>
</template>

<script>
export default {
  name: 'BaseButtonFotgotPass',
}
</script>
<style lang="scss">
@import '@/assets/styles/utils.scss';

.btn-forgot-pass {
  padding: 12px;
  background-color: transparent;
  border: none;
  font-weight: 600;
  @include fluid-text(14, 10);
  text-align: center;
  color: var(--blue);
}
</style>
