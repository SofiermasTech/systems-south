<template>
  <button class="btn-filters" type="button">
    <BaseIcon name="FilterIcon" />
  </button>
</template>

<script>
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'BaseButtonFilters',
  components: {},
  data() {
    return {
      popupStore: usePopupStore(),
    }
  },
  methods: {},
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.btn-filters {
  background-color: var(--white);
  border: 1px solid #c9ddea;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  @include mobile {
    width: 36px;
    height: 36px;
  }

  svg {
    width: 16px;
    height: 16px;

    @include mobile {
      width: 11px;
      height: 11px;
    }
  }
}
</style>
