<template>
  <div class="hero fade-in">
    <div class="hero__inner">
      <div class="hero__title">Hello, my name is Henry.</div>
      <div class="hero__content">
        I make technology work
        <p>better.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.hero {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0 4rem;

  @include mq(lg) {
    min-height: 500px;
  }

  &__inner {
    display: flex;
    flex-direction: column;
  }

  &__title {
    color: #f25f4c;
    order: -1;
    font-size: 1.1875rem; //19px
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 1rem;
  }

  &__content {
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.4;

    @include mq(md) {
      font-size: 2rem;
    }
  }

  &__br {
    display: none;

    @include mq(lg) {
      display: block;
    }
  }

  &__link {
    display: inline-block;
    color: inherit;
    position: relative;

    @include hover-focus {
      color: inherit;
    }

    &::after,
    &::before {
      content: '';
      display: block;
      height: 0.5em;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }

    &::before {
      background-color: var(--border-color);
    }

    &::after {
      background-color: var(--brand-color-primary);
      transform: scaleX(0);
      transform-origin: 0 50%;
      transition: transform 0.3s cubic-bezier(0.86, 0, 0.07, 1);
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
}

p {
  color: orange;
}
.fade-in {
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000;
  animation: fadeInUp 0.5s ease;
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
