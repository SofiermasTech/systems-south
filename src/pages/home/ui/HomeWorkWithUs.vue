<template>
  <section class="work-with-us">
    <h2 class="work-with-us__title container h2">С нами<br />работают</h2>
    <div class="work-with-us__content">
      <div class="work-with-us__line">
        <div class="work-with-us__logo logo-left item1">
          <p class="work-with-us__name">Elektrostandard</p>
          <img
            src="@/assets/images/logo-company/es.png"
            alt=""
            width="153"
            height="116"
            loading="lazy"
          />
        </div>
        <div class="work-with-us__logo logo-left item2">
          <p class="work-with-us__name">Legrand</p>
          <img
            src="@/assets/images/logo-company/legrand.png"
            alt=""
            width="153"
            height="116"
            loading="lazy"
          />
        </div>
        <div class="work-with-us__logo logo-left item3">
          <p class="work-with-us__name">Nexans</p>
          <img
            src="@/assets/images/logo-company/nexans.png"
            alt=""
            width="153"
            height="116"
            loading="lazy"
          />
        </div>
        <div class="work-with-us__logo logo-left item4">
          <p class="work-with-us__name">Hensel</p>
          <img
            src="@/assets/images/logo-company/hensel.png"
            alt=""
            width="153"
            height="116"
            loading="lazy"
          />
        </div>
        <div class="work-with-us__logo logo-left item5">
          <p class="work-with-us__name">Tehstrong</p>
          <img
            src="@/assets/images/logo-company/tehstrong.png"
            alt=""
            width="153"
            height="116"
            loading="lazy"
          />
        </div>
      </div>
      <div class="work-with-us__line">
        <div class="work-with-us__logo logo-right item1">
          <p class="work-with-us__name">Tehstrong</p>
          <img
            src="@/assets/images/logo-company/tehstrong.png"
            alt=""
            width="153"
            height="116"
            loading="lazy"
          />
        </div>
        <div class="work-with-us__logo logo-right item2">
          <p class="work-with-us__name">Bticino</p>
          <img
            src="@/assets/images/logo-company/bticino.png"
            alt=""
            width="153"
            height="116"
            loading="lazy"
          />
        </div>
        <div class="work-with-us__logo logo-right item3">
          <p class="work-with-us__name">Bals</p>
          <img
            src="@/assets/images/logo-company/bals.png"
            alt=""
            width="153"
            height="116"
            loading="lazy"
          />
        </div>
        <div class="work-with-us__logo logo-right item4">
          <p class="work-with-us__name">Schneider Electric</p>
          <img
            src="@/assets/images/logo-company/schneider.png"
            alt=""
            width="153"
            height="116"
            loading="lazy"
          />
        </div>
        <div class="work-with-us__logo logo-right item5">
          <p class="work-with-us__name">Centrsvet Group</p>
          <img
            src="@/assets/images/logo-company/centrsvet.png"
            alt=""
            width="153"
            height="116"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script></script>

<style lang="scss">
@import '@/assets/styles/utils.scss';

.work-with-us {
  margin-block: var(--section-offset);
  &__title {
    margin-bottom: 40px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: clamp(8px, 1vw, 20px);
  }

  &__line {
    max-width: clamp(375px, 100vw, 1920px);
    width: 100%;
    height: clamp(140px, 15vw, 280px);
    margin-inline: auto;
    // display: flex;
    // gap: 16px;
    // align-items: center;
    position: relative;
    overflow: hidden;

    @include laptop {
    }
  }

  &__logo {
    border: 1px solid var(--blue-100);
    border-radius: var(--br-block);
    // width: clamp(165px, 22vw, 420px);
    width: 420px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    animation-timing-function: linear;
    animation-duration: 40s;
    animation-iteration-count: infinite;

    @include desktop {
      width: 370px;
    }

    @include laptop {
      width: 320px;
    }

    @include tablet {
      width: 230px;
    }

    @include tablet-bottom {
      width: 200px;
    }

    img {
      max-width: 65%;
      width: 100%;
      object-fit: cover;
      filter: contrast(0) brightness(0);
    }

    @include hover {
      background-color: var(--blue-0);

      img {
        filter: none;
      }
    }
  }

  &__name {
    position: absolute;
    top: clamp(14px, 1vw, 20px);
    left: clamp(14px, 1vw, 20px);
    font-weight: 600;
    @include fluid-text(14, 10);
    color: var(--grey-200);
  }
}

.logo-left {
  left: max(calc(315px * 5), 100%);
  animation-name: scrollLeft;

  @include laptop {
    left: max(calc(260px * 5), 100%);
  }

  @include tablet {
    left: max(calc(160px * 5), 100%);
  }

}

.logo-right {
  right: max(calc(315px * 5), 100%);
  animation-name: scrollRight;

  @include laptop {
    right: max(calc(260px * 5), 100%);
  }

  @include tablet {
    right: max(calc(160px * 5), 100%);
  }
}

.item1 {
  animation-delay: calc(40s / 5 * (5 - 1) * -1);
}

.item2 {
  animation-delay: calc(40s / 5 * (5 - 2) * -1);
}

.item3 {
  animation-delay: calc(40s / 5 * (5 - 3) * -1);
}

.item4 {
  animation-delay: calc(40s / 5 * (5 - 4) * -1);
}

.item5 {
  animation-delay: calc(40s / 8 * (5 - 5) * -1);
}

@keyframes scrollLeft {
  to {
    left: -370px;
  }
}

@keyframes scrollRight {
  to {
    right: -370px;
  }
}

@include tablet {
  @keyframes scrollLeft {
    to {
      left: -230px;
    }
  }

  @keyframes scrollRight {
    to {
      right: -230px;
    }
  }
}

</style>
