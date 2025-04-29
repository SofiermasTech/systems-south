<template>
  <RouterLink to="/catalog">
    <button type="button" class="header__btn-catalog btn-catalog">
      <span class="btn-catalog__icon">
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.2583 17.5H14.7583C15.4213 17.5 16.0572 17.2366 16.5261 16.7678C16.9949 16.2989 17.2583 15.663 17.2583 15V13.5H13.2583V17.5ZM13.2583 12.5V8.5H17.2583V12.5H13.2583ZM12.2583 12.5H8.2583V8.5H12.2583V12.5ZM8.2583 13.5H12.2583V17.5H8.2583V13.5ZM7.2583 12.5V8.5H3.2583V12.5H7.2583ZM3.2583 13.5H7.2583V17.5H5.7583C5.09526 17.5 4.45937 17.2366 3.99053 16.7678C3.52169 16.2989 3.2583 15.663 3.2583 15V13.5ZM13.2583 7.5H17.2583V6C17.2583 5.33696 16.9949 4.70107 16.5261 4.23223C16.0572 3.76339 15.4213 3.5 14.7583 3.5H13.2583V7.5ZM12.2583 3.5V7.5H8.2583V3.5H12.2583ZM7.2583 3.5V7.5H3.2583V6C3.2583 5.33696 3.52169 4.70107 3.99053 4.23223C4.45937 3.76339 5.09526 3.5 5.7583 3.5H7.2583Z"
            fill="white"
          />
          <rect x="13.2896" y="13.4688" width="3.96875" height="4.03125" fill="white" />
          <rect x="13.2896" y="3.5" width="3.96875" height="4.03125" fill="white" />
          <rect x="3.2583" y="3.5" width="3.96875" height="4.03125" fill="white" />
          <rect x="3.2583" y="13.4688" width="3.96875" height="4.03125" fill="white" />
        </svg>
      </span>
      <p class="btn-catalog__text">Каталог товаров</p>
    </button>
  </RouterLink>
</template>
<script></script>
<style lang="scss">
.btn-catalog {
  padding: 28px 20px;
  background-color: var(--blue);
  border-color: transparent;
  border-radius: var(--br-btn);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--white);

  &__icon {
    width: 20px;
    height: 20px;
  }

  &__text {
    font-weight: 500;
    font-size: 12px;
  }
}
</style>
