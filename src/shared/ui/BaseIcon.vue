<template>
  <Component :is="icons[name]" />
</template>

<script>
import StickerSaleIcon from '@/shared/ui/icons/StickerSaleIcon.vue'
import ArrowUpRightIcon from '@/shared/ui/icons/ArrowUpRightIcon.vue'
import FavouriteIcon from '@/shared/ui/icons/FavouriteIcon.vue'
import CartIcon from '@/shared/ui/icons/CartIcon.vue'
import UserIcon from '@/shared/ui/icons/UserIcon.vue'
import SelectArrowIcon from '@/shared/ui/icons/SelectArrowIcon.vue'
import VerticalSortIcon from '@/shared/ui/icons/VerticalSortIcon.vue'
import HorizontalSortIcon from '@/shared/ui/icons/HorizontalSortIcon.vue'
import DocumentIcon from '@/shared/ui/icons/DocumentIcon.vue'
import GuaranteeIcon from '@/shared/ui/icons/GuaranteeIcon.vue'
import DeliveryIcon from '@/shared/ui/icons/DeliveryIcon.vue'
import AccessiblePriceIcon from '@/shared/ui/icons/AccessiblePriceIcon.vue'
import CloseIcon from '@/shared/ui/icons/CloseIcon.vue'
import CatalogButtonIcon from '@/shared/ui/icons/CatalogButtonIcon.vue'
import CabelIcon from '@/shared/ui/icons/CabelIcon.vue'
import ElectroIcon from '@/shared/ui/icons/ElectroIcon.vue'
import AutomaticaIcon from '@/shared/ui/icons/AutomaticaIcon.vue'
import LightTechnicIcon from '@/shared/ui/icons/LightTechnicIcon.vue'
import WarmFloorIcon from '@/shared/ui/icons/WarmFloorIcon.vue'
import LocationIcon from '@/shared/ui/icons/LocationIcon.vue'
import SearchIcon from '@/shared/ui/icons/SearchIcon.vue'
import BurgerIcon from '@/shared/ui/icons/BurgerIcon.vue'
import FilterIcon from '@/shared/ui/icons/FilterIcon.vue'
import ShowPasswordIcon from '@/shared/ui/icons/ShowPasswordIcon.vue'
import HidePasswordIcon from '@/shared/ui/icons/HidePasswordIcon.vue'

export default {
  name: 'BaseIcon',
  components: {
    StickerSaleIcon,
    ArrowUpRightIcon,
    FavouriteIcon,
    CartIcon,
    UserIcon,
    SelectArrowIcon,
    VerticalSortIcon,
    HorizontalSortIcon,
    DocumentIcon,
    GuaranteeIcon,
    DeliveryIcon,
    AccessiblePriceIcon,
    CloseIcon,
    CatalogButtonIcon,
    CabelIcon,
    ElectroIcon,
    AutomaticaIcon,
    LightTechnicIcon,
    WarmFloorIcon,
    LocationIcon,
    SearchIcon,
    BurgerIcon,
    FilterIcon,
    ShowPasswordIcon,
    HidePasswordIcon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    icons() {
      return {
        StickerSaleIcon,
        ArrowUpRightIcon,
        FavouriteIcon,
        CartIcon,
        UserIcon,
        SelectArrowIcon,
        VerticalSortIcon,
        HorizontalSortIcon,
        DocumentIcon,
        GuaranteeIcon,
        DeliveryIcon,
        AccessiblePriceIcon,
        CloseIcon,
        CatalogButtonIcon,
        CabelIcon,
        ElectroIcon,
        AutomaticaIcon,
        LightTechnicIcon,
        WarmFloorIcon,
        LocationIcon,
        SearchIcon,
        BurgerIcon,
        FilterIcon,
        ShowPasswordIcon,
        HidePasswordIcon,
      }
    },
  },
}
</script>

<style scoped></style>
