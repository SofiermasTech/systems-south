<template>
  <article class="contacts-block">
    <BaseButtonCall />
    <a href="tel:+78612125445" class="contacts-block__item">+7 (861) 212-54-45</a>
    <a href="mailto:sales@ingsystemyuga.ru" class="contacts-block__item">sales@ingsystemyuga.ru</a>
  </article>
</template>

<script>
export default {
  name: 'ContactsPageBlock',
  methods: {
    // openPopup() {
    //   this.$emit('open-popup')
    // },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.contacts-block {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1vw, 20px);

  // &__btn {
  //   width: fit-content;
  //   padding: 0;
  //   padding-bottom: 2px;
  //   background-color: transparent;
  //   border: none;
  //   border-bottom: 1px solid var(--blue);
  //   font-size: 14px;
  //   color: var(--blue);
  //   text-decoration: none;
  // }

  &__item {
    font-weight: 600;
    @include fluid-text(28, 12);
    line-height: 110%;
    color: var(--black);
    text-decoration: none;
  }
}
</style>
