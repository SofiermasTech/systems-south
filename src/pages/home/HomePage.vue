<template>
  <HomeHero />
  <HomePopularCat />
  <ProductSection
    :title="newProductsTitle"
    filter-type="new"
    @toggle-favorite="handleToggleFavorite"
    style="margin-bottom: 16px"
  />
  <ProductSection
    :title="bestOffersTitle"
    filter-type="best"
    @toggle-favorite="handleToggleFavorite"
  />
  <HomeWorkWithUs />
  <HomeAboutUs />
  <CallbackSection />
  <HomeNews />
</template>

<script>
import HomeHero from '@/pages/home/ui/HomeHero.vue'
import HomePopularCat from '@/pages/home/ui/HomePopularCat.vue'
import ProductSection from '@widgets/product-section/ProductSection.vue'
import HomeWorkWithUs from '@/pages/home/ui/HomeWorkWithUs.vue'
import HomeAboutUs from '@/pages/home/ui/HomeAboutUs.vue'
import CallbackSection from '@/widgets/callback-section/CallbackSection.vue'
import HomeNews from '@/pages/home/ui/HomeNews.vue'
import { useFavoritesStore } from '@/shared/stores/favorites.js'
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'HomePage',
  components: {
    HomeHero,
    HomePopularCat,
    ProductSection,
    HomeWorkWithUs,
    HomeAboutUs,
    CallbackSection,
    HomeNews,
  },
  data() {
    return {
      newProductsTitle: 'Новые товары',
      bestOffersTitle: 'Лучшие предложения',
      catalogStore: null,
      favoritesStore: useFavoritesStore(),
      popupStore: usePopupStore(),
    }
  },
  methods: {
    handleToggleFavorite(product) {
      const message = this.favoritesStore.isFavorite(product.id)
        ? 'Товар добавлен в избранное'
        : 'Товар удалён из избранного'
      console.log(`Товар ${product.name} ${message}`)
    },
  },
  mounted() {
    if (this.$route.query.emailConfirmed === 'true') {
      console.log('[HomePage] Showing BaseSuccessPopup in success mode')
      this.popupStore.showPopup('BaseSuccessPopup', {
        isVisible: true,
        title: 'Данные успешно изменены',
      })
    }
  },
}
</script>
<style lang="scss"></style>
