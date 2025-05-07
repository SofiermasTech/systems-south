<template>
  <div class="accordion" :class="{ opened: isOpen(index) }" v-for="(item, index) in items" :key="index">
    <div class="accordion__heading" @click="openAnswer(index)">
      <h2>{{ item.title }}</h2>
      <button class="base-button-heading" :class="{ opened: isOpen(index) }">
        <BaseIcon name="SelectArrowIcon" />
      </button>
    </div>
    <div class="accordion__content" v-if="isOpen(index)">
      <p>{{ item.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseAccordion',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      openIndex: null,
    }
  },
  methods: {
    openAnswer(index) {
      this.openIndex = this.openIndex === index ? null : index
    },
    isOpen(index) {
      return this.openIndex === index
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
