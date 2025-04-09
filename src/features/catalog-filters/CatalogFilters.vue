<template>
  <div class="aside-filters">
    <div class="aside-filters__wrapper">
      <div class="aside-filters__item">
        <div class="aside-filters__item-heading">
          <h3 class="aside-filters__item-title">Бренд</h3>
          <span class="aside-filters__item-arrow select-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 8">
              <path
                fill="#242527"
                d="M8.75.569h-7.5a.39.39 0 0 0-.216.066.445.445 0 0 0-.153.18.498.498 0 0 0 .026.473l3.75 5.958a.41.41 0 0 0 .685 0l3.75-5.958A.488.488 0 0 0 9.12.814a.443.443 0 0 0-.154-.18A.388.388 0 0 0 8.75.57Z"
              />
            </svg>
          </span>
        </div>
        <div class="aside-filters__item-content">
          <ul class="aside-filters__list">
            <li class="aside-filters__list-item">
              <label class="aside-filters__list-item-label">
                <input type="checkbox" />
                <span class="aside-filters__list-item-check">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 9">
                    <path
                      fill="#fff"
                      d="M11.864.655a.499.499 0 0 1-.021.707l-7.93 7.474a.6.6 0 0 1-.839-.016L.394 6.1a.5.5 0 0 1 .712-.702L3.512 7.84 11.157.634a.5.5 0 0 1 .707.021Z"
                    />
                  </svg>
                </span>
                <p>Бренд 1</p>
              </label>
            </li>
            <li class="aside-filters__list-item">
              <label class="aside-filters__list-item-label">
                <input type="checkbox" />
                <span class="aside-filters__list-item-check">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 9">
                    <path
                      fill="#fff"
                      d="M11.864.655a.499.499 0 0 1-.021.707l-7.93 7.474a.6.6 0 0 1-.839-.016L.394 6.1a.5.5 0 0 1 .712-.702L3.512 7.84 11.157.634a.5.5 0 0 1 .707.021Z"
                    />
                  </svg>
                </span>
                <p>Бренд 2</p>
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div class="aside-filters__item">
        <div class="aside-filters__item-heading">
          <h3 class="aside-filters__item-title">Цена</h3>
          <span class="aside-filters__item-arrow select-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 8">
              <path
                fill="#242527"
                d="M8.75.569h-7.5a.39.39 0 0 0-.216.066.445.445 0 0 0-.153.18.498.498 0 0 0 .026.473l3.75 5.958a.41.41 0 0 0 .685 0l3.75-5.958A.488.488 0 0 0 9.12.814a.443.443 0 0 0-.154-.18A.388.388 0 0 0 8.75.57Z"
              />
            </svg>
          </span>
        </div>
        <div class="aside-filters__options">
          <div class="aside-filters__options-btn">
            <label class="aside-filters__label-price">
              <div class="aside-filters__price">
                <!-- <span class="aside-filters__price-from">от</span> -->
                <input
                  id="price-from"
                  class="filter-input"
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  value=""
                  placeholder="от 0 ₽"
                  minlength="2"
                />
              </div>
            </label>
            <label class="aside-filters__label-price">
              <div class="aside-filters__price">
                <span class="aside-filters__price-to">до</span>
                <input
                  id="price-to"
                  class="filter-input"
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  value=""
                  placeholder="9999"
                  minlength="2"
                />
              </div>
            </label>
          </div>
        </div>
      </div>
      <div class="aside-filters__btn-wrapper">
        <button class="aside-filters__btn-submit" type="button">Применить</button>
        <button class="aside-filters__btn-reset" type="reset">Сбросить</button>
      </div>
    </div>
  </div>
</template>

<script></script>
<style lang="scss">
.aside-filters {
  &__wrapper {
    height: min-content;
    padding: 12px 16px 12px;
    // background-color: var(--blue-500);
    // border-radius: 12px;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.7s easy;
  }

  &__item {
  }

  &__item-heading {
    width: 100%;
    // min-height: 40px;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--blue-100);
    border-radius: var(--br-block);
    cursor: pointer;
  }

  &__item-title {
    font-weight: 700;
    font-size: 16px;
    color: var(--black);
  }

  &__item-arrow {
    width: 20px;
    height: 20px;

    svg {
      width: 10px;
      height: 8px;
    }
  }

  &__item-content {
    padding-left: 24px;
  }

  &__list {
    margin-block: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 14px;
  }

  &__list-item {
    font-size: 14px;
    color: var(--grey-200);
  }

  &__list-item-label {
    display: flex;
    align-items: center;
    column-gap: 12px;
    cursor: pointer;

    input[type='checkbox'],
    input[type='radio'] {
      clip: rect(0 0 0 0);
      -webkit-clip-path: inset(50%);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    & input:checked + .aside-filters__list-item-check {
      border-color: var(--blue);
      background-color: var(--blue);

      svg {
        color: #fff;
      }
    }
  }

  &__list-item-check {
    border: 1px solid var(--grey-200);
    border-radius: 4px;
    width: 20px;
    height: 20px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.3s ease-out,
      border-color 0.3s ease-out;
    color: #fff;

    svg {
      color: transparent;
      width: 12px;
      height: 9px;
    }
  }

  &__options {
  }

  &__options-btn {
  }

  &__label-price {
  }

  &__price {
  }

  &__price-to {
  }

  &__btn-wrapper {
  }

  &__btn-submit {
  }

  &__btn-reset {
  }
}
.select-arrow {
}
.filter-input {
}
</style>
