<template>
  <div class="timer">
    <div class="timer__item">
      <span class="timer__value">{{ timerDisplay.day }}</span>
      <p class="timer__text">дней</p>
    </div>
    <span class="timer__dot">:</span>
    <div class="timer__item">
      <span class="timer__value">{{ timerDisplay.hour }}</span>
      <p class="timer__text">часов</p>
    </div>
    <span class="timer__dot">:</span>
    <div class="timer__item">
      <span class="timer__value">{{ timerDisplay.minutes }}</span>
      <p class="timer__text">минут</p>
    </div>
    <span class="timer__dot">:</span>
    <div class="timer__item">
      <span class="timer__value">{{ timerDisplay.sec }}</span>
      <p class="timer__text">секунды</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTimer',
  props: {
    promo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timerDisplay: {
        day: '00',
        hour: '00',
        minutes: '00',
        sec: '00',
      },
      timerInterval: null,
    }
  },
  methods: {
    calculateTimeRemaining() {
      const endDate = new Date(this.promo.date)
      const now = new Date()
      const diff = endDate - now // Разница в миллисекундах

      if (diff <= 0) {
        this.timerDisplay = {
          day: '00',
          hour: '00',
          minutes: '00',
          sec: '00',
        }
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      this.timerDisplay = {
        day: String(days).padStart(2, '0'),
        hour: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        sec: String(seconds).padStart(2, '0'),
      }
    },
    startTimer() {
      this.calculateTimeRemaining()
      // Запускаем обновление каждую секунду
      this.timerInterval = setInterval(() => {
        this.calculateTimeRemaining()
      }, 1000)
    },
  },
  mounted() {
    if (this.promo && this.promo.date) {
      this.startTimer()
    }
  },
  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
    }
  },
}
</script>

<style lang="scss">
.timer {
  background-color: var(--blue-100);
  border-radius: 10px;
  padding: 16px;
  position: absolute;
  top: 32px;
  right: 32px;
  display: flex;
  gap: 16px;
  align-items: center;

  &__item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }

  &__value {
    font-weight: 600;
    font-size: 16px;
  }

  &__dot {
    font-weight: 400;
    font-size: 14px;
    opacity: 0.5;
  }

  &__text {
    font-size: 10px;
    line-height: 110%;
    text-align: center;
    opacity: 0.5;
  }
}
</style>
