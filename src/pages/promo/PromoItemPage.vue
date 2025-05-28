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

<style lang="scss"></style>
