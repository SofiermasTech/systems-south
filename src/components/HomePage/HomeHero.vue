<template>
  <section class="hero container">
    <div class="hero__body">
      <div class="hero__block hero__block--main"></div>
      <div class="hero__block hero__block--sale"></div>
      <div class="hero__block hero__block--about">
        <div class="hero__block-content">
          <h2 class="hero__block-title">О нас</h2>
          <div class="hero__block-bottom">
            <div class="hero__block-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut
            </div>
            <div class="hero__block-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10">
                <path
                  stroke="#1C71B7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m2.224 1 6.682.095m0 0L9 7.777m-.094-6.682L1 9"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="hero__block hero__block--delivery">
        <div class="hero__block-content">
          <h2 class="hero__block-title">Доставка и оплата</h2>
          <div class="hero__block-bottom">
            <div class="hero__block-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut
            </div>
            <div class="hero__block-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10">
                <path
                  stroke="#1C71B7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m2.224 1 6.682.095m0 0L9 7.777m-.094-6.682L1 9"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="hero__block hero__block--contacts">
        <div class="hero__block-content">
          <h2 class="hero__block-title">Контакты</h2>
          <div class="hero__block-bottom">
            <div class="hero__block-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut
            </div>
            <div class="hero__block-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10">
                <path
                  stroke="#1C71B7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m2.224 1 6.682.095m0 0L9 7.777m-.094-6.682L1 9"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="hero__block hero__block--faq">
        <div class="hero__block-content">
          <h2 class="hero__block-title">FAQ</h2>
          <div class="hero__block-bottom">
            <div class="hero__block-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut
            </div>
            <div class="hero__block-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10">
                <path
                  stroke="#1C71B7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m2.224 1 6.682.095m0 0L9 7.777m-.094-6.682L1 9"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script></script>
<style lang="scss">
.hero {
  margin-top: 12px;
  margin-bottom: var(--section-offset);
  height: 80vh;
  // height: 100%;

  &__body {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1.4fr 1fr;
    gap: 8px;
  }

  &__block {
    width: 100%;
    height: 100%;
    padding: 24px;
    background-color: var(--blue-0);
    border-radius: var(--br-block);
  }

  &__block--main {
    grid-column: span 3;
    padding-top: 32px;
  }

  &__block--sale {
    padding: 0;
  }

  &__block--about {
  }

  &__block-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__block-title {
    font-weight: 500;
    font-size: 32px;
    line-height: 110%;
    letter-spacing: -0.04em;
    color: var(--blue);
  }

  &__block-bottom {
    display: flex;
    gap: 16px;
  }

  &__block-text {
    font-size: 14px;
  }

  &__block-arrow {
    flex-shrink: 0;
    border: 1px solid var(--blue-0);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 10px;
      height: 10px;
    }
  }

  &__block--delivery {
  }

  &__block--contacts {
  }

  &__block--faq {
  }
}
.container {
}
</style>
