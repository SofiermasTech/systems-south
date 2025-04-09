<template>
  <div class="header__user-actions user-actions">
    <!-- Кнопка избранного -->
    <RouterLink to="/personal/favorites" class="user-actions__btn user-actions__btn--favorites">
      <div class="user-actions__icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 20">
          <path
            stroke="#242527"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M15.696 1C13.652 1 11.887 2.197 11 3.943 10.113 2.197 8.348 1 6.304 1 3.374 1 1 3.457 1 6.481s1.817 5.796 4.165 8.073S11 19 11 19s3.374-2.133 5.835-4.446C19.46 12.088 21 9.514 21 6.481 21 3.448 18.626 1 15.696 1Z"
          />
        </svg>
        <span v-if="favoritesCount > 0" class="user-actions__counter">{{ favoritesCount }}</span>
      </div>

      <span class="user-actions__text">Избранное</span>
    </RouterLink>
    <!-- Кнопки корзины -->
    <RouterLink to="/cart" class="user-actions__btn user-actions__btn--cart">
      <span class="user-actions__icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            stroke="#242527"
            stroke-width="1.5"
            d="M9.611 22.788a1.916 1.916 0 1 0 0-3.832 1.916 1.916 0 0 0 0 3.832ZM18.553 22.788a1.916 1.916 0 1 0 0-3.832 1.916 1.916 0 0 0 0 3.832Z"
          />
          <path
            stroke="#242527"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M1.309 1.712h2.554l4.476 14.05h10.214"
          />
          <path
            stroke="#242527"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M7.343 12.57 4.886 4.904h15.976a.638.638 0 0 1 .607.84l-2.13 6.388a.639.639 0 0 1-.605.436H7.344Z"
          />
        </svg>
        <span class="user-actions__counter">00</span>
      </span>

      <span class="user-actions__text">Корзина</span>
    </RouterLink>
    <template>
      <!-- Если в корзине есть товары, используем button для открытия попапа -->
      <button class="user-actions__bbtn user-actions__btn--cart">
        <span class="user-actions__icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path
              stroke="#242527"
              stroke-width="1.5"
              d="M9.611 22.788a1.916 1.916 0 1 0 0-3.832 1.916 1.916 0 0 0 0 3.832ZM18.553 22.788a1.916 1.916 0 1 0 0-3.832 1.916 1.916 0 0 0 0 3.832Z"
            />
            <path
              stroke="#242527"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M1.309 1.712h2.554l4.476 14.05h10.214"
            />
            <path
              stroke="#242527"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M7.343 12.57 4.886 4.904h15.976a.638.638 0 0 1 .607.84l-2.13 6.388a.639.639 0 0 1-.605.436H7.344Z"
            />
          </svg>
          <span class="user-actions__counter">10</span>
        </span>
        <span class="user-actions__text">Корзина</span>
      </button>
    </template>
    <!-- Кнопки личного кабинета -->
    <RouterLink to="/personal" class="user-actions__btn user-actions__btn--personal">
      <span class="user-actions__icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 24">
          <path
            stroke="#242527"
            stroke-linecap="round"
            stroke-width="2"
            d="M3.738 19.5c1.325-2.21 4.23-3.724 8.762-3.724s7.437 1.513 8.762 3.724M16.1 8.1a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0Z"
          />
        </svg>
      </span>
      <span class="user-actions__text">Личный кабинет</span>
    </RouterLink>
    <template>
      <!-- Если не авторизован, используем button для открытия попапа -->
      <button class="user-actions__bbtn user-actions__btn--cart">
        <span class="user-actions__text">Вход</span>
      </button>
    </template>
  </div>
</template>
<script>
export default {
  name: "UserActions",
  props: {
    favoritesCount: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style lang="scss">
.user-actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;

  &__btn {
    text-decoration: none;
    border: 1px solid var(--grey-100);
    border-radius: var(--br-btn);
    padding: 16px 17px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  &__btn--favorites {
  }

  &__icon {
    width: 24px;
    height: 24px;
    color: var(--black);
    position: relative;
  }

  &__counter {
    position: absolute;
    top: -8px;
    right: -10px;
    background-color: var(--blue);
    border: 1px solid var(--white);
    border-radius: 50px;
    // padding: 4px;
    width: 19px;
    height: 19px;
    color: var(--white);
    font-size: 10px;
    line-height: 110%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__text {
    font-weight: 500;
    font-size: 14px;
    color: var(--grey-200);
  }

  &__btn--cart {
  }

  &__bbtn {
  }

  &__btn--personal {
  }
}
</style>
