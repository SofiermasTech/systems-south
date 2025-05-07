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
      }
    },
  },
}
</script>

<style scoped></style>
