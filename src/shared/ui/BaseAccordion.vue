<template>
  <div class="accordion" :class="{ opened: isOpen(index) }" v-for="(item, index) in items" :key="index">
    <div class="accordion__heading" @click="openAnswer(index)">
      <h2>{{ item.title }}</h2>
      <button class="base-button-heading" :class="{ opened: isOpen(index) }">
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.75106 0.568657L1.25106 0.568657C1.17513 0.568919 1.1007 0.591956 1.03578 0.635289C0.970864 0.678622 0.917919 0.740608 0.882648 0.814577C0.847375 0.888546 0.831109 0.971697 0.835603 1.05508C0.840096 1.13846 0.865176 1.21891 0.908145 1.28778L4.65815 7.24612C4.81356 7.49316 5.18773 7.49316 5.34356 7.24612L9.09356 1.28778C9.13697 1.21906 9.16242 1.13856 9.16716 1.05504C9.1719 0.971523 9.15574 0.888172 9.12043 0.814046C9.08513 0.73992 9.03203 0.677854 8.96691 0.634592C8.90179 0.591329 8.82714 0.568526 8.75106 0.568657Z"
            fill="#242527"
          />
        </svg>
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
