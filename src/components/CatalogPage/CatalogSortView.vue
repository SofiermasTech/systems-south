<template>
  <div class="sort-view">
    <button class="sort-view__btn sort-view__btn--grid active" type="button">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <rect width="7.182" height="7.182" x=".5" y="12.318" stroke="#1C71B7" rx="1.5" />
          <rect width="7.182" height="7.182" x=".5" y=".5" stroke="#1C71B7" rx="1.5" />
          <rect width="7.182" height="7.182" x="12.318" y="12.318" stroke="#1C71B7" rx="1.5" />
          <rect width="7.182" height="7.182" x="12.318" y=".5" stroke="#1C71B7" rx="1.5" />
        </svg>
      </span>
    </button>
    <button class="sort-view__btn sort-view__btn--list" type="button">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 20">
          <path
            stroke="#1C71B7"
            stroke-linecap="round"
            d="M1 12.5h20M1 17.5h20M1 2.5h20M1 7.5h20"
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<script></script>
<style lang="scss">
.sort-view {
  display: flex;
  align-items: center;
  gap: 8px;

  &__btn {
    border: 1px solid var(--blue-100);
    border-radius: var(--br-btn);
    background-color: transparent;
    color: var(--blue);
    padding: 10px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
      background-color: var(--blue-0);
      border-color: var(--blue-0);
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  &__btn--grid {
  }

  &__btn--list {
  }
}
</style>
