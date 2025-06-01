<template>
  <BasePopup :title="'Вход в аккаунт'" :is-visible="isVisible">
    <template #popup-content>
      <BaseForm @close-popup="closePopup" @submit-success="handleSubmitSuccess" />
    </template>
  </BasePopup>
</template>

<script>
export default {
  name: 'LoginPopup',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closePopup() {
      this.$emit('close-popup')
    },
    handleSubmitSuccess() {
      this.$emit('submit-success')
    },
  },
}
</script>

<style lang="scss"></style>
