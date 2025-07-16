<template>
  <article class="popup-card" :class="{ 'cart-card': isCartPage }">
    <div class="popup-card__img">
      <img
        :src="item.product.images[0]"
        :alt="item.product.name"
        loading="lazy"
        width="68"
        height="68"
      />
    </div>
    <div class="popup-card__info">
      <p class="popup-card__text">{{ item.product.name }}</p>
      <p class="popup-card__price">
        {{ (item.product.price * item.quantity).toLocaleString('ru-RU') }} ₽
      </p>
      <div class="popup-card__btn-wrapper">
        <ProductQuantity
          :class="{ 'popup-card__quantity': !isCartPage }"
          :product-id="item.id"
          :initial-quantity="item.quantity"
        />
        <button class="popup-card__btn-del" type="button" @click.stop="removeItem">
          <svg
            v-if="!isCartPage"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 22 22"
          >
            <path
              stroke="#9F9E9E"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M1.4 4.4h19.2M7.4.8h7.2m-6 15.6V9.2m4.8 7.2V9.2m1.8 12H6.8a2.4 2.4 0 0 1-2.4-2.4L3.852 5.65a1.2 1.2 0 0 1 1.2-1.25h11.897a1.2 1.2 0 0 1 1.199 1.25L17.6 18.8a2.4 2.4 0 0 1-2.4 2.4Z"
            />
          </svg>
          <span v-if="isCartPage" class="popup-card__btn-del popup-card__btn-del--text"
            >Удалить</span
          >
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import ProductQuantity from '@widgets/product-quantity/ProductQuantity.vue'

export default {
  components: {
    ProductQuantity,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isCartPage() {
      return this.$route.path.startsWith('/cart')
    },
  },
  methods: {
    removeItem() {
      this.$emit('remove', this.item.id)
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.popup-card {
  width: 100%;
  padding: 16px;
  border: 1px solid var(--blue-100);
  border-radius: var(--br-btn);
  display: flex;
  gap: 12px;

  @include tablet {
    padding: 12px;
  }

  @include mobile {
    padding: 8px;
  }

  &__img {
    flex-shrink: 0;
    border: 1px solid var(--blue-0);
    border-radius: 10px;
    width: 68px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      max-height: 68px;
      height: 100%;
      object-fit: contain;
      object-position: center;
      border-radius: 10px;
    }
  }

  &__info {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 16px;
  }

  &__text {
    grid-column: span 2;
    font-weight: 500;
    @include fluid-text(20, 10);
  }

  &__price {
    font-weight: 600;
    // @include fluid-text(48, 14);
    @include fluid-text(20, 12);
    color: var(--blue);
  }

  &__btn-wrapper {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 16px;

    @include tablet-bottom {
      gap: 8px;
    }
  }

  &__quantity {
    border: none;

    .product-quantity__btn {
      width: 24px;
      height: 24px;
      font-weight: 600;

      @include tablet-bottom {
        width: 20px;
        height: 20px;
      }
    }

    .product-quantity__value {
      font-weight: 600;
      font-size: 12px;

      @include tablet-bottom {
        font-size: 10px;
      }
    }
  }

  &__btn-del {
    flex-shrink: 0;
    padding: 0;
    width: fit-content;
    height: 20px;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--grey-200);

    svg {
      width: 20px;
      height: 20px;
    }

    &--text {
      @include fluid-text(16, 10);
      text-decoration: underline;
      text-underline-offset: 5px;
      text-decoration-skip-ink: none;
      text-align: center;
      color: var(--blue);
    }
  }

  &.cart-card {
    gap: 20px;

    .popup-card__info {
      grid-template-columns: 2.3fr 1fr;
      align-items: flex-start;
      gap: 16px;

      @include mobile {
        grid-template-areas:
          'name del'
          'count price';
      }
    }

    .popup-card__img {
      width: 110px;
      height: 110px;

      @include laptop {
        width: 90px;
        height: 90px;
      }

      @include mobile {
        width: 60px;
        height: 60px;
      }
    }

    .popup-card__text {
      grid-column: span 1;

      @include mobile {
        grid-area: name;
      }
    }

    .popup-card__price {
      justify-self: flex-end;
      @include fluid-text(24, 14);

      @include mobile {
        grid-area: price;
        align-self: center;
      }
    }

    .popup-card__btn-wrapper {
      grid-column: span 2;
      margin: 0;
      width: 100%;
      justify-content: space-between;
      align-items: flex-end;
      align-self: flex-end;

      @include mobile {
        display: contents;
      }
    }

    .product-quantity {
      max-width: clamp(130px, 8vw, 160px);
      width: 100%;

      @include mobile {
        grid-area: count;
      }
    }

    .popup-card__btn-del {
      @include mobile {
        grid-area: del;
        justify-self: end;
      }
    }
  }
}
</style>
