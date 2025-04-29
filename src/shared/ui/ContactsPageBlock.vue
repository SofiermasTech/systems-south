<template>
  <article class="contacts-block">
    <a href="#" class="contacts-block__btn">Заказать звонок</a>
    <a href="tel:+78612125445" class="contacts-block__item">+7 (861) 212-54-45</a>
    <a href="mailto:sales@ingsystemyuga.ru" class="contacts-block__item">sales@ingsystemyuga.ru</a>
  </article>
</template>

<script>
export default {
  name: 'ContactsPageBlock',
}
</script>

<style lang="scss">
.contacts-block {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__btn {
    width: fit-content;
    padding: 0;
    padding-bottom: 2px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--blue);
    font-size: 14px;
    color: var(--blue);
    text-decoration: none;
  }

  &__item {
    font-weight: 600;
    font-size: 24px;
    line-height: 110%;
    color: var(--black);
    text-decoration: none;
  }
}
</style>
