<template>
  <div class="event-item-page container" :class="`event-item-page--${theme}`">
    <IntroPages :title="item.title" />
    <section class="event-item-page__content">
      <div class="event-item-page__img">
        <img :src="item.image" alt="" />
      </div>
      <div class="event-item-page__text">
        <p class="event-item-page__text-accent" v-if="isPromoPage">
          Акция действует до {{ item.date }}
        </p>
        <p>{{ item.description1 }}</p>
        <p>{{ item.description2 }}</p>
        <p>{{ item.description3 }}</p>
        <p>{{ item.description4 }}</p>
      </div>
    </section>
  </div>
  <section class="additional container">
    <SubscribeEmail />
    <SliderOtherItems :items="eventItems" :exclude-id="excludeId" :title="eventTitle">
      <template #default="{ item }">
        <slot name="event-card" :item="item"></slot>
      </template>
    </SliderOtherItems>
  </section>
  <CallbackSection />
</template>

<script>
import IntroPages from '@widgets/intro-pages/IntroPages.vue'
import SliderOtherItems from '@/shared/ui/SliderOtherItems.vue'
import SubscribeEmail from '@/widgets/subscribeEmail/SubscribeEmail.vue'
import CallbackSection from '@/widgets/callbackSection/CallbackSection.vue'

export default {
  name: 'BaseEventItemPage',
  components: {
    IntroPages,
    SliderOtherItems,
    SubscribeEmail,
    CallbackSection,
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
    isPromoPage() {
      return this.$route.path.startsWith('/promo/')
    },
  },
}
</script>

<style lang="scss">
.event-item-page {
  &__content {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  &__img {
    max-width: 550px;
    width: 100%;

    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__text {
    max-width: 50%;
    font-size: 14px;
  }

  &__text-accent {
    margin-bottom: 20px;
    font-weight: 600;
  }
}

.additional {
  margin-bottom: var(--section-offset);
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  .other-items {
    margin-top: 28px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
}
</style>
