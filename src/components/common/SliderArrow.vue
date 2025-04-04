<template>
  <div class="slider-arrow">
    <div class="slider-arrow__item">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 10">
        <path
          fill="#242527"
          d="M7.431 1.251v7.5a.39.39 0 0 1-.066.216.444.444 0 0 1-.18.153.498.498 0 0 1-.473-.026L.754 5.344a.41.41 0 0 1 0-.685L6.712.909a.488.488 0 0 1 .474-.027.443.443 0 0 1 .18.154c.043.065.065.14.065.215Z"
        />
      </svg>
    </div>
    <div class="slider-arrow__item">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 10">
        <path
          fill="#242527"
          d="M.569 1.251v7.5c0 .076.023.15.066.216a.444.444 0 0 0 .18.153.498.498 0 0 0 .473-.026l5.958-3.75a.41.41 0 0 0 0-.685L1.288.909A.488.488 0 0 0 .814.882a.443.443 0 0 0-.18.154.388.388 0 0 0-.065.215Z"
        />
      </svg>
    </div>
  </div>
</template>
<script></script>
<style lang="scss">
.slider-arrow {
  display: flex;

  &__item {
    background-color: var(--white);
    border: 1px solid var(--grey-100);
    border-radius: 50%;
    padding: 12px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
      width: 8px;
      height: 7px;
    }
  }
}
</style>
