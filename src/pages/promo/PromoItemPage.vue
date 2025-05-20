<template>
  <BaseEventItemPage
    :item="promo"
    :event-items="allPromo"
    :exclude-id="$route.params.id"
    :theme="'promo'"
    event-title="Другие акции"
  >
    <template #event-card="{ item }">
      <PromoCard :promo="item" :is-first="true" />
    </template>
  </BaseEventItemPage>
</template>

<script>
import { usePromoStore } from '@/shared/stores/promo.js'
import BaseEventItemPage from '@/shared/layouts/BaseEventItemPage.vue'
import PromoCard from '@/entities/promo/PromoCard.vue'

export default {
  name: 'PromoItemPage',
  components: {
    BaseEventItemPage,
    PromoCard,
  },
  computed: {
    allPromo() {
      return usePromoStore().getPromo
    },
    promo() {
      const promoStore = usePromoStore()
      const promoId = this.$route.params.id
      return promoStore.getPromoById(promoId)
    },
  },
  created() {
    const promoStore = usePromoStore()
    if (!promoStore.promo.length) {
      promoStore.loadPromo()
    }
  },
}
</script>

<style lang="scss">
// .promo-page {
//   &__content {
//     margin-top: 60px;
//     display: flex;
//     justify-content: space-between;
//     gap: 20px;
//   }

//   &__img {
//     max-width: 550px;
//     width: 100%;

//     img {
//       width: 100%;
//       object-fit: cover;
//       object-position: center;
//     }
//   }

//   &__text {
//     max-width: 50%;
//     font-size: 14px;
//   }
// }

// .additional {
//   margin-bottom: var(--section-offset);
//   margin-top: 32px;
//   display: flex;
//   justify-content: space-between;
//   gap: 20px;

//   .other-items {
//     margin-top: 28px;
//   }
// }
</style>
