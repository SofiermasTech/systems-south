<template>
  <section class="other-items">
    <div class="other-items__top">
      <h2 class="other-items__title">{{ title }}</h2>
      <SliderArrow :swiper="otherSwiper" :is-beginning="otherIsBeginning" :is-end="otherIsEnd" />
    </div>
    <div class="other-items__content" v-if="filteredItems.length">
      <BaseSlider
        :slides="filteredItems"
        :options="otherOptions"
        @swiper-ready="onSwiper"
        @navigation-update="updateNavigation"
      >
        <template #default="{ item }">
          <slot :item="item"></slot>
        </template>
      </BaseSlider>
    </div>
    <div v-else class="other-items__empty">
      <p>Нет других элементов</p>
    </div>
  </section>
</template>

<script>
import BaseSlider from '@/shared/ui/BaseSlider.vue'
import SliderArrow from '@widgets/slider-arrow/SliderArrow.vue'

export default {
  name: 'SliderOtherItems',
  components: {
    BaseSlider,
    SliderArrow,
  },
  props: {
    items: {
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
      default: 'Еще',
    },
  },
  data() {
    return {
      otherSwiper: null,
      otherIsBeginning: true,
      otherIsEnd: false,
      otherOptions: {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 8,
        autoplay: false,
        pagination: false,
      },
    }
  },
  computed: {
    filteredItems() {
      if (!this.excludeId) return this.items
      return this.items.filter((item) => item.id !== this.excludeId)
    },
  },
  methods: {
    onSwiper(swiper) {
      this.otherSwiper = swiper
    },
    updateNavigation({ isBeginning, isEnd }) {
      this.otherIsBeginning = isBeginning
      this.otherIsEnd = isEnd
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.other-items {
  max-width: 100%;

  &__top {
    margin-bottom: clamp(28px, 2vw, 40px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  &__title {
    font-weight: 500;
    @include fluid-text(56, 24);
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);

    @include mobile {
      font-size: 32px;
    }
  }

  &__content {
  }

  .promo-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'title img'
      'subtitle img'
      'date img';
    gap: clamp(14px, 2.5vw, 32px);

    @include tablet-bottom {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto 100px;
      grid-template-areas:
        'title'
        'subtitle'
        'date'
        'img';
    }

    &__date {
      align-self: flex-end;
    }
  }

  .promo-card__img {
    height: 100%;

    @include tablet-bottom {
      grid-row: span 1;
    }
    img {
      max-height: clamp(200px, 16vw, 320px);
      height: 100%;

      @include tablet-bottom {
        max-height: 100px;
      }
    }
  }
}
</style>
