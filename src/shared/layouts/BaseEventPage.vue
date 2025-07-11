<template>
  <div class="event-page" :class="`event-page--${theme}`">
    <IntroPages />
    <section class="event-page__latest container">
      <div class="event-page__latest-top">
        <button
          v-for="f in filters"
          :key="f.value"
          class="base-button-tab"
          :class="{ active: filter === f.value }"
          @click="$emit('set-filter', f.value)"
          type="button"
        >
          <span class="base-button-tab__text">{{ f.label }}</span>
          <span class="base-button-tab__count">{{ counts[f.value] }}</span>
        </button>
      </div>
      <div class="event-page__latest-content">
        <slot
          name="card-item"
          v-for="(item, index) in items"
          :item="item"
          :is-first="index === 0"
        ></slot>
      </div>
    </section>
    <section class="event-page__archive container">
      <h2 class="event-page__archive-title h2">{{ archiveTitle }}</h2>
      <div class="event-page__archive-content">
        <slot
          name="archive-card"
          v-for="item in archiveItems"
          :item="item"
          :is-first="false"
        ></slot>
      </div>
    </section>
  </div>
  <CallbackSection />
</template>

<script>
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import CallbackSection from '@/widgets/callback-section/CallbackSection.vue'

export default {
  name: 'BaseEventPage',
  components: {
    IntroPages,
    CallbackSection,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    archiveItems: {
      type: Array,
      required: true,
      default: () => [],
    },
    filter: {
      type: String,
      default: 'all',
    },
    filters: {
      type: Array,
      default: () => [
        { value: 'all', label: 'Все' },
        { value: 'new', label: 'Новые' },
        { value: 'soon', label: 'Скоро закончатся' },
      ],
    },
    title: {
      type: String,
      default: 'Элементы',
    },
    archiveTitle: {
      type: String,
      default: 'Архив',
    },
    theme: {
      type: String,
      default: 'default',
    },
    counts: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['set-filter'],
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.event-page {
  &__latest {
    margin-top: clamp(30px, 3.5vw, 70px);
    margin-bottom: var(--section-offset);
    display: flex;
    flex-direction: column;
    gap: 36px;

    @include tablet {
      gap: 30px;
    }
  }

  &__latest-top {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__latest-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: clamp(240px, 25vw, 450px);
    grid-auto-rows: clamp(240px, 25vw, 450px);
    gap: 16px;

    @include laptop-bottom {
      gap: 8px;
    }

    @include tablet-bottom {
      grid-template-columns: repeat(3, 1fr);
    }

    @include mobile {
      grid-template-columns: 1fr;
      grid-template-rows: 215px;
      grid-auto-rows: 215px;
    }
  }

  &__archive {
    margin-bottom: var(--section-offset);
  }

  &__archive-title {
    margin-bottom: 40px;
  }

  &__archive-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: clamp(240x, 23vw, 450px);
    grid-auto-rows: clamp(240px, 23vw, 450px);
    gap: 16px;

    @include laptop-bottom {
      gap: 8px;
    }

    @include tablet-bottom {
      grid-template-columns: repeat(3, 1fr);
    }

    @include mobile {
      grid-template-columns: 1fr;
    }

    .news-card {
      grid-column: span 1;
      display: flex;
      flex-direction: column;
      gap: 20px;

      @include mobile {
        &:first-child {
          grid-row: span 1;
        }
      }
    }
  }

  &--promo {
    .event-page__latest-content,
    .event-page__archive-content {
      grid-template-rows: clamp(300px, 25vw, 475px);
      grid-auto-rows: clamp(300px, 25vw, 475px);

      @include mobile {
        grid-template-rows: 255px;
        grid-auto-rows: 255px;
      }
    }

    a {
      text-decoration: none;
      color: inherit;
    }
  }
}

.base-button-tab {
  border: 1px solid var(--blue-100);
  background-color: transparent;
  border-radius: 500px;
  padding: 4px 4px 4px 16px;
  width: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  cursor: pointer;

  &.active {
    background-color: var(--blue-100);

    .base-button-tab__count {
      background-color: var(--blue);
      color: var(--white);
    }
  }

  &__text {
    font-weight: 500;
    @include fluid-text(16, 10);
  }

  &__count {
    background-color: var(--blue-100);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;

    @include laptop-bottom {
      width: 32px;
      height: 32px;
    }

    @include tablet-bottom {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
