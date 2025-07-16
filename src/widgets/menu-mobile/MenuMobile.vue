<template>
  <section class="menu-mob">
    <div class="container">
      <div class="menu-mob__btns">
        <BaseButtonMenu
          :isOpen="this.popupStore.currentPopupName === 'MenuNavMobile'"
          :isActive="isPageForMenuBtn"
        />
        <CatalogButton
          :isOpen="this.popupStore.currentPopupName === 'menu'"
          :isActive="isPageForCatalogBtn"
        />
        <BaseButtonSearch
          @click="toggleSearchField"
          :isOpen="
            this.popupStore.currentPopupName === 'searchMob' ||
            this.popupStore.currentPopupName === 'search'
          "
          :isActive="isPageForSearchBtn"
        />
        <UserActions
          :favorites-count="favoritesCount"
          :isOpen="this.popupStore.currentPopupName === 'CartPopup'"
          :isActive="isPageForCartBtn"
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
    isPageForMenuBtn() {
      return (
        this.$route.path.startsWith('/promo') ||
        this.$route.path.startsWith('/news') ||
        this.$route.path.startsWith('/contacts') ||
        this.$route.path.startsWith('/faq') ||
        this.$route.path.startsWith('/about-us') ||
        this.$route.name === 'HomePage'
      )
    },
    isPageForCatalogBtn() {
      return (
        this.$route.path.startsWith('/catalog') ||
        this.$route.path.startsWith('/product') ||
        this.$route.path.startsWith('/order')
      )
    },
    isPageForCartBtn() {
      return this.$route.path.startsWith('/cart')
    },
    isPageForSearchBtn() {
      return this.$route.path.startsWith('/search')
    },
  },
  methods: {
    toggleSearchField() {
      if (this.popupStore.currentPopupName === 'searchMob') {
        this.popupStore.hidePopup()
      } else if (
        this.popupStore.currentPopupName === 'searchMob' ||
        this.popupStore.currentPopupName === 'search'
      ) {
        this.popupStore.hidePopup()
      } else {
        setTimeout(() => {
          this.popupStore.showPopup('searchMob', {})
        }, 100)
      }
    },
    // closeSearchField() {
    //   this.popupStore.hidePopup('searchMob', { isOpen: false })
    //   this.searchQuery = ''
    // },
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
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
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
    align-items: stretch;
    justify-items: stretch;
  }

  .btn-menu,
  .btn-catalog,
  .btn-search-mob {
    &.active-page {
      @media screen and (max-width: 720px) {
        background-color: var(--blue);
        border: 1px solid var(--blue);

        svg {
          color: var(--white);
        }
      }
    }
    &.active-open {
      @media screen and (max-width: 720px) {
        background-color: transparent;
        border: 1px solid var(--blue);

        svg {
          color: var(--blue);
        }
      }
    }
  }

  // .btn-catalog {
  //   &.active-page {
  //     @media screen and (max-width: 720px) {
  //       background-color: var(--blue);
  //       border: 1px solid var(--blue);

  //       svg {
  //         color: var(--white);
  //       }
  //     }
  //   }
  //   &.active-open {
  //     @media screen and (max-width: 720px) {
  //       background-color: transparent;
  //       border: 1px solid var(--blue);

  //       svg {
  //         color: var(--blue);
  //       }
  //     }
  //   }
  // }

  .user-actions {
    grid-column: span 3;
  }

  .header-search {
    width: 100%;
    height: 50px;
    align-content: stretch;
  }

  .btn-search-mob {
    height: 50px;
    background-color: var(--white);
    border: 1px solid var(--grey-100);
    border-radius: var(--br-btn);

    &.active {
      @media screen and (max-width: 720px) {
        background-color: var(--blue);

        svg {
          color: var(--white);
        }
      }
    }
  }
}
</style>
