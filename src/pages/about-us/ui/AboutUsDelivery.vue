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
.delivery {
  padding-block: clamp(40px, 12vh, 120px);
  background-color: var(--white);

  &__body {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__title {
    &.h2 {
      max-width: 45%;
    }
  }

  &__img {
    max-width: 70%;
    width: 100%;
    margin-inline: auto;

    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
