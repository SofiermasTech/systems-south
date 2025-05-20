<template>
  <div class="event-page container" :class="`event-page--${theme}`">
    <IntroPages />
    <section class="event-page__latest">
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
    <section class="event-page__archive">
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
import CallbackSection from '@/widgets/callbackSection/CallbackSection.vue'

export default {
  name: 'BaseEventPage',
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
  components: {
    IntroPages,
    CallbackSection,
  },
  emits: ['set-filter'],
}
</script>

<style lang="scss">
.event-page {
  &__latest {
    margin-top: 60px;
    margin-bottom: var(--section-offset);
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__latest-top {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__latest-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 400px;
    grid-auto-rows: 400px;
    gap: 16px;
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
    grid-template-rows: 400px;
    grid-auto-rows: 400px;
    gap: 16px;

    .news-card {
      grid-column: span 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  &--promo {
    .event-page__latest-content,
    .event-page__archive-content {
      grid-template-rows: 490px;
      grid-auto-rows: 490px;
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
    font-size: 16px;
  }

  &__count {
    background-color: var(--blue-100);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
