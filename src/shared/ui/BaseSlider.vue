<template>
  <div class="base-slider">
    <swiper ref="swiper" v-bind="swiperOptions" @swiper="onSwiper" @slide-change="updateNavigation">
      <!-- Слайды -->
      <swiper-slide v-for="(item, index) in slides" :key="index" class="base-slider__slide">
        <slot :item="item" :index="index"></slot>
      </swiper-slide>

      <!-- Кнопки навигации -->

      <!-- Пагинация -->
      <div
        v-if="swiperOptions.pagination"
        :class="`swiper-pagination swiper-pagination-${uniqueId}`"
      ></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

// Импортируй стили Swiper
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default {
  name: 'BaseSlider',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    slides: {
      type: Array,
      required: true,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      swiper: null,
      isBeginning: true,
      isEnd: false,
      uniqueId: Math.random().toString(36).substring(2, 9),
      defaultOptions: {
        modules: [Pagination, Navigation, Autoplay],
        loop: true,
        slidesPerView: 4,
        spaceBetween: 8,
        pagination: {
          el: `.swiper-pagination-${this.uniqueId}`,
          clickable: true,
          type: 'bullets',
        },
        navigation: {
          nextEl: '',
          prevEl: '',
        },
        autoplay: {
          delay: false,
          disableOnInteraction: false,
        },
      },
    }
  },
  computed: {
    swiperOptions() {
      const options = { ...this.defaultOptions, ...this.options }
      if (options.pagination) {
        options.pagination.el = `.swiper-pagination-${this.uniqueId}`
        options.pagination.type = options.pagination.type || 'bullets'
      }
      if (options.navigation) {
        options.navigation.nextEl = `.slider-arrow__item--right-${this.uniqueId}`
        options.navigation.prevEl = `.slider-arrow__item--left-${this.uniqueId}`
      }
      return options
    },
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper
      this.updateNavigation()
      this.$emit('swiper-ready', swiper)
    },
    updateNavigation() {
      if (this.swiper) {
        this.isBeginning = this.swiper.isBeginning
        this.isEnd = this.swiper.isEnd
        this.$emit('navigation-update', {
          isBeginning: this.isBeginning,
          isEnd: this.isEnd,
        })
      }
    },
  },
}
</script>

<style lang="scss">
.base-slider {
  .swiper-wrapper {
    display: flex;
    align-items: stretch;
    box-sizing: border-box;
  }

  .swiper-slide {
    // width: 100% !important;
    height: auto;
  }
}
</style>
