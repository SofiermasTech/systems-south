<template>
  <div class="event-item-page" :class="`event-item-page--${theme}`">
    <!-- <BaseTimer v-if="isPromoItemPage" :promo="item" /> -->
    <IntroPages :title="item.title" :item="item" />
    <section class="event-item-page__body container">
      <div class="event-item-page__content">
        <div class="event-item-page__img">
          <img :src="item.image" alt="" />
        </div>
        <SubscribeEmail />
      </div>
      <div class="additional">
        <div class="event-item-page__text">
          <p class="event-item-page__text-accent" v-if="isPromoItemPage">
            Акция действует до {{ formatDate(item.date) }}
          </p>
          <p>{{ item.description1 }}</p>
          <p>{{ item.description2 }}</p>
          <p>{{ item.description3 }}</p>
          <p>{{ item.description4 }}</p>
        </div>
        <SliderOtherItems :items="eventItems" :exclude-id="excludeId" :title="eventTitle">
          <template #default="{ item }">
            <slot name="event-card" :item="item"></slot>
          </template>
        </SliderOtherItems>
      </div>
    </section>
  </div>

  <CallbackSection />
</template>

<script>
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import SliderOtherItems from '@/shared/ui/SliderOtherItems.vue'
import SubscribeEmail from '@/widgets/subscribe-email/SubscribeEmail.vue'
import CallbackSection from '@/widgets/callback-section/CallbackSection.vue'
// import BaseTimer from '@/shared/ui/BaseTimer.vue'

export default {
  name: 'BaseEventItemPage',
  components: {
    IntroPages,
    SliderOtherItems,
    SubscribeEmail,
    CallbackSection,
    // BaseTimer,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    eventItems: {
      type: Array,
      required: true,
      default: () => [],
    },
    excludeId: {
      type: [String, Number],
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    eventTitle: {
      type: String,
      default: 'Другие элементы',
    },
    theme: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    isPromoItemPage() {
      return this.theme === 'promo'
    },
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr)
      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const year = date.getFullYear()
      return `${day}.${month}.${year}`
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.event-item-page {
  position: relative;
  &__body {
    margin-top: clamp(30px, 3.5vw, 70px);
    display: grid;
    grid-template-columns: 1fr 1fr;

    @include mobile {
      grid-template-columns: 1fr;
      grid-template-areas:
        'img'
        'text'
        'email'
        'slider';
    }
    gap: 30px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-right: clamp(56px, 10vw, 200px);

    @include mobile {
      display: contents;
    }
  }

  &__img {
    border-radius: var(--br-block);
    width: 100%;

    @include mobile {
      grid-area: img;
    }

    img {
      max-height: clamp(200px, 25vw, 475px);
      max-width: clamp(315px, 33vw, 660px);
      width: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: var(--br-block);

      @include mobile {
        max-width: clamp(315px, 92vw, 560px);
      }
    }
  }

  &__text {
    @include fluid-text(14, 10);

    p {
      margin-bottom: clamp(12px, 1vw, 20px);
    }

    @include mobile {
      font-size: 12px;
      grid-area: text;
      max-width: clamp(315px, 92vw, 560px);
    }
  }

  &__text-accent {
    font-weight: 600;
  }

  .subscribe {
    @include mobile {
      max-width: clamp(315px, 92vw, 560px);
      grid-area: email;
    }
  }
}

.additional {
  margin-bottom: var(--section-offset);
  display: flex;
  flex-direction: column;
  gap: clamp(45px, 6vw, 120px);

  @include mobile {
    display: contents;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .other-items {
    @include mobile {
      margin-bottom: 60px;
      margin-top: 60px;
      grid-area: slider;
    }
  }
}
</style>
