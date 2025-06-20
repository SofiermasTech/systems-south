<template>
  <Transition name="menu" :duration="{ enter: 700, leave: 300 }">
    <section class="menu" v-if="open">
      <div class="menu__overlay" @click="closePopup">
        <!-- <transition> -->
        <div class="menu__body" @click.stop>
          <div class="menu__left">
            <p class="menu__left-title">Каталог</p>
            <ul class="menu__left-list">
              <li
                class="menu__left-item"
                v-for="category in categories"
                :key="category.slug"
                :class="{ active: activeCategory === category.slug }"
                @mouseenter="setActiveCategory(category.slug)"
              >
                <RouterLink :to="`/catalog/${category.slug}`" @click="closePopup">
                  <p>{{ category.name }}</p>
                  <span>
                    <BaseIcon name="SelectArrowIcon" />
                  </span>
                </RouterLink>
              </li>
            </ul>
          </div>
          <div class="menu__right" v-if="activeCategory">
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
        </div>
        <!-- </transition> -->
      </div>
    </section>
  </Transition>
</template>

<script>
import { useCatalogStore } from '@/shared/stores/catalog.js'
import { categoryNames } from '@/shared/config/categoryNames.js'

export default {
  name: 'MenuBlock',
  emits: ['update:open'],
  data() {
    return {
      catalogStore: useCatalogStore(),
      activeCategory: null,
    }
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    categories() {
      return this.catalogStore.getCategories.map((category) => ({
        slug: category,
        name: categoryNames[category] || category,
      }))
    },
    subcategories() {
      return this.activeCategory
        ? this.catalogStore.getSubcategoriesByCategory(this.activeCategory).map((subcategory) => ({
            slug: subcategory,
            name: categoryNames[subcategory] || subcategory,
          }))
        : []
    },
  },
  methods: {
    closePopup() {
      this.$emit('update:open', false)
      this.activeCategory = null
    },
    setActiveCategory(category) {
      this.activeCategory = category
    },
  },
}
</script>

<style lang="scss">
.menu {
  width: 100vw;
  height: 100%;
  flex-grow: 1;

  &__overlay {
    z-index: 100;
    width: 100%;
    height: calc(100vh - 120px);
    background-color: var(--grey-300);
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
  }

  &__body {
    // max-width: 50vw;
    width: auto;
    max-height: calc(100vh - 132px);
    height: 100%;
    padding: 32px 24px 28px 40px;
    background-color: var(--white);
    border-radius: 0 10px 10px 0;
    display: flex;
    gap: 32px;
    transition: width 0.5s;
  }

  &__left {
    width: 23vw;
  }

  &__left-title {
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 20px;
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

    a {
      text-decoration: none;
      color: var(--black);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    p {
      margin: 0;
      font-weight: 500;
      font-size: 14px;
    }

    span {
      width: 10px;
      height: 8px;
      transform: rotate(-90deg);
    }

    &.active {
      background-color: var(--blue-0);
    }
  }

  &__right {
    width: 25vw;
    padding-top: 42px;
    transition: 0.3s;

    a {
      text-decoration: none;
      color: var(--black);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__right-item {
    border-bottom: 1px solid var(--blue-0);
    padding: 12px;
    cursor: pointer;

    p {
      margin: 0;
      font-size: 14px;
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
</style>
