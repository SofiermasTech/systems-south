<template>
  <address class="header-address">
    <p class="header-address__wrap">
      <span class="header-address__icon">
        <BaseIcon name="LocationIcon" />
      </span>
      <span>Краснодар, ул. Солнечная, д. 4/Б, пом. 14/1</span>
    </p>
    <time datetime="T10:00-18:00">Ежедневно с 9:00 по 18:00</time>
  </address>
</template>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.header-address {
  font-weight: 600;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 20px;

  @include laptop-bottom {
    font-size: 10px;
    gap: 12px;
  }

  &__wrap {
    display: flex;
    align-items: center;
    gap: 4px;

    p {
      margin-bottom: 0;
    }
  }

  &__icon {
    width: 20px;
    height: 20px;

    @include laptop-bottom {
      width: 16px;
      height: 16px;
    }

    svg {
      width: 13px;
      height: 16px;
    }
  }
}
</style>
