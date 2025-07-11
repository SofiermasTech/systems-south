<template>
  <RouterLink to="/" class="logo">
    <div class="logo__wrapper">
      <img class="logo__img" src="@/assets/images/logo-app.svg" alt="" width="147" height="56" />
    </div>
  </RouterLink>
</template>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.logo {
  width: 100%;
  background-color: var(--white);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  grid-row: span 2;

  @include tablet-bottom {
    grid-area: logo;
    grid-row: span 1;
  }

  @media screen and (max-width: 720px) {
    width: 100px;
    height: 50px;
    border-radius: var(--br-btn);
  }

  &__wrapper {
    width: 100%;
    background-color: var(--black);
    border-radius: var(--br-btn);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__img {
    width: 70%;
    object-fit: contain;
    object-position: center;

    @media screen and (max-width: 720px) {
      width: 83%;
    }
  }
}
</style>
