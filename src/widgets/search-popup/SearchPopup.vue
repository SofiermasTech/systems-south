<template>
  <Transition>
    <div class="search-popup" v-if="searchQuery.length > 0">
      <div class="search-popup__top" v-if="filteredProducts.length > 0">
        <p>Найдено {{ filteredProducts.length }} товара</p>
        <RouterLink :to="{ path: '/search', query: { query: searchQuery } }" @click="closeSearchPopup"
          >Показать все</RouterLink
        >
      </div>
      <div class="search-popup__result">
        <article class="popup-card" v-for="product in filteredProducts" :key="product.id">
          <div class="popup-card__img">
            <img
              :src="product.images[0]"
              :alt="product.brand"
              loading="lazy"
              width="68"
              height="68"
            />
          </div>
          <div class="popup-card__info">
            <p class="popup-card__text">{{ product.name }}</p>
            <p class="popup-card__price">{{ product.price.toLocaleString('ru-RU') }} ₽</p>
          </div>
        </article>
        <p class="search-popup__empty" v-if="filteredProducts.length === 0">
          По запросу ничего не найдено
        </p>
      </div>
    </div>
  </Transition>
</template>
<script>
export default {
  name: 'SearchPopup',
  props: {
    filteredProducts: {
      type: Array,
      default: () => [],
    },
    searchQuery: {
      type: String,
      default: '',
    },
  },
  methods: {
    closeSearchPopup() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
.search-popup {
  max-height: 40vh;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    p {
      margin: 0;
      font-weight: 500;
      font-size: 14px;
      color: var(--grey-200);
    }

    a {
      font-size: 14px;
      text-decoration: underline;
      text-underline-offset: 2px;
      color: var(--blue);
    }
  }

  &__result {
    max-height: 80%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .popup-card {
    max-width: 340px;
  }

  .popup-card__img {
    width: 68px;
    height: 68px;
    border-radius: 10px;

    img {
      border-radius: 10px;
    }
  }

  &__empty {
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    color: var(--grey-200);
  }
}

.v-enter-from,
.v-leave-to {

  transform: translateY(-50px);
}
.v-enter-active {
  transition: 0.3s ease-in-out;
}
.v-enter-to,
.v-leave-from {

  transform: translateY(0);
}
</style>
