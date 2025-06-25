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
.other-items {
  max-width: 50%;

  &__top {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  &__title {
    font-weight: 500;
    font-size: 48px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
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
    gap: 32px;

    &__date {
      align-self: flex-end;
    }
  }

  .promo-card__img {
    img {
      max-height: 300px;
      height: 300px;
    }
  }
}
</style>
