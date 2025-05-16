<template>
  <button type="button" class="btn-close-popup">
    <BaseIcon name="CloseIcon" />
  </button>
</template>

<script>
export default {
  name: "BaseButtonClosePopup"
}
</script>

<style lang="scss">
.btn-close-popup {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  position: absolute;
  top: -28px;
  right: -24px;

  svg {
    width: 10px;
    height: 10px;
  }
}
</style>
