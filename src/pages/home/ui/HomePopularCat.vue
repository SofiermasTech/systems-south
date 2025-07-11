<template>
  <section class="popular-categories container">
    <div class="popular-categories__top">
      <h2 class="popular-categories__top-title h2">Популярные категории</h2>
    </div>
    <div class="popular-categories__content">
      <div class="popular-categories__left">
        <BaseCardTopSale
          :data="popularCategory"
          theme="categories"
          :active-category="activeCategory"
        />
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
import BaseCardTopSale from '@/shared/ui/BaseCardTopSale.vue'

export default {
  name: 'HomePopularCat',
  components: {
    BaseCardTopSale,
  },
  data() {
    return {
      catalogStore: useCatalogStore(),
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

  &__content {
    width: 100%;
    // height: 52vh;
    // height: 550px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    @include mobile {
      display: flex;
      flex-direction: column-reverse;
      height: fit-content;
    }
  }

  .top-sale__wrapper {
    max-width: 60%;

    @include tablet {
      max-width: 100%;
      width: 100%;
      padding: 0;
    }
  }

  .top-sale__title {
    font-weight: 500;
    @include fluid-text(28, 16);
    line-height: 110%;
    letter-spacing: -0.04em;

    @include tablet {
      max-width: 65%;
    }

    @include mobile {
      max-width: 100%;
      font-size: 20px;
    }
  }

  .top-sale__block-img {
    @include tablet {
      position: absolute;
      right: 0;
      top: 50px;
      max-height: 250px;
      max-width: 185px;

      img {
        max-height: 250px;
      }
    }

    @include tablet-bottom {
      top: 40px;
      max-height: 170px;

      img {
        max-height: 170px;
      }
    }

    @include mobile {
      position: static;
      max-height: 230px;

      img {
        max-height: 230px;
      }
    }
  }

  // &__left {
  //   height: fit-content;
  // }

  &__right {
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
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

    @include tablet {
      padding: 10px 14px;
    }

    .popular-categories__item-info {
      svg {
        color: var(--grey-200);
      }
    }

    @include hover {
      background-color: var(--blue);

      .popular-categories__item-title,
      span {
        color: var(--white);
      }

      .popular-categories__item-info {
        div {
          background-color: var(--white);
        }
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
    @include fluid-text(28, 14);
    line-height: 110%;
    letter-spacing: -0.04em;

    @include mobile {
      font-size: 16px;
    }
  }

  &__item-info {
    display: flex;
    align-items: center;
    gap: 16px;

    span {
      font-weight: 600;
      font-size: 12px;
      color: var(--grey-200);

      @include tablet-bottom {
        font-size: 10px;
        font-weight: 500;
      }
    }

    div {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: var(--grey-100);
      display: flex;
      align-items: center;
      justify-content: center;

      @include laptop-bottom {
        width: 50px;
        height: 50px;
      }

      @include tablet-bottom {
        width: 36px;
        height: 36px;

        svg {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
}
</style>
