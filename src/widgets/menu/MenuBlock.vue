<template>
  <Transition name="menu" :duration="{ enter: 700, leave: 300 }">
    <section class="menu" v-if="open">
      <div class="menu__body" @click.stop>
        <div class="menu__left">
          <p class="menu__left-title">Каталог</p>
          <ul class="menu__left-list">
            <li
              class="menu__left-item"
              v-for="category in categories"
              :key="category.slug"
              :class="{ active: activeCategory === category.slug }"
              @mouseenter="!isTablet && setActiveCategory(category.slug)"
              @click.prevent="isTablet && setActiveCategory(category.slug)"
            >
              <RouterLink
                v-if="!isTablet"
                :to="`/catalog/${category.slug}`"
                @click="closePopup"
              >
                <p>{{ category.name }}</p>
                <span>
                  <BaseIcon name="SelectArrowIcon" />
                </span>
              </RouterLink>
              <div v-if="isTablet">
                <p>{{ category.name }}</p>
                <span>
                  <BaseIcon name="SelectArrowIcon" />
                </span>
              </div>
            </li>
          </ul>
        </div>
        <Transition name="submenu">
          <div class="menu__right" v-if="currentLevel === 'subcategories' || activeCategory">
            <button class="menu__btn-back" type="button" @click="goBack">
              <span>
                <BaseIcon name="SelectArrowIcon" />
              </span>
              <span>Раздел</span>
            </button>
            <ul class="menu__right-list">
              <li
                class="menu__right-item"
                v-for="subcategory in subcategories"
                :key="subcategory.slug"
              >
                <RouterLink
                  :to="`/catalog/${activeCategory}/${subcategory.slug}`"
                  @click="closePopup"
                >
                  <p>{{ subcategory.name }}</p>
                  <span>
                    <BaseIcon name="SelectArrowIcon" />
                  </span>
                </RouterLink>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </section>
  </Transition>
</template>

<script>
import { useCatalogStore } from '@/shared/stores/catalog.js'
import { usePopupStore } from '@/shared/stores/popup.js'
import { categoryNames } from '@/shared/config/categoryNames.js'

export default {
  name: 'MenuBlock',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    activeCategory: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      catalogStore: useCatalogStore(),
      popupStore: usePopupStore(),
      currentLevel: 'categories', // 'categories' или 'subcategories'
      isTablet: false,
    }
  },
  computed: {
    categories() {
      return this.catalogStore.getCategories.map((category) => ({
        slug: category.id,
        name: category.name,
      }))
    },
    subcategories() {
      return this.activeCategory && this.currentLevel === 'subcategories'
        ? this.catalogStore.getSubcategoriesByCategory(this.activeCategory).map((subcategory) => ({
            slug: subcategory,
            name: categoryNames[subcategory] || subcategory,
          }))
        : []
    },
  },
  methods: {
    closePopup() {
      this.popupStore.hidePopup()
      this.$emit('update:activeCategory', null)
      this.currentLevel = 'categories'
    },
    setActiveCategory(category) {
      if (this.isTablet) {
        this.currentLevel = 'subcategories' // Переключаем на подкатегории для тач-устройств
      }
      this.$emit('update:activeCategory', category)
    },
    goBack() {
      this.currentLevel = 'categories' // Возвращаемся к категориям
      this.$emit('update:activeCategory', null) // Сбрасываем активную категорию
    },
    updateDeviceType() {
    this.isTablet = window.innerWidth < 1024
  },
  },
  mounted() {
    this.updateDeviceType()
    window.addEventListener('resize', this.updateDeviceType)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateDeviceType)
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.menu {
  width: fit-content;
  height: 100vh;
  flex-grow: 1;
  position: relative;
  z-index: 102;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  @media screen and (max-width: 720px) {
    // height: calc(100vh - 70px);
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
  }

  &__body {
    width: auto;
    height: 100%;
    padding: 32px 24px 28px clamp(20px, 2vw, 40px);
    background-color: var(--white);
    border-radius: 0 10px 10px 0;
    display: flex;
    gap: 32px;
    transition: width 0.5s;

    @media screen and (max-width: 720px) {
      width: 100vw;
      border-radius: 0;
    }
  }

  &__left {
    width: 23vw;

    @include tablet {
      width: 30vw;
    }

    @media screen and (max-width: 720px) {
      width: 100%;
    }
  }

  &__left-title {
    margin-bottom: 20px;
    font-weight: 600;
    @include fluid-text(24, 16);
    line-height: 110%;
  }

  &__left-list {
    display: flex;
    flex-direction: column;
    gap: -1px;
  }

  &__left-item {
    padding: 16px;
    border: 1px solid var(--blue-0);
    border-radius: 10px;
    cursor: pointer;

    &:not(:last-child) {
      border-bottom: none;
    }

    @include tablet {
      padding: 12px;
    }

    a,
    div {
      text-decoration: none;
      color: var(--black);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    p {
      margin: 0;
      font-weight: 500;
      @include fluid-text(14, 10);
    }

    span {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(-90deg);

      svg {
        width: 8px;
        height: 10px;
      }
    }

    &.active {
      background-color: var(--blue-0);
    }
  }

  &__right {
    width: 25vw;
    padding-top: 42px;
    transition: 0.3s;

    @include tablet {
      width: 30vw;
    }

    @media screen and (max-width: 720px) {
      width: calc(100vw - (var(--container-padding-y) * 2));
      position: absolute;
      left: var(--container-padding-y);
      padding-inline: var(--container-padding-y);
      background-color: var(--white);
      height: 100vh;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    a {
      text-decoration: none;
      color: var(--black);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__btn-back {
    width: fit-content;
    margin-left: 8px;
    background-color: transparent;
    border: none;
    display: none;
    align-items: center;
    gap: 12px;

    @media screen and (max-width: 720px) {
      display: flex;
    }

    span {
      font-weight: 600;
      font-size: 16px;

      &:first-of-type {
        width: 16px;
        height: 16px;
        transform: rotate(90deg);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    svg {
      width: 8px;
      height: 8px;
    }
  }

  &__right-item {
    border-bottom: 1px solid var(--blue-0);
    padding: 12px;
    cursor: pointer;

    p {
      margin: 0;
      @include fluid-text(14, 10);
    }

    span {
      width: 10px;
      height: 8px;
      transform: rotate(-90deg);
    }
  }
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
.menu-enter-active,
.menu-leave-active {
  transition: 0.3s ease;
}
.menu-enter-to,
.menu-leave-from {
  opacity: 1;
}

.menu-enter-from .menu__body {
  transform: translateX(-100%);
}
.menu-enter-active .menu__body,
.menu-leave-active.menu__body {
  transition: 0.7s ease;
}
.menu-enter-to .menu__body {
  transform: translateX(0);
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;

  @media screen and (max-width: 720px) {
    opacity: 1;
    transform: translateX(100%);
  }
}
.submenu-enter-active,
.submenu-leave-active {
  transition: opacity 0.3s ease;

  @media screen and (max-width: 720px) {
    transition: 0.5s;
  }
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;

  @media screen and (max-width: 720px) {
    transform: translateX(0);
  }
}
</style>
