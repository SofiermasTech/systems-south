<template>
  <div class="accordion" :class="[customClass, { opened: isOpen }]" :id="`accordion-${id}`">
    <div class="accordion__heading" @click="toggleItem" :id="`accordion-heading-${id}`">
      <slot name="titles" :item="item" />
      <button class="base-button-heading" :class="{ opened: isOpen }">
        <BaseIcon name="SelectArrowIcon" />
      </button>
    </div>
    <div class="accordion__content" v-if="isOpen" :id="`accordion-content-${id}`">
      <slot name="content" :item="item" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseAccordion',
  props: {
    item: {
      type: Object,
      required: true,
    },
    id: {
      type: [String, Number],
      required: true,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  components: {},
  data() {
    return {
      // openIndex: null,
      isOpen: false,
    }
  },
  methods: {
    // openAnswer(index) {
    //   this.openIndex = this.openIndex === index ? null : index
    // },
    toggleItem() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss">
.accordion {
  width: 100%;
  border: 1px solid var(--blue-200);
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &.opened {
    background-color: var(--blue-0);
    border-color: var(--blue-0);
  }

  &__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    h2 {
      margin: 0;
      font-weight: 500;
      font-size: 32px;
      line-height: 110%;
      letter-spacing: -0.04em;
      color: var(--blue);
    }
  }

  &__content {
    margin-right: 5%;
  }
}
.base-button-heading {
  border: 1px solid var(--blue-100);
  background-color: var(--white);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.opened {
    transform: rotate(180deg);
  }

  svg {
    width: 10px;
    height: 8px;
  }
}
</style>
