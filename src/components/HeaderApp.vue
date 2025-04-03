<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <RouterLink to="/" class="header__logo">
          <div class="logo">
            <img
              class="logo__img"
              src="@/assets/images/logo-app.svg"
              alt=""
              width="147"
              height="56"
            />
          </div>
        </RouterLink>
        <div class="header__top">
          <nav class="header__nav">
            <ul class="header__nav-list">
              <li class="header__nav-item">
                <a href="" class="header__nav-item-link"><p>О компании</p></a>
              </li>
              <li class="header__nav-item">
                <a href="" class="header__nav-item-link">
                  <span class="header__nav-item-icon">
                    <svg
                      width="19"
                      height="20"
                      viewBox="0 0 19 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.8 2.37501L15.3083 5.59168L18.2333 7.08335L16.7583 10L18.2416 12.9167L15.2916 14.4083L14.7833 17.625L11.5416 17.1167L9.2333 19.4167L6.91663 17.0833L3.69996 17.6167L3.1833 14.375L0.274963 12.8917L1.7583 9.97501L0.283297 7.08335L3.2083 5.57501L3.71663 2.38335L6.94163 2.91668L9.2583 0.575012L11.5666 2.88335L14.8 2.37501ZM7.17496 5.83335C6.84344 5.83335 6.5255 5.96504 6.29108 6.19946C6.05666 6.43388 5.92496 6.75182 5.92496 7.08335C5.92496 7.41487 6.05666 7.73281 6.29108 7.96723C6.5255 8.20165 6.84344 8.33335 7.17496 8.33335C7.50648 8.33335 7.82443 8.20165 8.05885 7.96723C8.29327 7.73281 8.42496 7.41487 8.42496 7.08335C8.42496 6.75182 8.29327 6.43388 8.05885 6.19946C7.82443 5.96504 7.50648 5.83335 7.17496 5.83335ZM11.3416 11.6667C11.0101 11.6667 10.6922 11.7984 10.4577 12.0328C10.2233 12.2672 10.0916 12.5852 10.0916 12.9167C10.0916 13.2482 10.2233 13.5661 10.4577 13.8006C10.6922 14.035 11.0101 14.1667 11.3416 14.1667C11.6732 14.1667 11.9911 14.035 12.2255 13.8006C12.4599 13.5661 12.5916 13.2482 12.5916 12.9167C12.5916 12.5852 12.4599 12.2672 12.2255 12.0328C11.9911 11.7984 11.6732 11.6667 11.3416 11.6667ZM6.26663 14.1667L13.425 7.00835L12.25 5.83335L5.09163 12.9917L6.26663 14.1667Z"
                        fill="#FF6F39"
                      />
                    </svg>
                  </span>
                  <p>Акции</p>
                </a>
              </li>
              <li class="header__nav-item">
                <a href="" class="header__nav-item-link"><p>Контакты</p></a>
              </li>
              <li class="header__nav-item">
                <a href="" class="header__nav-item-link"><p>FAQ</p></a>
              </li>
            </ul>
          </nav>
          <address class="header__adress"></address>
        </div>
        <div class="header__bottom">
          <!-- Кнопка каталога -->
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
        </div>
        <div class="header__user-actions user-actions">
          <!-- Кнопка избранного -->
          <RouterLink
            to="/personal/favorites"
            class="user-actions__btn user-actions__btn--favorites"
          >
            <span class="user-actions__icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 20">
                <path
                  stroke="#242527"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15.696 1C13.652 1 11.887 2.197 11 3.943 10.113 2.197 8.348 1 6.304 1 3.374 1 1 3.457 1 6.481s1.817 5.796 4.165 8.073S11 19 11 19s3.374-2.133 5.835-4.446C19.46 12.088 21 9.514 21 6.481 21 3.448 18.626 1 15.696 1Z"
                />
              </svg>
            </span>
            <span class="user-actions__counter">1</span>
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
            </span>
            <span class="user-actions__counter">00</span>
            <span class="user-actions__text">Корзина</span>
          </RouterLink>
          <template>
            <!-- Если в корзине есть товары, используем button для открытия попапа -->
            <button class="user-actions__bbtn user-actions__btn--cart">
              <span class="user-actions__icon"></span>
              <span class="user-actions__counter">10</span>
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
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderApp',
  props: {},
}
</script>

<style scoped lang="scss"></style>
