<template>
  <div class="sort-panel">
    <p class="sort-panel__title" @click="toggleList">
      <span>Сортировать по</span>
      <span class="sort-panel__title-dot">:</span>
      <span class="sort-panel__title-arrow" :class="{ open: isListOpen }">
        <BaseIcon name="SelectArrowIcon" />
      </span>
    </p>
    <ul class="sort-panel__list" v-if="windowWidth > 600 || isListOpen">
      <li
        class="sort-panel__item"
        :class="{ active: activeSort === 'cheap-first' }"
        @click="setSort('cheap-first')"
      >
        <button type="button">Сначала дешевые</button>
      </li>
      <li
        class="sort-panel__item"
        :class="{ active: activeSort === 'expensive-first' }"
        @click="setSort('expensive-first')"
      >
        <button type="button">Сначала дорогие</button>
      </li>
      <li
        class="sort-panel__item"
        :class="{ active: activeSort === 'in-stock' }"
        @click="setSort('in-stock')"
      >
        <button type="button">В наличии</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  emits: ['sort-change'],
  data() {
    return {
      activeSort: 'cheap-first',
      isListOpen: false,
      windowWidth: window.innerWidth,
    }
  },
  methods: {
    setSort(sortType) {
      this.activeSort = sortType
      this.$emit('sort-change', sortType)

      if (this.windowWidth < 600) {
        this.isListOpen = false
      }
    },
    toggleList() {
      this.isListOpen = !this.isListOpen
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateWindowWidth)
    this.updateWindowWidth()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/utils.scss';

.sort-panel {
  display: flex;
  align-items: center;
  gap: 20px;

  @include tablet {
    gap: 12px;
  }

  &__title {
    font-weight: 500;
    @include fluid-text(16, 10);
    color: var(--grey-200);
    display: flex;
    align-items: center;

    @include mobile {
      color: var(--black);
      gap: 8px;
    }
  }

  &__title-dot {
    @include mobile {
      display: none;
    }
  }

  &__title-arrow {
    display: none;

    @include mobile {
      margin-top: 1px;
      display: inline-flex;
      width: 6px;
      height: 6px;
      transform: rotate(0);

      &.open {
        transform: rotate(-180deg);
      }
    }
  }

  &__list {
    display: flex;
    align-items: center;
    gap: 20px;

    @include laptop {
      gap: 16px;
    }

    @include tablet {
      gap: 12px;
    }

    @include mobile {
      width: fit-content;
      padding: 10px 24px;
      flex-direction: column;
      align-items: flex-start;
      background-color: var(--white);
      border: 1px solid var(--blue-100);
      border-radius: 6px;
      position: absolute;
      bottom: calc(-100% + -36px);
      right: 0;
      z-index: 99;
    }
  }

  &__item {
    @include mobile {
    }
    button {
      background-color: transparent;
      border: none;
      font-weight: 500;
      @include fluid-text(16, 10);
      color: var(--grey-200);
    }

    &.active {
      button {
        color: var(--black);
      }
    }
  }
}
</style>
