<template>
  <section class="menu-mob">
    <div class="container">
      <div class="menu-mob__btns">
        <BaseButtonMenu />
        <CatalogButton :active="this.popupStore.currentPopupName === 'menu'" />
        <BaseButtonSearch />
        <UserActions
          :favorites-count="favoritesCount"
          :isOpen="this.popupStore.currentPopupName === 'CartPopup'"
        />
      </div>
    </div>
  </section>
</template>

<script>
import CatalogButton from '@widgets/header/ui/CatalogButton.vue'
import UserActions from '@widgets/header/ui/UserActions.vue'
import BaseButtonMenu from '@/shared/ui/BaseButtonMenu.vue'
import BaseButtonSearch from '@/shared/ui/BaseButtonSearch.vue'
import { useFavoritesStore } from '@/shared/stores/favorites.js'
import { usePopupStore } from '@/shared/stores/popup.js'

export default {
  name: 'HeaderApp',
  components: {
    CatalogButton,
    UserActions,
    BaseButtonMenu,
    BaseButtonSearch,
  },
  data() {
    return {
      favoritesStore: useFavoritesStore(),
      popupStore: usePopupStore(),
    }
  },
  computed: {
    favoritesCount() {
      return this.favoritesStore ? this.favoritesStore.favoritesCount : 0
    },
  },
}
</script>

<style lang="scss">
.menu-mob {
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 222;
  padding-block: 10px;
  border-radius: 16px;
  border: 1px solid var(--grey-100);
  background-color: var(--blue-0);
  display: none;

  @media screen and (max-width: 720px) {
    display: block;
  }

  &__btns {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 50px;
  }

  .user-actions {
    grid-column: span 3;
  }

  .btn-search-mob {
    background-color: var(--white);
    border: 1px solid var(--grey-100);
    border-radius: var(--br-btn);
  }
}
</style>
