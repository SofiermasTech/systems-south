<template>
  <section class="popular-categories container">
    <div class="popular-categories__top">
      <h2 class="popular-categories__top-title h2">Популярные категории</h2>
    </div>
    <div class="popular-categories__content">
      <div class="popular-categories__left">
        <div v-if="activeProduct" class="popular-categories__product-card">
          <div class="popular-categories__product-info">
            <h3 class="popular-categories__product-title">{{ activeProduct.name }}</h3>
            <div class="popular-categories__product-characteristics">
              <p class="popular-categories__product-model">Модель: {{ activeProduct.model }}</p>
              <p class="popular-categories__product-price">{{ activeProduct.price }} ₽</p>
            </div>
            <RouterLink
              :to="`/product/${activeProduct.id}`"
              class="popular-categories__product-button base-button"
            >
              Перейти к товару
            </RouterLink>
          </div>
          <div class="popular-categories__product-img">
            <img :src="activeProduct.images[0]" alt="" />
          </div>
        </div>
      </div>
      <div class="popular-categories__right">
        <ul class="popular-categories__list">
          <li
            class="popular-categories__item"
            v-for="item in popularCategory"
            :key="item.id"
            :class="{ active: activeCategory === item.title }"
            @click="selectCategory(item.title)"
          >
            <h3 class="popular-categories__item-title">{{ item.title }}</h3>
            <div class="popular-categories__item-info">
              <span>больше 500 товаров</span>
              <div>
                <BaseIcon :name="item.icon" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { useCatalogStore } from '@/shared/stores/catalog'

export default {
  name: 'HomePopularCat',
  data() {
    return {
      catalogStore: null,
      activeCategory: 'Кабели',
      popularCategory: [
        {
          id: 1,
          title: 'Кабели',
          icon: 'CabelIcon',
          productId: 1,
        },
        {
          id: 2,
          title: 'Электрощиты',
          icon: 'ElectroIcon',
          productId: 2,
        },
        {
          id: 3,
          title: 'Автоматика',
          icon: 'AutomaticaIcon',
          productId: 3,
        },
        {
          id: 4,
          title: 'Светотехника',
          icon: 'LightTechnicIcon',
          productId: 6,
        },
        {
          id: 5,
          title: 'Теплый пол',
          icon: 'WarmFloorIcon',
          productId: 10,
        },
      ],
    }
  },
  computed: {
    activeProduct() {
      if (!this.activeCategory) return null
      const category = this.popularCategory.find((item) => item.title === this.activeCategory)
      if (!category || !category.productId) return null
      return this.catalogStore.getProductById(category.productId)
    },
  },
  async created() {
    this.catalogStore = useCatalogStore()
    await this.catalogStore.loadProducts()
  },
  methods: {
    selectCategory(title) {
      this.activeCategory = title
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.popular-categories {
  margin-bottom: var(--section-offset);
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__top {
  }

  &__top-title {
  }

  &__content {
    width: 100%;
    height: 52vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  &__left {
    background-image: linear-gradient(318deg, #fafcff 0%, #f2f7fd 100%);
    border-radius: 16px;
  }

  &__product-card {
    height: 100%;
    padding: 32px 24px 40px;
    display: flex;
    justify-content: space-between;
    gap: 24px;
  }

  &__product-info {
    max-width: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    a {
      text-decoration: none;
      background-color: var(--black);
    }
  }

  &__product-title {
    max-width: 90%;
    font-weight: 500;
    font-size: 28px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__product-characteristics {
    margin-top: auto;
    display: flex;
    gap: 24px;
  }

  &__product-model,
  &__product-price {
    font-weight: 600;
    font-size: 16px;
  }

  &__right {
  }

  &__list {
  }

  &__item {
    padding: 16px 20px;
    border: 1px solid var(--grey-100);
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;

    @include hover {
      background-color: var(--blue);

      .popular-categories__item-title,
      span {
        color: var(--white);
      }

      .popular-categories__item-info div {
        background-color: var(--white);
      }
    }

    &.active {
      background-color: var(--blue);
      transition: 0.3s;

      .popular-categories__item-title,
      span {
        color: var(--white);
      }

      .popular-categories__item-info div {
        background-color: var(--white);
      }
    }
  }

  &__item-title {
    font-weight: 500;
    font-size: 28px;
    line-height: 110%;
    letter-spacing: -0.04em;
  }

  &__item-info {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      font-weight: 600;
      font-size: 12px;
      color: var(--grey-200);
    }

    div {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: var(--grey-100);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
