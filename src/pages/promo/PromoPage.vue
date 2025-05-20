<template>
  <BaseEventPage
    :items="allPromo"
    :archive-items="getPromoArchive"
    :filter="filter"
    :filters="filters"
    title="Акции"
    archive-title="Прошедшие"
    theme="promo"
    @set-filter="setFilter"
    :counts="filterCounts"
  >
    <template #card-item="{ item }">
      <PromoCard :promo="item" :is-first="false"/>
    </template>
    <template #archive-card="{ item }">
      <PromoCard :promo="item" />
    </template>
  </BaseEventPage>
</template>

<script>
import { usePromoStore } from '@/shared/stores/promo.js'
import PromoCard from '@/entities/promo/PromoCard.vue'
import BaseEventPage from '@/shared/layouts/BaseEventPage.vue'

export default {
  name: 'PromoPage',
  components: {
    BaseEventPage,
    PromoCard,
  },
  data() {
    return {
      filters: [
        { value: 'all', label: 'Все' },
        { value: 'new', label: 'Новые' },
        { value: 'soon', label: 'Скоро закончатся' },
      ],
    }
  },
  computed: {
    allPromo() {
      const promoStore = usePromoStore()
      return promoStore.getPromo
    },
    filter() {
      return usePromoStore().filter
    },
    getPromoArchive() {
      return usePromoStore().getPromoArchive
    },
    filterCounts() {
      const counts = {}
      this.filters.forEach((f) => {
        counts[f.value] = this.getPromoCount(f.value)
      })
      return counts
    },
  },
  methods: {
    setFilter(filter) {
      usePromoStore().setFilter(filter)
    },
    getPromoCount(filter) {
      return usePromoStore().getPromoCount(filter)
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
