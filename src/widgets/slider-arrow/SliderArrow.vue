<template>
  <div class="slider-arrow">
    <button
      :class="[
        'slider-arrow__item',
        `slider-arrow__item--left-${uniqueId}`,
        { 'slider-arrow__item--disabled': isBeginning },
      ]"
      :disabled="isBeginning"
      name="Move to previous slide"
      @click="swiper?.slidePrev()"
      style="transform: rotate(90deg)"
    >
      <BaseIcon name="SelectArrowIcon" />
    </button>
    <button
      :class="[
        'slider-arrow__item',
        `slider-arrow__item--right-${uniqueId}`,
        { 'slider-arrow__item--disabled': isEnd },
      ]"
      :disabled="isEnd"
      name="Move to next slide"
      @click="swiper?.slideNext()"
      style="transform: rotate(-90deg)"
    >
      <BaseIcon name="SelectArrowIcon" />
    </button>
  </div>
</template>
<script>
export default {
  name: 'SliderArrow',
  props: {
    swiper: {
      type: Object,
      default: null,
    },
    isBeginning: {
      type: Boolean,
      default: true,
    },
    isEnd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uniqueId: Math.random().toString(36).substring(2, 9),
    }
  },
}
</script>
<style lang="scss">
.slider-arrow {
  display: flex;
  &__item {
    background-color: var(--white);
    border: 1px solid var(--grey-100);
    border-radius: 50%;
    padding: 12px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
      width: 8px;
      height: 7px;
    }

    &--disabled {
      background-color: var(--blue-100);
      cursor: not-allowed;

      svg {
        color: var(--blue-200);
      }
    }
  }
}

// [class*='slider-arrow__item-'] {
//   background-color: var(--white);
//   border: 1px solid var(--grey-100);
//   border-radius: 50%;
//   padding: 12px;
//   width: 40px;
//   height: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;

//   svg {
//     width: 8px;
//     height: 7px;
//   }
// }
</style>
