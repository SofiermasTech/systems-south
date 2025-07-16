<template>
  <section class="delivery">
    <div class="delivery__body container">
      <h2 class="delivery__title h2">Доставляем по&nbsp;России и&nbsp;странам СНГ</h2>
      <div class="delivery__img">
        <img
          src="@/assets/images/delivery-map.svg"
          alt=""
          width="1105"
          height="617"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script></script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.delivery {
  padding-block: clamp(40px, 6vw, 120px);
  background-color: var(--white);

  &__body {
    display: flex;
    flex-direction: column;
    gap: 40px;

    @include tablet-bottom {
      gap: 24px;
    }
  }

  &__title {
    &.h2 {
      max-width: 40%;
      @include fluid-text(56, 24);

      @include tablet {
        max-width: 50%;
      }

      @include mobile {
        font-size: 32px;
        max-width: 80%;
      }

      @include mobile-bottom {
        max-width: 100%;
      }
    }
  }

  &__img {
    max-width: 70%;
    width: 100%;
    margin-inline: auto;

    @include tablet {
      max-width: 85%;
    }

    @include mobile {
      max-width: 100%;
    }

    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
